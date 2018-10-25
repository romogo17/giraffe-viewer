import knex from './DB'
// import Cache from './Cache'

// const ttl = 60 * 60 * 1 // 1 hour
// const cache = new Cache(ttl)

const tableName = 'region'
const orderColumn = 'created_at'
const columns = [
  'instance_uuid',
  'method',
  'category',
  'created_at',
  'updated_at'
]

const RegionModel = {
  getRegions({ keyword = '', filters = [] }, { page = 1, pageSize = 7 }) {
    console.log('Get Regions', { keyword, filters, page, pageSize })

    return this.buildQuery(this.baseQuery())(filters)(keyword)
      .column(knex.raw('(props).label as label'))
      .column(knex.raw('(props).area as area'))
      .column(knex.raw('(props).perimeter as perimeter'))
      .column(knex.raw('(props).centroid as centroid'))
      .column(knex.raw('(props).solidity as solidity'))
      .column(knex.raw('(props).eccentricity as eccentricity'))
      .column(knex.raw('(props).convex_area as convex_area'))
      .column(knex.raw('(props).circularity as circularity'))
      .column(knex.raw('(props).orientation as orientation'))
      .column(knex.raw('(props).bbox as bbox'))
      .orderBy(orderColumn, 'desc')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .then(rows => rows)
  },
  baseQuery() {
    return knex.select(columns).from(tableName)
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
                  knex.raw('LOWER(method) like ?', `%${keyword.toLowerCase()}%`)
                )
                .orWhere(
                  knex.raw('region.instance_uuid::varchar = ?', `${keyword}`)
                )
            : queryBuilder
        return queryBuilder
      }
    }
  }
}

export default RegionModel
