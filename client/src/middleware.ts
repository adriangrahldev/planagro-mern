import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/user/login', 'https://planagro.adriangrahl.dev').toString());
}
 
export const config = {
  matcher: '/',
}