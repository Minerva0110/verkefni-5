import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ message: "Login successful", user });
}
