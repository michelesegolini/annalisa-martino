import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { i18nConfig } from '../lib/constants';

export const routing = defineRouting(i18nConfig);

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
