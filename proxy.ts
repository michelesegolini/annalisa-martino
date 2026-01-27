import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const i18nConfig = {
    locales: ['en', 'it', 'es', 'pt', 'fr'],
    defaultLocale: 'it',
    localePrefix: 'always' as const
};

const intlMiddleware = createMiddleware(i18nConfig);

export default function proxy(request: NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|test-static|.*\\..*).*)']
};
