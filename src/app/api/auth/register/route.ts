import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  return NextResponse.json(user, { status: 201 });
}
