import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Matcher ignoring internal paths and static files
    matcher: ['/((?!api|_next|_vercel|studio|test-static|.*\\..*).*)']
};
