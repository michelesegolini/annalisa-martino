import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';
import { i18nConfig } from './lib/constants';

const routing = defineRouting(i18nConfig);

export default createMiddleware(routing);

// Standard matcher to ensure all paths are caught/ignored correctly
export const config = {
    matcher: ['/((?!api|_next|_vercel|test-static|.*\\..*).*)']
};
