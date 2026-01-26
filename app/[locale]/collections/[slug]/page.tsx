import React from 'react';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getGalleryItems } from '@/lib/sanity/queries';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import CollectionDetail from '@/components/collections/CollectionDetail';

interface Props {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    // In a real app, we would fetch slugs from Sanity
    const slugs = ['moda-mediterranea', 'magna-grecia', 'red-carpet'];
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
    const t = await getTranslations('collections');

    // Map slug to collection keys in translation file
    const slugToKey: Record<string, string> = {
        'moda-mediterranea': 'modaMediterranea',
        'magna-grecia': 'magnaGrecia',
        'red-carpet': 'redCarpet'
    };

    const collectionKey = slugToKey[slug];
    if (!collectionKey) {
        notFound();
    }

    const collectionTitle = t(`${collectionKey}.title`);
    const collectionDescription = t(`${collectionKey}.description`);

    // Fetch all items and filter by collection title
    // Note: In a real app, we would filter in the query itself
    const allItems = await getGalleryItems();
    const collectionItems = allItems.filter(item => item.collection === collectionTitle);

    return (
        <CollectionDetail
            title={collectionTitle}
            description={collectionDescription}
            items={collectionItems}
        />
    );
}
