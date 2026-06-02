import { prisma } from "../database/prisma.js";

export async function logRequest({
  companyId,
  endpoint,
  tokens = 1
}) {

  await prisma.log.create({
    data: {
      companyId,
      endpoint,
      tokens
    }
  });
}

export async function consumeCredit(companyId, amount = 1) {

  const company = await prisma.company.findUnique({
    where: {
      id: companyId
    }
  });

  if (!company) return;

  await prisma.company.update({
    where: {
      id: companyId
    },

    data: {
      credits: company.credits - amount
    }
  });
}