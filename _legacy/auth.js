import { db } from "../database/memory.js";

export function auth(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key ausente" });
  }

  const keyData = db.apiKeys.find(k => k.key === apiKey);

  if (!keyData) {
    return res.status(401).json({ error: "API key inválida" });
  }

  const company = db.companies.find(c => c.id === keyData.companyId);

  if (!company) {
    return res.status(401).json({ error: "Empresa não encontrada" });
  }

  req.company = company;
  req.companyId = company.id;

  next();
}