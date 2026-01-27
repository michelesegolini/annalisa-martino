'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import { GalleryItem } from '@/types';
import InquireModal from './InquireModal';

interface VirtualGalleryProps {
    items: GalleryItem[];
}

const VirtualGallery: React.FC<VirtualGalleryProps> = ({ items }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const t = useTranslations('gallery');

    const handleInquire = (item: GalleryItem) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <Box sx={{
                    display: 'flex',
                    height: '100vh',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {items.map((item, index) => (
                        <Box key={item.id} sx={{
                            position: 'relative',
                            minWidth: '100vw',
                            width: '100vw',
                            height: '100vh',
                            scrollSnapAlign: 'start',
                            scrollSnapStop: 'always',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Video Background */}
                            <Box
                                component="video"
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster={item.posterImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'}
                                onError={(e) => {
                                    // Fallback if video fails to load
                                    (e.target as HTMLVideoElement).style.display = 'none';
                                }}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    zIndex: 0
                                }}
                            >
                                {item.videoUrl && <source src={item.videoUrl} type="video/mp4" />}
                                Your browser does not support the video tag.
                            </Box>

                            {/* Gradient Overlay */}
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.5) 50%, rgba(10, 10, 10, 0.8) 100%)',
                                zIndex: 1
                            }} />

                            {/* Content */}
                            <Container sx={{
                                position: 'relative',
                                zIndex: 2,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    maxWidth: { md: '900px' },
                                    padding: { xs: '1rem 0', md: '2rem 0' },
                                    animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                                }}>
                                    {/* Category Label */}
                                    {/* Category Label - Hidden per user request */}
                                    {/* <Typography
                                        variant="overline"
                                        sx={{
                                            color: 'primary.main',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.15em',
                                            mb: 2,
                                            display: 'block',
                                            opacity: 0,
                                            animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards'
                                        }}
                                    >
                                        {item.category}
                                    </Typography> */}

                                    {/* Title */}
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            mb: 3,
                                            fontWeight: 600,
                                            textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
                                            fontSize: { xs: '2rem', md: '3.5rem' },
                                            opacity: 0,
                                            animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards'
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            maxWidth: '600px',
                                            fontSize: { xs: '0.9rem', md: '1.1rem' },
                                            lineHeight: 1.8,
                                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
                                            opacity: 0,
                                            animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards'
                                        }}
                                    >
                                        {item.description}
                                    </Typography>

                                    {/* CTA Button */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={() => handleInquire(item)}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            backgroundColor: 'primary.main',
                                            color: 'background.default',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            opacity: 0,
                                            animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards',
                                            '&:hover': {
                                                backgroundColor: 'primary.light',
                                            }
                                        }}
                                    >
                                        {t('inquirePrice')}
                                    </Button>

                                    {/* Scroll Indicator (only on first item) */}
                                    {index === 0 && (
                                        <Box sx={{
                                            position: 'absolute',
                                            bottom: { xs: '2rem', md: '3rem' },
                                            right: { xs: '1rem', md: '2rem' },
                                            textAlign: 'center',
                                            opacity: 0,
                                            animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards, pulse 2s ease-in-out 1.5s infinite'
                                        }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'primary.main',
                                                    letterSpacing: '0.1em',
                                                    display: 'block',
                                                    mb: 1,
                                                }}
                                            >
                                                {t('scroll')}
                                            </Typography>
                                            <Box sx={{
                                                color: 'primary.main',
                                                fontSize: '1.5rem',
                                                animation: 'slideRight 1.5s ease-in-out infinite'
                                            }}>
                                                →
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Container>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Inquire Modal */}
            <InquireModal
                open={modalOpen}
                onClose={handleCloseModal}
                item={selectedItem}
            />
        </>
    );
};

export default VirtualGallery;
