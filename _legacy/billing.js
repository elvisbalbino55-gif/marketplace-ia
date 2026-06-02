const prisma = require("../config/db");

async function chargeUser(userId, cost) {
  const account = await prisma.creditAccount.findUnique({
    where: { userId }
  });

  if (!account || account.balance < cost) {
    throw new Error("Insufficient credits");
  }

  await prisma.creditAccount.update({
    where: { userId },
    data: {
      balance: account.balance - cost
    }
  });

  return true;
}

module.exports = { chargeUser };