// DELETE PRODUCT BY ID ROUTE HANDLER

import { findUserWithToken } from "@/app/helpers/helpers";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// DELETE PRODUCT BY ID ROUTE HANDLER
export async function DELETE( request: Request, { params }: { params: { id: string } } ) {
  const id = params.id;

  // find the user id from the token
  const token = request.headers.get("authorization");
  if (!token) {
    return NextResponse.json({
      error: "Not authorized",
    });
  }

  // find user with token
  const user = await findUserWithToken(token);
  const createdby = user?.user.email;
  console.log(user);
  if (!createdby) {
    return NextResponse.json({
      error: "User not found",
    });
  }

  try {
    // delete product
    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    });
  }
}