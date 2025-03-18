import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET() {
  const quizzes = await prisma.quiz.findMany();
  return NextResponse.json(quizzes);
}
