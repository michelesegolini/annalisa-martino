'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { trackEvent } from '@/lib/analytics';

export default function ContactLinks() {
    const handleSocialClick = () => {
        trackEvent('click_social', { platform: 'instagram' });
    };

    const handleContactClick = () => {
        trackEvent('click_contact', { method: 'email' });
    };

    return (
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            {/* Instagram */}
            <Box>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter', fontWeight: 300 }}>
                    INSTAGRAM
                </Typography>
                <Button
                    component="a"
                    href="https://www.instagram.com/annalisamartinocollection?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="large"
                    onClick={handleSocialClick}
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
                    @annalisamartinocollection
                </Button>
            </Box>

            {/* Email */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter', fontWeight: 300 }}>
                    EMAIL
                </Typography>
                <Typography
                    component="a"
                    href="mailto:annalisamartino.fashiondesigner@gmail.com"
                    onClick={handleContactClick}
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
                    annalisamartino.fashiondesigner@gmail.com
                </Typography>
            </Box>
        </Box>
    );
}
