const cache = new Map();

export function cacheGet(key){
  return cache.get(key);
}

export function cacheSet(key,value,ttlMs=60000){
  cache.set(key,{
    value,
    expires: Date.now() + ttlMs
  });

  setTimeout(()=>{
    cache.delete(key);
  }, ttlMs);
}

export function cacheHas(key){
  const c = cache.get(key);
  return c && c.expires > Date.now();
}
