import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if path starts with a locale
    const pathnameHasLocale = routing.locales.some(
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
    const locale = routing.defaultLocale;
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
