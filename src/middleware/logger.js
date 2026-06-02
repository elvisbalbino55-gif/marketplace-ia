export function logger(req, res, next) {
  const start = Date.now();
  const originalJson = res.json;

  res.json = function(data) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    return originalJson.call(this, data);
  };

  next();
}

export default logger;