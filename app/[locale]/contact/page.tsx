import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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

                    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                        {/* Instagram */}
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter', fontWeight: 300 }}>
                                INSTAGRAM
                            </Typography>
                            <Button
                                component="a"
                                href="https://instagram.com/annalisamartino"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                size="large"
                                sx={{
                                    fontSize: '1.2rem',
                                    px: 6,
                                    py: 2,
                                    borderColor: 'primary.main',
                                    borderWidth: '1px',
                                    '&:hover': {
                                        borderWidth: '1px',
                                        backgroundColor: 'rgba(212, 175, 55, 0.05)',
                                    }
                                }}
                            >
                                @annalisamartino
                            </Button>
                        </Box>

                        {/* Email */}
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter', fontWeight: 300 }}>
                                EMAIL
                            </Typography>
                            <Typography
                                component="a"
                                href="mailto:info@annalisamartino.it"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontFamily: '"Cormorant Garamond", serif',
                                    color: 'text.primary',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid transparent',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        color: 'primary.main',
                                        borderColor: 'primary.main'
                                    }
                                }}
                            >
                                info@annalisamartino.it
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export function generateStaticParams() {
    return ['en', 'it', 'es', 'pt', 'fr'].map((locale) => ({ locale }));
}
