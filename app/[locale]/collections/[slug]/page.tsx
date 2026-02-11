import React from 'react';
import { notFound } from 'next/navigation';

import { getGalleryItems } from '@/lib/sanity/queries';
import { setRequestLocale } from 'next-intl/server';
import CollectionDetail from '@/components/collections/CollectionDetail';
import { i18nConfig, Locale } from '@/lib/constants';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface Props {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata({
    params
}: Props): Promise<Metadata> {
    const { locale, slug } = await params;

    // Fetch all items from the sheet
    const allItems = await getGalleryItems(locale);

    // Find the collection that matches the slug
    const collectionName = allItems
        .map(item => item.collection || 'Uncategorized')
        .find(name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);

    if (!collectionName) {
        return {
            title: 'Collection Not Found',
        };
    }

    // Filter items for this collection to get an image
    const collectionItems = allItems.filter(item => (item.collection || 'Uncategorized') === collectionName);
    const ogImage = collectionItems.find(item => item.posterImage)?.posterImage;

    return {
        title: `${collectionName} | Annalisa Martino`,
        description: `Explore the ${collectionName} collection by Annalisa Martino.`,
        openGraph: {
            title: `${collectionName} | Annalisa Martino`,
            description: `Explore the ${collectionName} collection by Annalisa Martino.`,
            images: ogImage ? [{ url: ogImage }] : [],
        },
    };
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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: collectionName,
        description: `Explore the ${collectionName} collection by Annalisa Martino.`,
        url: `https://annalisamartino.com/${locale}/collections/${slug}`,
        image: collectionItems.find(item => item.posterImage)?.posterImage,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: collectionItems.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                // url: `https://annalisamartino.com/${locale}/gallery?item=${item.id}`, // improving linking structure if possible
                name: item.title,
                image: item.posterImage,
            })),
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CollectionDetail
                title={collectionName}
                description="" // Description not in sheet
                items={collectionItems}
            />
        </>
    );
}
