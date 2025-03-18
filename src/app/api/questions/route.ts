import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get("quizId");

  if (!quizId) return NextResponse.json({ error: "Quiz ID required" }, { status: 400 });

  const questions = await prisma.question.findMany({
    where: { quizId },
    include: { answers: true },
  });

  return NextResponse.json(questions);
}
