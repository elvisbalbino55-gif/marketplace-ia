const tenants = new Map([
  ["demo-key", { name: "Demo", plan: "free" }]
]);

export function auth(req, res, next) {
  const key = req.headers["x-api-key"];

  if (!key || !tenants.has(key)) {
    return res.status(401).json({ error: "INVALID_API_KEY" });
  }

  req.tenant = tenants.get(key);
  req.tenant.id = key;

  next();
}