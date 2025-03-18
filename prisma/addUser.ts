import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10); 

  const user = await prisma.user.create({
    data: {
      username: "testuser",
      password: hashedPassword,
    },
  });

  console.log("✅ User created:", user);
}

main().catch(console.error).finally(() => prisma.$disconnect());
