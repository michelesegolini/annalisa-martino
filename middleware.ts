import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Hardcoded logic to avoid Edge Runtime crashes due to external dependencies
const locales = ['en', 'it', 'es', 'pt', 'fr'];
const defaultLocale = 'it';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if path starts with a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return; // Pass through

    // 2. Ignore assets, api, and next internals
    if (
        pathname.includes('.') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/_vercel')
    ) {
        return;
    }

    // 3. Redirect root to default locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
