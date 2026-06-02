import prisma from "./core/db.js";

async function test() {
  const result = await prisma.tenant.findMany();
  console.log(result);
}

test();