// search product by thier sku number

import { findUserWithToken } from "@/app/helpers/helpers";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// SEARCH PRODUCT BY SKU NUMBER ROUTE HANDLER

export async function GET(
  request: Request,
  { params }: { params: { sku: string } }
) {
  // make sku number before storing it in the database
  const skuNumber = parseInt(params.sku, 10);

  // check if skuNumber is a valid integer
  if (isNaN(skuNumber)) {
    return NextResponse.json({
      error: "Invalid SKU number",
    });
  }

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
  if (!createdby) {
    return NextResponse.json({
      error: "User not found",
    });
  }

  try {
    // find product
    const product = await prisma.product.findMany({
      where: { sku: skuNumber },
    });
  
    // if product is not found or empty array
    if (!product || product.length === 0) {
      return NextResponse.json({
        error: "Product not found",
      });
    }
  
    // return product
  
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    });
  }
}  