import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import LookbookForm from '@/components/lookbook/LookbookForm';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'lookbook' });

    return {
        title: t('title'),
        description: t('subtitle'),
    };
}

import { getLookbookPdfUrl } from '@/lib/sanity/queries';

// ... (keep metadata and imports above)

export default async function LookbookPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('lookbook');
    const pdfUrl = await getLookbookPdfUrl();

    return (
        <Box sx={{
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 },
            minHeight: '100dvh',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Container maxWidth="md">
                <LookbookForm pdfUrl={pdfUrl} />
            </Container>
        </Box>
    );
}

export function generateStaticParams() {
    return ['en', 'it', 'es', 'pt', 'fr'].map((locale) => ({ locale }));
}
