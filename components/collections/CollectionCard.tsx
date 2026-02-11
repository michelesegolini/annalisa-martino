'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import NextImage from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface CollectionCardProps {
    title: string;
    description: string;
    image: string;
    href: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ title, description, image, href }) => {
    const t = useTranslations('gallery');

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '400px', md: '600px' },
                width: '100%',
                overflow: 'hidden',
                '&:hover .bg-image': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            {/* Background Image */}
            <Box
                className="bg-image"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    transition: 'transform 0.8s ease',
                }}
            >
                <NextImage
                    src={image || '/images/fashion-item-1.png'}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </Box>

            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            />

            {/* Content */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 3, md: 6 },
                    color: 'common.white',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                }}
            >
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        mb: 2,
                        fontWeight: 500,
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mb: 3,
                        maxWidth: '500px',
                        opacity: 0.9,
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    {description}
                </Typography>
                <Link href={href} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: 'common.white',
                            color: 'common.white',
                            '&:hover': {
                                borderColor: 'primary.main',
                                color: 'primary.main',
                            },
                        }}
                    >
                        {t('viewCollection')}
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default CollectionCard;
