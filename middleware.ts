import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

const routing = defineRouting({
    locales: ['en', 'it', 'es', 'pt', 'fr'],
    defaultLocale: 'it',
    localePrefix: 'always'
});

export default createMiddleware(routing);

// Standard matcher to ensure all paths are caught/ignored correctly
export const config = {
    matcher: ['/((?!api|_next|_vercel|test-static|.*\\..*).*)']
};
