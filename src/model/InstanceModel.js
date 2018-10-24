import knex from './DB'
import Cache from './Cache'
import * as cornerstone from 'cornerstone-core'

const ttl = 60 * 60 * 1 // 1 hour
const cache = new Cache(ttl)

const tableName = 'instance'
const columns = ['uuid', 'series_uuid', 'created_at', 'updated_at']

const InstanceModel = {
  // Loads an image given an instance uuid
  loadImage(imageId) {
    console.log('AQUI PA!', imageId)
    const promise = new Promise((resolve, reject) => {
      fetchInstance(imageId.substr(7)).then(instance => {
        const imageObject = createImage(instance)
        resolve(imageObject)
      }, reject)
    })

    return {
      promise,
      cancelFn: undefined
    }
  }
}

export default InstanceModel

function createImage(instance) {
  const height = instance.shape[0]
  const width = instance.shape[1]
  const pixelData = new Uint16Array(instance.data)

  function getPixelData() {
    return pixelData
  }

  return {
    imageId: instance.uuid,
    minPixelValue: 0,
    maxPixelValue: 255,
    slope: 1,
    intercept: 0,
    windowCenter: 127,
    windowWidth: 256,
    render: cornerstone.renderGrayscaleImage,
    getPixelData: getPixelData,
    rows: height,
    columns: width,
    height: height,
    width: width,
    color: false,
    columnPixelSpacing: 1.0,
    rowPixelSpacing: 1.0,
    invert: false,
    sizeInBytes: width * height * 2
  }
}

function fetchInstance(key = '') {
  console.log('MODEL: Key I need to fetch', key)
  return cache
    .get(key, missingKey => {
      console.log('STORAGE: Key I need to query', missingKey)
      return knex
        .select(columns)
        .from(tableName)
        .column(knex.raw('(image).shape as shape'))
        .column(knex.raw('(image).data as data'))
        .where('uuid', missingKey)
        .then(rows => {
          console.log('STORAGE: Value returned from storage', rows)
          return rows[0]
        })
    })
    .then(result => {
      console.log('MODEL: Returning value for key', result)
      console.log('________________________________________________________')
      return result
    })
}
