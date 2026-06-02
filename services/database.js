import { PrismaClient }
from "@prisma/client";

let prisma;

try{

  prisma =
    new PrismaClient();

  console.log(
    "✅ PRISMA CONNECTED"
  );

}catch(err){

  console.log(
    "❌ PRISMA ERROR"
  );

  console.log(err);

}

export { prisma };
