import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; 

export async function POST(req: Request) {
  try {
    const { categoryId, question, answers } = await req.json();

    if (!categoryId || !question || !answers || answers.length < 2) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newQuestion = await prisma.question.create({
      data: {
        content: question,
        categoryId,
        answers: {
          create: answers.map((a: { content: string; correct: boolean }) => ({
            content: a.content,
            correct: a.correct,
          })),
        },
      },
    });

    return NextResponse.json({ message: "Question added!", question: newQuestion }, { status: 201 });
  } catch (error) {
    console.error("Error adding question:", error);
    return NextResponse.json({ error: "Failed to add question" }, { status: 500 });
  }
}
