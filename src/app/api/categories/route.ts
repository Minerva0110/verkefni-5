// /src/app/api/categories/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Fetch categories and include related questions
      const categories = await prisma.category.findMany({
        include: {
          questions: true,
        },
      });

      if (!categories || categories.length === 0) {
        return res.status(404).json({ error: "No categories found" });
      }

      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Error fetching categories" });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
