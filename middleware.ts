import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'it', 'es', 'pt', 'fr'];
const defaultLocale = 'it';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = defaultLocale;

        // Redirect to the default locale
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    // Matcher ignoring internal paths and static files
    matcher: ['/((?!api|_next|_vercel|test-static|.*\\..*).*)']
};
