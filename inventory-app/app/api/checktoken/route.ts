import { NextResponse } from "next/server";
import { findUserWithToken } from "@/app/helpers/helpers";

export async function GET(request: Request) {
  // FIND TOKEN IN REQUEST HEADER
  const token = request.headers.get("authorization");
  if (!token) {
    return NextResponse.json({
      error: "Not authorized",
    });
  }

  // FIND USER WITH TOKEN

  const user = await findUserWithToken(token);

  // CHECK IF USER EXISTS
  if (!user) {
    return NextResponse.json({
      error: "Not authorized",
    });
  }

  // Return the user object if they are authenticated and authorized.
  return NextResponse.json(user);
}

