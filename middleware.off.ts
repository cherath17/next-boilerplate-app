import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_user")?.value;

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  // If user not logged in → redirect to login
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in and tries to visit /login → redirect to dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Env based off NextResponse
  // if (process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE === "true") {
  return NextResponse.next();
  // }
}

// Match all routes except static files
export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
