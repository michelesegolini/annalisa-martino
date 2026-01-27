import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'it', 'es', 'pt', 'fr'];
const defaultLocale = 'it';

export default function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip proxy for static files, API routes, and Next.js internals
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") // files with extensions
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect to default locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};
