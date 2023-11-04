
import { NextRequest, NextResponse } from "next/server";
import userService from "./services/user";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const route = req.nextUrl.pathname
  console.log(route)
  const canAcessRoute = await userService.canAccessRoute(route)
  console.log(canAcessRoute)
  if(!canAcessRoute) {
    return NextResponse.rewrite(new URL("/auth", req.url))
  } 
  return res
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }