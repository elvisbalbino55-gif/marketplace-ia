import prisma from "../core/db.js";

export async function chargeTenant(tenantId, cost) {
  const wallet = await prisma.wallet.findUnique({
    where: { tenantId }
  });

  if (!wallet || wallet.credits < cost) {
    throw new Error("INSUFFICIENT_CREDITS");
  }

  await prisma.wallet.update({
    where: { tenantId },
    data: {
      credits: wallet.credits - cost
    }
  });
}