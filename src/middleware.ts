import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/session';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
  }
  NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/my-profile/:path*', '/checkout/:path*'],
};
