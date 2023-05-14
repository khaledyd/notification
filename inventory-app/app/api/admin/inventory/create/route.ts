// CREATE PRODUCT INVENTORY
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { findUserWithToken } from "@/app/helpers/helpers";

interface RequestInput {
  name: string;
  costPrice: number;
  otherCosts : number;
  sellingPrice : number;
  profitMargin : number;
  quantity: number;
  description: string;
  sku: string;
}

// CREATE PRODUCT INVENTORY ROUTE HANDLER
export async function POST(request: Request) {
  const body: RequestInput = await request.json();
  const { name, costPrice, quantity, description , otherCosts , sellingPrice , profitMargin } = body;

  // find the user id from the token
  const token = request.headers.get("authorization");
  if (!token) {
    return NextResponse.json({
      error: "Not authorized",
    });
  }

  // find user with token
  const user = await findUserWithToken(token);
  const createdby = user?.user.email
  console.log(user);
  if (!createdby) {
    return NextResponse.json({
      error: "User not found",
    });
  }

  // create six random sku number
  const skuNumber = Math.floor(100000 + Math.random() * 900000);
  // calculate selling price
  const sellingPriceCal = costPrice + otherCosts + profitMargin

  // store the profit margin as a percentage
  const profitMarginByPercentage = (sellingPriceCal - costPrice) / costPrice * 100

  try {
    // validate inputs
    if (!name || !costPrice || !quantity || !description) {
      return NextResponse.json({
        error: "Please fill all fields",
      });
    }

    // create product
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        costPrice: costPrice,
        quantity: quantity,
        description: description,
        sku: skuNumber,
        createdByEmail: createdby,
        otherCosts : otherCosts,
        sellingPrice : sellingPriceCal,
        profitMargin : profitMarginByPercentage
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    });
  }
}
