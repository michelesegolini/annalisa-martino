'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
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
            <Box sx={{ width: '100%', maxWidth: '350px', textAlign: 'center' }}>
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
                        fontSize: { xs: '0.9rem', sm: '1.2rem' }, // Shrink text on mobile
                        px: { xs: 2, sm: 6 }, // Reduce padding on mobile
                        py: 2,
                        width: { xs: '100%', sm: 'auto' }, // Full width on small screens
                        maxWidth: '100%',
                        borderColor: 'primary.main',
                        borderWidth: '1px',
                        '&:hover': {
                            borderWidth: '1px',
                            backgroundColor: 'rgba(212, 175, 55, 0.05)',
                        }
                    }}
                >
                    <Typography
                        component="span"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: { xs: 'hidden', sm: 'visible' },
                            textOverflow: { xs: 'ellipsis', sm: 'clip' },
                            maxWidth: { xs: '100%', sm: 'none' },
                            display: 'inline-block'
                        }}
                    >
                        @annalisamartinocollection
                    </Typography>
                </Button>
            </Box>

            {/* Email */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter', fontWeight: 300 }}>
                    EMAIL
                </Typography>
                <Typography
                    component="a"
                    href="mailto:atelier@annalisamartino.com"
                    onClick={handleContactClick} // Retained onClick as it was not explicitly removed in the instruction's diff
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        color: 'text.secondary',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: 'primary.main',
                            transform: 'translateX(8px)'
                        }
                    }}
                >
                    <EmailIcon sx={{ color: 'primary.main' }} />
                    <Typography sx={{
                        fontFamily: 'Inter',
                        letterSpacing: '0.05em',
                        fontSize: { xs: '0.9rem', md: '1rem' }
                    }}>
                        atelier@annalisamartino.com
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}
