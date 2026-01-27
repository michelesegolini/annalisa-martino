import React from 'react';
import { notFound } from 'next/navigation';

import { getGalleryItems } from '@/lib/sanity/queries';
import { setRequestLocale } from 'next-intl/server';
import CollectionDetail from '@/components/collections/CollectionDetail';

interface Props {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const allItems = await getGalleryItems('en'); // Use default locale for static generation of slugs
    const collections = new Set(allItems.map(item => item.collection || 'Uncategorized'));

    // Create slugs from collections
    const slugs = Array.from(collections).map(name =>
        name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    );

    const locales = ['en', 'it', 'es', 'pt', 'fr'];

    const params = [];
    for (const locale of locales) {
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
