import { getRequestConfig } from 'next-intl/server';
import { i18nConfig } from '../lib/constants';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that the incoming `locale` is valid
    if (!locale || !i18nConfig.locales.includes(locale as any)) {
        locale = i18nConfig.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
