import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { findUserWithToken } from "@/app/helpers/helpers";

interface RequestInput {
  name: string;
  costPrice: number;
  otherCosts: number;
  sellingPrice: number;
  profitMargin: number;
  quantity: number;
  description: string;
}

// UPDATE PRODUCT INVENTORY ROUTE HANDLER
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body: RequestInput = await request.json();
  const {
    name,
    costPrice,
    quantity,
    description,
    otherCosts,
    sellingPrice,
    profitMargin,
  } = body;

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

  // calculate selling price
  const sellingPriceCal = costPrice + otherCosts + profitMargin;

  // store the profit margin as a percentage
  const profitMarginByPercentage =
    ((sellingPriceCal - costPrice) / costPrice) * 100;

  try {
    // validate inputs
    if (!name || !costPrice || !quantity || !description) {
      return NextResponse.json({
        error: "Please fill all fields",
      });
    }
    // update product
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: name,
        costPrice: costPrice,
        quantity: quantity,
        description: description,
        otherCosts: otherCosts,
        sellingPrice: sellingPriceCal,
        profitMargin: profitMarginByPercentage,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
    });
  }
}
