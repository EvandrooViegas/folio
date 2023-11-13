import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/auth";

export async function middleware(req: NextRequest) {
  const canPass = await authMiddleware(req)
  if(!canPass) {
    return NextResponse.redirect(new URL("/auth", req.url))
  } 
  return NextResponse.next()
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }