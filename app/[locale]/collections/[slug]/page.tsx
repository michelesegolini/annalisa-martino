import React from 'react';
import { notFound } from 'next/navigation';

import { getGalleryItems } from '@/lib/sanity/queries';
import { setRequestLocale } from 'next-intl/server';
import CollectionDetail from '@/components/collections/CollectionDetail';
import { i18nConfig, Locale } from '@/i18n/config';

interface Props {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const allItems = await getGalleryItems(i18nConfig.defaultLocale);
    const collections = new Set(allItems.map(item => item.collection || 'Collection'));

    // Create slugs from collections
    const slugs = Array.from(collections).map(name =>
        name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    );

    const params = [];
    for (const locale of i18nConfig.locales) {
        for (const slug of slugs) {
            params.push({ locale, slug });
        }
    }
    return params;
}

export default async function CollectionPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    // Fetch all items from the sheet
    const allItems = await getGalleryItems(locale);

    // Find the collection that matches the slug
    // We recreate the slug logic to find the original collection name
    const collectionName = allItems
        .map(item => item.collection || 'Uncategorized')
        .find(name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);

    if (!collectionName) {
        notFound();
    }

    // Filter items for this collection
    const collectionItems = allItems.filter(item => (item.collection || 'Uncategorized') === collectionName);

    return (
        <CollectionDetail
            title={collectionName}
            description="" // Description not in sheet
            items={collectionItems}
        />
    );
}
