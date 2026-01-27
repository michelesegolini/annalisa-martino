export const locales = ['en', 'it', 'es', 'pt', 'fr'] as const;
export const defaultLocale = 'it' as const;
export const localePrefix = 'always' as const;

export const i18nConfig = {
    locales,
    defaultLocale,
    localePrefix
};

export type Locale = (typeof locales)[number];

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://annalisamartino.com';
export const SITE_NAME = 'Annalisa Martino';
export const DESIGNER_NAME = 'Annalisa Martino';
