import knex from './DB'
import Cache from './Cache'

const ttl = 60 * 60 * 1 // 1 hour
const cache = new Cache(ttl)

const tableName = 'patient'
const orderColumn = 'given_name'
const columns = [
  'uuid',
  'given_name',
  'family_name',
  'other_ids',
  'address',
  'sex',
  'birthdate',
  'created_at'
]

const PatientModel = {
  getPatients({ keyword = '', filters = [] }, { page = 1, pageSize = 7 }) {
    console.log('Get Patients', { keyword, filters, page, pageSize })
    return this.buildQuery(this.baseQuery())(filters)(keyword)
      .orderBy(orderColumn, 'asc')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .then(rows => rows.map(r => r.uuid))
      .then(keys => this.fetchPatients(keys))
  },
  fetchPatients(keys = []) {
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
        return result.sort(
          (a, b) =>
            a.given_name > b.given_name
              ? 1
              : a.given_name < b.given_name
                ? -1
                : 0
        )
      })
  },
  baseQuery() {
    return knex.select('uuid').from(tableName)
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
                    'LOWER(given_name) like ?',
                    `%${keyword.toLowerCase()}%`
                  )
                )
                .orWhere(
                  knex.raw(
                    'LOWER(family_name) like ?',
                    `%${keyword.toLowerCase()}%`
                  )
                )
                .orWhere(knex.raw('uuid::varchar like ?', `${keyword}%`))
            : //.orWhere('uuid', keyword)
              queryBuilder
        return queryBuilder
      }
    }
  }
}

export default PatientModel
