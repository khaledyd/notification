// create user

import { findUserWithToken } from "@/app/helpers/helpers";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// interface
interface RequestInput {
  name: string;
  email: string;
  password: string;
}

// CREATE USER ROUTE HANDLER
export async function POST(request: Request) {
  // get id from token
  const token = request.headers.get("authorization");
  if (!token) {
    return NextResponse.json(
      {
        error: "Not authorized",
      },
      { status: 401 }
    );
  }

  // find user with token
  const user = await findUserWithToken(token);
  const createdby = user?.user.email;
  if (!createdby) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 404 }
    );
  }

  // get body
  const body: RequestInput = await request.json();
  const { name, email, password } = body;

  // validate inputs
  if (!name || !email || !password) {
    return NextResponse.json(
      {
        error: "Please fill all fields",
      },
      { status: 400 }
    );
  }

  // check if the user already exists
  const userExists = await prisma.userPortalInfo.findUnique({
    where: {
      email: email,
    },
  });

  // if user exists
  if (userExists) {
    return NextResponse.json(
      {
        error: "User already exists",
      },
      { status: 409 }
    );
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const newUser = await prisma.userPortalInfo.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      createdByEmail: createdby,
    },
  });

  // if user is not created
  if (!newUser) {
    return NextResponse.json(
      {
        error: "User not created",
      },
      { status: 500 }
    );
  }

  // return user
  return NextResponse.json(newUser, { status: 201 });
}
