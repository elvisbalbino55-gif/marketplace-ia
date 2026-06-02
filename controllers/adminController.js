import { prisma } from "../database/prisma.js";

/**
 * COMPANIES
 */
export async function getCompanies(req, res) {
  const companies = await prisma.company.findMany({
    include: { apiKeys: true }
  });

  res.json(companies);
}

/**
 * LOGS
 */
export async function getLogs(req, res) {
  const logs = await prisma.log.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(logs);
}

/**
 * RESET CREDITS
 */
export async function resetCredits(req, res) {
  const { apiKey } = req.body;

  const key = await prisma.apiKey.findUnique({
    where: { key: apiKey }
  });

  if (!key) {
    return res.status(404).json({ error: "API key não encontrada" });
  }

  const updated = await prisma.apiKey.update({
    where: { id: key.id },
    data: { credits: 10 }
  });

  res.json({
    message: "Créditos resetados",
    credits: updated.credits
  });
}