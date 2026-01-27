import createMiddleware from 'next-intl/middleware';
const i18nConfig = {
    locales: ['en', 'it', 'es', 'pt', 'fr'],
    defaultLocale: 'it',
    localePrefix: 'always' as const
};

export default createMiddleware(i18nConfig);

export const config = {
    // Match only internationalized pathnames
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
