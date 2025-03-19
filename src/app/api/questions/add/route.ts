import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  const { question, quizId, answers, categoryId } = await req.json(); 

  const newQuestion = await prisma.question.create({
    data: {
      content: question,
      quizId,
      categoryId, 
      answers: {
        create: answers,
      },
    },
  });

  return NextResponse.json(newQuestion, { status: 201 });
}
