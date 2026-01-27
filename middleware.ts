import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Hardcoded logic to avoid Edge Runtime crashes due to external dependencies
const locales = ['en', 'it', 'es', 'pt', 'fr'];
const defaultLocale = 'it';

export function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
