import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return NextResponse.json({ message: "User registered successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Failed to register user" }, { status: 500 });
  }
}
