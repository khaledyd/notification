import { findUserWithToken } from "@/app/helpers/helpers";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// interface
interface RequestInput {
  totalPrice: number;
  quantity: number;
  sku: number;
}

// CREATE SALES ROUTE HANDLER
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
  const { totalPrice, quantity, sku } = body;

  // find the product by sku
  const product = await prisma.product.findUnique({
    where: {
      sku: sku,
    },
  });

  // check the inventory if that sku is available
  if (!product) {
    return NextResponse.json(
      {
        error: "Product not found",
      },
      { status: 404 }
    );
  }

  // check if the quantity is available
  if (product.quantity < quantity) {
    return NextResponse.json(
      {
        error: "Quantity not available",
      },
      { status: 400 }
    );
  }
  const totalPricebymoney = totalPrice * quantity;
  // create sales transaction also by updating the quantity of the product use transaction prisma
  try {
    // create sales transaction using prisma transaction
    const sales = await prisma.$transaction([
      prisma.sale.create({
        data: {
          totalPrice: totalPricebymoney,
          quantity: quantity,
          sku: sku,
          createdByEmail: createdby,
        },
      }),
      prisma.product.update({
        where: {
          sku: sku,
        },
        data: {
          quantity: product.quantity - quantity,
        },
      }),
    ]);

    // return sales
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
