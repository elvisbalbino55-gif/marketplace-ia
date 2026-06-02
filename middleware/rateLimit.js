const redis = require("../config/redis");

async function rateLimit(req, res, next) {
  const userId = req.user.id;
  const key = `rate:${userId}`;

  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, 60); // 1 min window
  }

  if (requests > 60) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  next();
}

module.exports = rateLimit;