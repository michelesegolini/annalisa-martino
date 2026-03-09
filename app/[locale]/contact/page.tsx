import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactLinks from '@/components/contact/ContactLinks';
import ContactForm from '@/components/contact/ContactForm';

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
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 },
            minHeight: '100dvh',
            backgroundColor: 'background.default',
        }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
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
                            mb: 2,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                        }}
                    >
                        {t('subtitle')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        {t('description')}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    gap: { xs: 8, md: 4 },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ flex: 1, width: '100%', maxWidth: { xs: '600px', md: '500px' } }}>
                        <ContactLinks />
                    </Box>
                    <Box sx={{ flex: 1.5, width: '100%', maxWidth: '700px' }}>
                        <ContactForm />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export function generateStaticParams() {
    return ['en', 'it', 'es', 'pt', 'fr'].map((locale) => ({ locale }));
}
