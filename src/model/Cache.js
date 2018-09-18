import NodeCache from 'node-cache'
import knex from './DB'
import { difference } from '../utils/SetUtils'

class Cache {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    })
  }

  get(key, storeFunction) {
    const value = this.cache.get(key)
    if (value) {
      return Promise.resolve(value)
    }

    return storeFunction().then(result => {
      this.cache.set(key, result)
      return result
    })
  }

  mget(neededKeys, storeFunction) {
    // Get the cached values with the keys
    const cached = this.cache.mget(neededKeys)
    const cachedValues = Object.values(cached)
    const cachedKeys = Object.keys(cached)
    console.log('CACHE: Keys requested ', neededKeys)
    console.log('CACHE: 1. Keys I have ', cachedKeys)

    // If every needed value is already cached, return them
    if (cachedKeys.length === neededKeys.length) {
      console.log('CACHE: 2. I have every key in cache ')
      return Promise.resolve(cachedValues) // If every element is cached
    }

    // Otherwise, get the missing keys from storage
    const missingKeys = difference(neededKeys, cachedKeys)
    console.log('CACHE: 2. Missing keys ', missingKeys)
    return storeFunction(missingKeys).then(storageValues => {
      console.log('CACHE: 3. Caching new keys from storage ', storageValues)
      storageValues.forEach(value => {
        this.cache.set(value.uuid, value)
      })
      return [...storageValues, ...cachedValues]
    })
  }

  del(keys) {
    this.cache.del(keys)
  }

  flush() {
    this.cache.flushAll()
  }
}

export default Cache
