import knex from './DB'
import Cache from './Cache'

const ttl = 60 * 60 * 1 // 1 hour
const cache = new Cache(ttl)

const tableName = 'instance_thumbnails'
const orderColumn = 'created_at'
const columns = ['uuid', 'series_uuid', 'thumbnail_uri', 'created_at']

const ThumbnailModel = {
  getThumbnails({ keyword = '', filters = [] }, { page = 1, pageSize = 7 }) {
    console.log('Get Thumbnails', { keyword, filters, page, pageSize })
    return this.buildQuery(this.baseQuery())(filters)(keyword)
      .orderBy(orderColumn, 'desc')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .then(rows => rows.map(r => r.uuid))
      .then(keys => this.fetchThumbnails(keys))
  },
  fetchThumbnails(keys = []) {
    console.log('MODEL: Keys I need to fetch', keys)
    return cache
      .mget(keys, missingKeys => {
        console.log('STORAGE: Keys I need to query', missingKeys)
        return knex
          .select(columns)
          .from(tableName)
          .whereIn('uuid', missingKeys)
          .then(rows => {
            console.log('STORAGE: Values returned from storage', rows)
            return rows
          })
      })
      .then(result => {
        console.log('MODEL: Returning values for keys', result)
        console.log('________________________________________________________')
        return result.sort((a, b) => b.created_at - a.created_at)
      })
  },
  baseQuery() {
    return knex.select('uuid').from(tableName)
  },
  exists(keyword) {
    return knex
      .select(1)
      .from(tableName)
      .where(knex.raw('uuid::varchar = ?', `${keyword}`))
      .then(result => result)
  },
  buildQuery(queryBuilder) {
    return filters => {
      return keyword => {
        // First apply the needed filters
        if (filters !== [])
          filters.forEach(({ column, value }) => {
            queryBuilder = queryBuilder.where(column, value)
          })
        // Then apply the keyword
        queryBuilder =
          keyword !== ''
            ? queryBuilder
                .where(knex.raw('uuid::varchar like ?', `${keyword}%`))
                .orWhere(knex.raw('series_uuid::varchar = ?', `${keyword}`))
            : queryBuilder
        return queryBuilder
      }
    }
  }
}

export default ThumbnailModel
