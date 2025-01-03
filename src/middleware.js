import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublic = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  // Redirect if no token and accessing private routes
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logged-in users from public routes
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/mybookings", "/table/:id*"],
};
