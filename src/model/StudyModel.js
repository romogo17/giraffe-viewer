import knex from './DB'
import Cache from './Cache'

const ttl = 60 * 60 * 1 // 1 hour
const cache = new Cache(ttl)

const tableName = 'study'
const orderColumn = 'created_at'
const columns = [
  'study.uuid',
  'study.description',
  'study.summary',
  'study.created_at',
  'study.updated_at'
]

/**
 * knex.column(knex.raw('to_char("dateCreated", \'YYYY-MM-DD\') as "dateCreated"'));
 *
    SELECT
      st.uuid, st.description, st.summary, st.created_at, st.updated_at,
      age(st.created_at, pt.birthdate) as age_at_study,
      count(sr.uuid) as series_count
    FROM
      med_img.study st
    JOIN med_img.patient pt ON pt.uuid = st.patient_uuid
    LEFT JOIN med_img.series sr ON st.uuid = sr.study_uuid
    GROUP BY st.uuid, pt.birthdate;
 */

const StudyModel = {
  getStudies({ keyword = '', filters = [] }, { page = 1, pageSize = 7 }) {
    console.log('Get Study', { keyword, filters, page, pageSize })
    return this.buildQuery(this.baseQuery())(filters)(keyword)
      .orderBy(orderColumn, 'desc')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .then(rows => rows.map(r => r.uuid))
      .then(keys => this.fetchStudies(keys))
  },
  fetchStudies(keys = []) {
    console.log('MODEL: Keys I need to fetch', keys)
    return cache
      .mget(keys, missingKeys => {
        console.log('STORAGE: Keys I need to query', missingKeys)
        return knex
          .select(columns)
          .from(tableName)
          .column(
            knex.raw('age(study.created_at, patient.birthdate) as age_at_study')
          )
          .count('series.uuid as series_count')
          .join('patient', 'patient.uuid', 'study.patient_uuid')
          .leftJoin('series', 'study.uuid', 'series.study_uuid')
          .whereIn('study.uuid', missingKeys)
          .groupBy('study.uuid', 'patient.birthdate')
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
                    'LOWER(description) like ?',
                    `%${keyword.toLowerCase()}%`
                  )
                )
                .orWhere(knex.raw('uuid::varchar like ?', `${keyword}%`))
                .orWhere(knex.raw('patient_uuid::varchar = ?', `${keyword}`))
            : queryBuilder
        return queryBuilder
      }
    }
  },
  insertStudy(study) {
    return knex(tableName)
      .returning('uuid')
      .insert(study)
      .then(result => result[0])
      .catch(err => console.log({ err }))
  },
  updateStudy(study) {
    return knex(tableName)
      .returning('uuid')
      .where('uuid', study.uuid)
      .update(study)
      .then(result => {
        const uuid = result[0]
        cache.del(uuid)
        return uuid
      })
  },
  emptyStudy() {
    return {
      description: ''
    }
  }
}

export default StudyModel
