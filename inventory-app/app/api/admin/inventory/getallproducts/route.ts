import { findUserWithToken } from "@/app/helpers/helpers";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// GET ALL PRODUCTS ROUTE HANDLER

export async function GET(request: Request) {
  try {
    // find the user id from the token
    const token = request.headers.get("authorization");
    if (!token) {
      return NextResponse.json({
        error: "Not authorized",
      }, {status: 401});
    }

    // find user with token
    const user = await findUserWithToken(token);
    const createdby = user?.user.email;
    if (!createdby) {
      return NextResponse.json({
        error: "User not found",
      }, {status: 404});
    }

    // find all products
    const products = await prisma.product.findMany();

    // if products is not found or empty array
    if (!products || products.length === 0) {
      return NextResponse.json({
        error: "Products not found",
      }, {status: 404});
    }

    // return products
    return NextResponse.json(products, {status: 200});

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    }, {status: 500});
  }
}
