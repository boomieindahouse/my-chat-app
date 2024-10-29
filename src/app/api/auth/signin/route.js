// src/app/api/auth/signin/route.js
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    await dbConnect();
    const user = await User.findOne({ username, password });

    if (user) {
      return NextResponse.json({ message: "Sign in successful" });
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error signing in" }, { status: 500 });
  }
}
