import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  if (token) {

    try {

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (request.nextUrl.pathname.startsWith("/auth") && payload) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (request.nextUrl.pathname.startsWith("/admin")) {
        if (payload.role !== "admin") {
          return NextResponse.json(
            { message: 'Access forbidden' },
            { status: 403 }
          );
        }
      }

      return NextResponse.next();
      
    } catch (error) {
      
      console.error("Invalid token:", error);

      if (request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
  
      return NextResponse.next();

    }

  } else {

    if (request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();

  }

}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/admin/:path*"],
};