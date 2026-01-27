import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* No rewrites/redirects here, handled by proxy.ts */
};

export default withNextIntl(nextConfig);
