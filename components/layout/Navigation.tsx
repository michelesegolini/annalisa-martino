'use client';

import React, { useState } from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { useParams } from 'next/navigation';
import { useRouter, usePathname, Link } from '@/i18n/routing';
import { Locale, locales } from '@/lib/constants';
import { useTranslations } from 'next-intl';

const languageFlags: Record<string, string> = {
    en: '🇬🇧',
    it: '🇮🇹',
    es: '🇪🇸',
    pt: '🇵🇹',
    fr: '🇫🇷',
};

const Navigation: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = params.locale as string;
    const t = useTranslations('navigation');

    const handleLanguageChange = (locale: Locale) => {
        router.push(pathname, { locale });
        setDrawerOpen(false);
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { label: t('gallery'), href: '/' },
        { label: t('about'), href: '/about' },
        { label: t('collections'), href: '/collections' },
        { label: t('contact'), href: '/contact' },
    ];

    return (
        <>
            {/* Hamburger Menu Button */}
            <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 32 },
                    zIndex: 1000,
                    color: 'primary.main',
                    backgroundColor: 'rgba(26, 26, 26, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    width: 44,
                    height: 44,
                    '&:hover': {
                        backgroundColor: 'rgba(26, 26, 26, 0.9)',
                        borderColor: 'rgba(212, 175, 55, 0.4)',
                        transform: 'scale(1.05)',
                    },
                    transition: 'all var(--transition-base)',
                }}
                aria-label="menu"
            >
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path d="M0 0H20V2H0V0Z" fill="currentColor" />
                    <path d="M0 7H20V9H0V7Z" fill="currentColor" />
                    <path d="M0 14H20V16H0V14Z" fill="currentColor" />
                </svg>
            </IconButton>



            {/* Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '80%', sm: 320 },
                        maxWidth: 400,
                        backgroundColor: 'rgba(10, 10, 10, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRight: '1px solid rgba(212, 175, 55, 0.2)',
                    },
                }}
            >
                <Box sx={{ pt: 8, pb: 4, px: 2 }}>
                    {/* Logo/Brand */}
                    <Box sx={{ mb: 6, px: 2 }}>
                        <Box
                            component="h2"
                            sx={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontSize: '1.75rem',
                                color: 'primary.main',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                margin: 0,
                            }}
                        >
                            Annalisa Martino
                        </Box>
                        <Box
                            component="p"
                            sx={{
                                fontFamily: 'Inter',
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                mt: 0.5,
                                margin: 0,
                            }}
                        >
                            Demi-Couture
                        </Box>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)', mb: 2 }} />

                    {/* Navigation Links */}
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.label} disablePadding>
                                <Link
                                    href={item.href}
                                    style={{ textDecoration: 'none', width: '100%' }}
                                    onClick={toggleDrawer(false)}
                                >
                                    <ListItemButton
                                        sx={{
                                            py: 2,
                                            px: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                                borderLeft: '3px solid',
                                                borderColor: 'primary.main',
                                                paddingLeft: 'calc(16px - 3px)',
                                            },
                                            transition: 'all var(--transition-base)',
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontSize: '1.25rem',
                                                color: 'text.primary',
                                                fontWeight: 500,
                                                letterSpacing: '0.02em',
                                            }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)', my: 3 }} />

                    {/* Language Section in Drawer */}
                    <Box sx={{ px: 2 }}>
                        <Box
                            component="p"
                            sx={{
                                fontSize: '0.7rem',
                                color: 'text.secondary',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                mb: 2,
                                fontWeight: 500,
                            }}
                        >
                            {t('language')}
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {locales.map((locale) => (
                                <IconButton
                                    key={locale}
                                    onClick={() => handleLanguageChange(locale)}
                                    sx={{
                                        fontSize: '1.5rem',
                                        padding: '8px',
                                        opacity: currentLocale === locale ? 1 : 0.4,
                                        border: currentLocale === locale ? '1px solid' : '1px solid transparent',
                                        borderColor: currentLocale === locale ? 'primary.main' : 'transparent',
                                        borderRadius: '4px',
                                        transition: 'all var(--transition-base)',
                                        '&:hover': {
                                            opacity: 1,
                                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                        },
                                    }}
                                    title={locale.toUpperCase()}
                                >
                                    {languageFlags[locale]}
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Navigation;
