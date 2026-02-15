import { MetadataRoute } from 'next';
import { getGalleryItems } from '@/lib/sanity/queries';
import { locales, SITE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_URL;
    const sitemap: MetadataRoute.Sitemap = [];

    const staticPages = ['', 'about', 'contact', 'collections'];

    for (const locale of locales) {
        // Add static pages
        for (const page of staticPages) {
            sitemap.push({
                url: `${baseUrl}/${locale}${page ? `/${page}` : ''}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: page === '' ? 1 : 0.8,
            });
        }

        // Add dynamic pages (Collections)
        // We fetch items for each locale to ensure we get localized collection names if applicable
        const items = await getGalleryItems(locale);

        // Extract unique collection names
        const collectionNames = new Set(items.map(item => item.collection || 'Uncategorized'));

        for (const name of collectionNames) {
            // Replicate the slug generation logic used in the pages
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            sitemap.push({
                url: `${baseUrl}/${locale}/collections/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.6,
            });
        }
    }

    return sitemap;
}
