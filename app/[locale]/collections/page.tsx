import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CollectionCard from '@/components/collections/CollectionCard';

export default async function CollectionsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('collections');

    const collections = [
        {
            id: 'modaMediterranea',
            title: t('modaMediterranea.title'),
            description: t('modaMediterranea.description'),
            image: '/images/poster-1.jpg', // Placeholder
            href: '/collections/moda-mediterranea',
        },
        {
            id: 'magnaGrecia',
            title: t('magnaGrecia.title'),
            description: t('magnaGrecia.description'),
            image: '/images/poster-2.jpg', // Placeholder
            href: '/collections/magna-grecia',
        },
        {
            id: 'redCarpet',
            title: t('redCarpet.title'),
            description: t('redCarpet.description'),
            image: '/images/poster-3.jpg', // Placeholder
            href: '/collections/red-carpet',
        },
    ];

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
