import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const handleRequest = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    console.log('Proxy request:', request.nextUrl.pathname);
    return handleRequest(request);
}

export const config = {
    // Simple explicit matcher to avoid negative lookahead complexity
    matcher: ['/', '/(en|it|es|pt|fr)/:path*']
};
