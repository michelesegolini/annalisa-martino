import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from './lib/constants';

export default createMiddleware(i18nConfig);

export const config = {
    // Match only internationalized pathnames
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
