const settings = window.require('electron-settings')
const connParameters = settings.get('conn-parameters')
const knex = window.require('knex')({
  client: 'pg',
  connection: connParameters,
  searchPath: ['med_img']
})

export default knex