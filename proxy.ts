import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the pathname starts with any of our supported locales
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // If user is visiting root path (no locale), detect browser language
    if (pathname === '/' || (!pathnameHasLocale && !pathname.includes('.'))) {
        // Get browser language from Accept-Language header
        const acceptLanguage = request.headers.get('accept-language');
        let detectedLocale: string = defaultLocale; // Fallback to Italian

        if (acceptLanguage) {
            // Parse the Accept-Language header
            // Format: "en-US,en;q=0.9,it;q=0.8"
            const browserLanguages = acceptLanguage
                .split(',')
                .map(lang => {
                    const [code, qValue] = lang.trim().split(';q=');
                    return {
                        code: code.split('-')[0].toLowerCase(), // Get just 'en' from 'en-US'
                        quality: qValue ? parseFloat(qValue) : 1.0
                    };
                })
                .sort((a, b) => b.quality - a.quality); // Sort by quality (preference)

            // Find first supported locale
            for (const browserLang of browserLanguages) {
                if (locales.includes(browserLang.code as (typeof locales)[number])) {
                    detectedLocale = browserLang.code;
                    break;
                }
            }
        }

        // Redirect to detected locale
        const url = request.nextUrl.clone();
        url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;
        return NextResponse.redirect(url);
    }

    // Let next-intl middleware handle the rest
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - … if they contain a dot (e.g. favicon.ico)
    // - … if they start with /api (API routes)
    // - … if they start with /_next (Next.js internals)
    matcher: ['/((?!api|_next|.*\\..*).*)', '/']
};
