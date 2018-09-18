import knex from './DB'
import Cache from './Cache'

const ttl = 60 * 60 * 1 // 1 hour
const cache = new Cache(ttl)

const tableName = 'patient'
const orderColumn = 'created_at'
const columns = [
  'uuid',
  'given_name',
  'family_name',
  'other_ids',
  'region',
  'sex',
  'birthdate',
  'created_at'
]

const PatientModel = {
  getAllPatients(page = 1, pageSize = 7) {
    return knex
      .select('uuid')
      .from(tableName)
      .where('active', true)
      .orderBy(orderColumn, 'desc')
      .limit(7)
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
        return result
      })
  },
  getPageKeys(page = 1, pageSize = 7) {
    console.log('MODEL: Querying keys for page ', page, ' of size ', pageSize)
    return knex
      .select('uuid')
      .from(tableName)
      .where('active', true)
      .orderBy(orderColumn, 'desc')
      .limit(7)
      .offset((page - 1) * pageSize)
      .then(rows => rows.map(r => r.uuid))
  },
  getPatients(page = 1, pageSize = 7) {
    return this.getPageKeys(page, pageSize)
      .then(keys => {
        console.log('MODEL: Keys I need according to database', keys)
        return cache.mget(keys, missingKeys => {
          console.log('MODEL: Keys I need to query', missingKeys)
          return knex
            .select(columns)
            .from(tableName)
            .whereIn('uuid', missingKeys)
            .then(rows => {
              console.log('MODEL: Values returned from the DB', rows)
              return rows
            })
        })
      })
      .then(result => {
        console.log('MODEL: Final values to be returned', result)
        return result
      })
  }
}

export default PatientModel
