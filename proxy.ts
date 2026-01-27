import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const routing = {
    locales: ['en', 'it', 'es', 'pt', 'fr'],
    defaultLocale: 'it',
    localePrefix: 'always' as const
};

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
