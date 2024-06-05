import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value;

  if (token) {
    // Validate token if necessary
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/', '/account/:path*'],
};
