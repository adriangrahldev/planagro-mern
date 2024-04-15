import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/user/login', 'http://localhost:3000').toString());
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}