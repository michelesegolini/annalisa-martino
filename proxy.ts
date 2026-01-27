import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Handle root redirect
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/it', request.url));
    }

    return NextResponse.next();
}
