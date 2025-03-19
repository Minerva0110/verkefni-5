import { NextResponse } from "next/server";
import prisma from "../../lib/prisma"; 

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const questions = await prisma.question.findMany({
      where: categoryId ? { categoryId } : {},
      include: {
        answers: true,
      },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { question, quizId, answers, categoryId } = await req.json(); 

    if (!question || !categoryId || !answers || answers.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

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
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}
