import prisma from "../core/db.js";

export async function authTenant(req, res, next) {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ error: "API KEY REQUIRED" });
    }

    const key = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { tenant: true }
    });

    if (!key || !key.active) {
      return res.status(401).json({ error: "INVALID API KEY" });
    }

    // 🔥 INJETANDO TENANT NO REQUEST
    req.tenant = key.tenant;

    return next();

  } catch (err) {
    return res.status(500).json({ error: "AUTH ERROR" });
  }
}
