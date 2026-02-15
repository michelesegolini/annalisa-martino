import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CollectionCard from '@/components/collections/CollectionCard';
import { getGalleryItems } from '@/lib/sanity/queries';
import { GalleryItem } from '@/types';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'collections' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function CollectionsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('collections');

    // Fetch all items
    const allItems = await getGalleryItems(locale);

    // Group items by collection to create collection cards
    interface Collection {
        id: string;
        title: string;
        description: string;
        image: string;
        href: string;
    }
    const collectionsMap = new Map<string, Collection>();

    allItems.forEach((item: GalleryItem) => {
        const collectionName = item.collection || 'Uncategorized';
        if (!collectionsMap.has(collectionName)) {
            // Create slug from collection name
            const slug = collectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            collectionsMap.set(collectionName, {
                id: slug,
                title: collectionName, // Use raw name from sheet as title
                description: '', // Description not in sheet, leaving empty or could use a generic one
                image: item.posterImage || item.images?.[0] || '', // Use first item's image as cover
                href: `/collections/${slug}`,
            });
        }
    });

    const collections = Array.from(collectionsMap.values());

    return (
        <Box sx={{ pt: { xs: 12, md: 16 }, pb: 12, minHeight: '100vh', backgroundColor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h1"
                    align="center"
                    sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        mb: 2,
                        fontSize: { xs: '2.5rem', md: '4rem' },
                    }}
                >
                    {t('title')}
                </Typography>

                <Box sx={{ mt: 8 }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr' },
                        gap: 4
                    }}>
                        {collections.map((collection) => (
                            <Box key={collection.id}>
                                <CollectionCard {...collection} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export function generateStaticParams() {
    return ['en', 'it', 'es', 'pt', 'fr'].map((locale) => ({ locale }));
}
