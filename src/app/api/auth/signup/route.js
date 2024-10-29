// src/app/api/auth/signup/route.js
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    await dbConnect();
    const newUser = new User({ username, password });
    await newUser.save();
    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}
