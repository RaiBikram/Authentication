import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  console.log("Middleware Check:", { token: token ? "Exists ✅" : "Not Found ❌", pathname });

  // 🔒 PROTECTED ROUTES: Require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Redirecting to /sign-in ❌ (No Token)");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 🚫 RESTRICT AUTH ROUTES: Logged-in users should NOT access these
  const authRestrictedRoutes = ["/sign-in", "/sign-up", "/forgot-password"];
  if (token && authRestrictedRoutes.includes(pathname)) {
    console.log("Redirecting to /dashboard ❌ (Already Logged In)");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ❌ NOT FOUND HANDLING: If the route is not in valid paths, return a 404 page
  const validRoutes = [
    "/",
    "/dashboard",
    "/profile",
    "/settings",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/verify-email",
  ];
  if (!validRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Returning 404 Not Found ❌");
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/verify-email",
    "/:path*", // Catch all paths
  ],
};
