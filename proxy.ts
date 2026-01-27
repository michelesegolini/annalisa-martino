import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Handle root redirect
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/it', request.url));
    }

    // Handle other locale-less paths if needed, 
    // but for now, we pass everything else through
    return NextResponse.next();
}
