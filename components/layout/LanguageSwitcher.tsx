'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/routing';
import { Locale, locales } from '@/i18n/config';
import { useTranslations } from 'next-intl';
import {
    Select,
    MenuItem,
    Box,
    SelectChangeEvent,
} from '@mui/material';

const languageNames: Record<string, string> = {
    en: '🇬🇧 English',
    it: '🇮🇹 Italiano',
    es: '🇪🇸 Español',
    pt: '🇵🇹 Português',
    fr: '🇫🇷 Français',
};

const LanguageSwitcher: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = params.locale as string;

    const handleChange = (event: SelectChangeEvent<string>) => {
        const newLocale = event.target.value;
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: { xs: 16, md: 24 },
                right: { xs: 16, md: 32 },
                zIndex: 1000,
            }}
        >
            <Select
                value={currentLocale}
                onChange={handleChange}
                size="small"
                sx={{
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    color: 'primary.main',
                    fontSize: '0.875rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(26, 26, 26, 0.95)',
                        borderColor: 'rgba(212, 175, 55, 0.4)',
                    },
                    '& .MuiSelect-icon': {
                        color: 'primary.main',
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: 'rgba(26, 26, 26, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            mt: 1,
                        },
                    },
                }}
            >
                {locales.map((locale: Locale) => (
                    <MenuItem
                        key={locale}
                        value={locale}
                        sx={{
                            color: 'text.primary',
                            fontSize: '0.875rem',
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                                },
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            },
                        }}
                    >
                        {languageNames[locale]}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default LanguageSwitcher;
