const memoryCache = new Map();

export function getCache(key){

  return memoryCache.get(key);

}

export function setCache(key,value){

  memoryCache.set(key,value);

}
