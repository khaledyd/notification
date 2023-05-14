import prisma from "@/app/libs/prismadb";
import jwt from "jsonwebtoken";

// Create a function to find a user with a token
export async function findUserWithToken(token: string) {
  // Check if the token exists in the database
  const tokenExists = await prisma.token.findUnique({
    where: { accessToken: token },
    select: {
      user: true,
    },
  });

  if (!tokenExists) {
    throw new Error("Invalid or expired token");
  }

  // Find the user with the token
  const user = await prisma.token.findUnique({
    where: { accessToken: token },
    select: {
      user: true,
    },
  });

  return user;
}


export async function createAccessToken(userId: string) {
  // Create an access token
  const accessToken = jwt.sign(userId, process.env.JWT_SECRET!, {});

  // Save the access token to the database
  const tokenTotheDb = await prisma.token.create({
    data: {
      accessToken: accessToken,
      user: { connect: { id: userId } },
      userportal: { connect: { id: userId } },
    },
  });

  if (!tokenTotheDb) {
    throw new Error("Error creating access token");
  }

  // Return the access token
  return accessToken;
}
