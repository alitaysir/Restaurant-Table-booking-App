import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
//   return NextResponse.redirect(new URL('/home', request.url))
    const path= request.nextUrl.pathname

    const isPublic= path==="/login" || path==="/signup"
    const token= request.cookies.get("token")?.value || ""

    if(!isPublic && !token){
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

    if(isPublic && token){
        return NextResponse.redirect(new URL("/", request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/mybookings",
    `/table/:id*`
  ]
}