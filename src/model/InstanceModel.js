import knex from './DB'
import Cache from './Cache'

const ttl = 60 * 60 * 1 // 1 hour
const cache = new Cache(ttl)

const tableName = 'series'
const orderColumn = 'created_at'
const columns = [
  'series.uuid',
  'series.study_uuid',
  'series.description',
  'series.laterality',
  'series.body_part',
  'series.created_at',
  'series.updated_at'
]

/**
  SELECT
    se.uuid, se.study_uuid, se.description, se.laterality, se.body_part, se.created_at, se.updated_at,
    count(ins.uuid) AS instance_count
  FROM
    med_img.series se
  LEFT JOIN med_img.instance ins ON se.uuid = ins.series_uuid
  GROUP BY se.uuid;
 */

const SeriesModel = {
  getSeries({ keyword = '', filters = [] }, { page = 1, pageSize = 7 }) {
    console.log('Get Series', { keyword, filters, page, pageSize })
    return this.buildQuery(this.baseQuery())(filters)(keyword)
      .orderBy(orderColumn, 'desc')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .then(rows => rows.map(r => r.uuid))
      .then(keys => this.fetchSeries(keys))
  },
  fetchSeries(keys = []) {
    console.log('MODEL: Keys I need to fetch', keys)
    return cache
      .mget(keys, missingKeys => {
        console.log('STORAGE: Keys I need to query', missingKeys)
        return knex
          .select(columns)
          .from(tableName)
          .count('instance.uuid as instance_count')
          .leftJoin('instance', 'series.uuid', 'instance.series_uuid')
          .whereIn('series.uuid', missingKeys)
          .groupBy('series.uuid')
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
                .where(
                  knex.raw(
                    'LOWER(description) like ?',
                    `%${keyword.toLowerCase()}%`
                  )
                )
                .orWhere(
                  knex.raw(
                    'LOWER(body_part) like ?',
                    `%${keyword.toLowerCase()}%`
                  )
                )
                .orWhere(knex.raw('uuid::varchar like ?', `${keyword}%`))
                .orWhere(knex.raw('study_uuid::varchar = ?', `${keyword}`))
            : queryBuilder
        return queryBuilder
      }
    }
  },
  insertSeries(series) {
    return knex(tableName)
      .returning('uuid')
      .insert(series)
      .then(result => result[0])
      .catch(err => console.log({ err }))
  },
  updateSeries(series) {
    return knex(tableName)
      .returning('uuid')
      .where('uuid', series.uuid)
      .update(series)
      .then(result => {
        const uuid = result[0]
        cache.del(uuid)
        return uuid
      })
  },
  emptySeries() {
    return {
      description: '',
      laterality: '',
      body_part: '',
      study_uuid: ''
    }
  },
  pruneSeries(item) {
    const { instance_count, ...pruned } = item
    return pruned
  }
}

export default SeriesModel
