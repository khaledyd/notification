import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// CREATE MIDDLEWARE TO CHECK IF USER IS AUTHENTICATED
export const config = {
  matcher: ["/api/admin/:path*", "/api/user/:path*"],
};

export default async function middleware(request: NextRequest) {
  // FIND TOKEN IN REQUEST HEADER
  const token = request.headers.get("authorization");
  if (!token) {
    return NextResponse.json({
      error: "Not authorized",
    });
  }

  // Make a request to the check-token API route to verify the token.
  const response = await fetch("http://localhost:3000/api/checktoken", {
    headers: {
      authorization: token,
    },
  });

  // Parse the response JSON data.
  const user = await response.json();

  // CHECK IF THE URL PATH IS /api/admin
  if (request.nextUrl.pathname === "/api/admin") {
    // CHECK IF USER IS ADMIN
    if (!user.isAdmin) {
      return NextResponse.json({
        error: "Not authorized",
      });
    } else {
      return NextResponse.next();
    }
  }

  // CHECK IF THE URL PATH IS /api/user
  if (request.nextUrl.pathname === "/api/user") {
    return NextResponse.next();
  }
}
