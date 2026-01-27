import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const handleRequest = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    console.log('Proxy request:', request.nextUrl.pathname);
    return handleRequest(request);
}

// Standard matcher to ensure all paths are caught/ignored correctly
export const config = {
    matcher: ['/((?!api|_next|_vercel|test-static|.*\\..*).*)']
};
