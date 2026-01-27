import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Self-contained routing config to avoid Edge Runtime import issues
const routing = {
    locales: ['en', 'it', 'es', 'pt', 'fr'],
    defaultLocale: 'it',
    localePrefix: 'always' as const
};

const intlMiddleware = createMiddleware(routing);

// Cover both default and named export conventions
export default function (request: NextRequest) {
    return intlMiddleware(request);
}

export function proxy(request: NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
