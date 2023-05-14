// UPDATE ADMINS INFO

import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// ADMIN UPDATE INFO INPUTS

interface RequestInput {
  email: string;
  password: string;
  name: string;
  id: string;
}

// ADMIN UPDATE INFO ROUTE HANDLER WITH ID PARAMETER

export async function PUT(request: Request) {
  const body: RequestInput = await request.json();
  const { email, password, name, id } = body;

  try {
    // VALIDATE INPUTS
    if (!email || !password || !name || !id) {
      return NextResponse.json({
        error: "Please fill all fields aryaa",
      });
    }

    // CHECK IF USER EXISTS
    const user = await prisma.userAdminInfo.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json({
        error: "User does not exist",
      });
    }

    // UPDATE USER
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = await prisma.userAdminInfo.update({
      where: { id: id },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    });
  }
}
