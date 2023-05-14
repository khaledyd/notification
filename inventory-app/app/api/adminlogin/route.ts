import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken } from "@/app/helpers/helpers";

interface RequestInput {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestInput = await request.json();
  const { email, password } = body;

  try {
    // VALIDATE INPUTS
    if (!email || !password) {
      return NextResponse.json({
        error: "Please fill all fields",
      });
    }

    // CHECK IF USER EXISTS
    const user = await prisma.userAdminInfo.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({
        error: "Invalid email or password",
      });
    }

    // CHECK PASSWORD
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({
        error: "Invalid email or password",
      });
    }
    // CREATE TOKEN
    const token = await createAccessToken(user.id,);

    // RETURN USER DATAA
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    });
  }
}
