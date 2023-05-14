// Register admin user using route handler in nextjs 13.4

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";



interface RequestInput {
  email: string;
  password: string;
  name: string;
}

export async function POST(request: Request) {
  const body: RequestInput = await request.json();
  const { email, password, name } = body;

  try {
    // VALIDATE INPUTS
    if (!email || !password || !name) {
      return NextResponse.json({
        error: "Please fill all fields",
      });
    }

    // CHECK IF USER EXISTS
    const user = await prisma.userAdminInfo.findUnique({
      where: { email: email },
    });

    if (user) {
      return NextResponse.json({
        error: "User already exists",
      });
    }

    // CREATE USER
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.userAdminInfo.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    });
  }
}

