import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactLinks from '@/components/contact/ContactLinks';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'contact' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('contact');

    return (
        <Box sx={{
            pt: { xs: 12, md: 20 },
            pb: 12,
            minHeight: '100vh',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="overline"
                        sx={{ color: 'primary.main', letterSpacing: '0.2em', mb: 2, display: 'block' }}
                    >
                        {t('title')}
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: '"Cormorant Garamond", serif',
                            mb: 4,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                        }}
                    >
                        {t('subtitle')}
                    </Typography>

                    <ContactLinks />
                </Box>
            </Container>
        </Box>
    );
}

export function generateStaticParams() {
    return ['en', 'it', 'es', 'pt', 'fr'].map((locale) => ({ locale }));
}
