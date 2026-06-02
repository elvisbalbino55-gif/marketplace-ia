import { PrismaClient }
from "@prisma/client";

const prisma =
  new PrismaClient();

async function seed(){

const exists =
await prisma.tenant.findFirst();

if(!exists){

await prisma.tenant.create({

data:{

company:"Enterprise Corp",

email:"admin@enterprise.com",

password:"123456",

apiKey:"enterprise_key",

quota:100000

}

});

console.log("TENANT CREATED");

}else{

console.log("TENANT EXISTS");

}

await prisma.$disconnect();

}

seed();
