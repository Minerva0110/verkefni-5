import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  console.log("📂 Categories in DB:", categories);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
