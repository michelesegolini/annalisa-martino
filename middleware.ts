import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const routing = {
    locales: ['en', 'it', 'es', 'pt', 'fr'],
    defaultLocale: 'it',
    localePrefix: 'always' as const
};

export default createMiddleware(routing);

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
