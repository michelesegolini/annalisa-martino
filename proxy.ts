import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { i18nConfig } from '@/lib/constants';

const intlMiddleware = createMiddleware(i18nConfig);

export default function proxy(request: NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|test-static|.*\\..*).*)']
};
