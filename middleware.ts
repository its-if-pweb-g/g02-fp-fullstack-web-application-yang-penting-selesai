import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for:", request.url);

  const token = request.cookies.get("token")?.value;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/", request.url));
      
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register"],
};