export const locales = ['en', 'it', 'es', 'pt', 'fr'] as const;
export const defaultLocale = 'it' as const;

export type Locale = (typeof locales)[number];
