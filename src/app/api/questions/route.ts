import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Assuming you're fetching all questions from the database
    const questions = await prisma.question.findMany({
      include: {
        answers: true, // You can also include answers if needed
      },
    });

    return new Response(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response("Failed to fetch questions", { status: 500 });
  }
}
