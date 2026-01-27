'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import { GalleryItem } from '@/types';
import InquireModal from './InquireModal';
import styles from './VirtualGallery.module.css';

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
            <Box className={styles.galleryContainer}>
                <Box className={styles.scrollContainer}>
                    {items.map((item, index) => (
                        <Box key={item.id} className={styles.galleryItem}>
                            {/* Video Background */}
                            <video
                                className={styles.videoBackground}
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster={item.posterImage || 'https://placehold.co/1920x1080?text=Video+Poster'}
                            >
                                <source src={item.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Gradient Overlay */}
                            <Box className={styles.overlay} />

                            {/* Content */}
                            <Container className={styles.content}>
                                <Box className={styles.contentInner}>
                                    {/* Category Label */}
                                    <Typography
                                        variant="overline"
                                        className={styles.category}
                                        sx={{
                                            color: 'primary.main',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.15em',
                                            mb: 2,
                                            display: 'block',
                                        }}
                                    >
                                        {item.category}
                                    </Typography>

                                    {/* Title */}
                                    <Typography
                                        variant="h2"
                                        className={styles.title}
                                        sx={{
                                            mb: 3,
                                            fontWeight: 600,
                                            textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography
                                        variant="body1"
                                        className={styles.description}
                                        sx={{
                                            mb: 4,
                                            maxWidth: '600px',
                                            fontSize: { xs: '0.95rem', md: '1.1rem' },
                                            lineHeight: 1.8,
                                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
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
                                        className={styles.inquireButton}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            backgroundColor: 'primary.main',
                                            color: 'background.default',
                                            '&:hover': {
                                                backgroundColor: 'primary.light',
                                            },
                                        }}
                                    >
                                        {t('inquirePrice')}
                                    </Button>

                                    {/* Scroll Indicator (only on first item) */}
                                    {index === 0 && (
                                        <Box className={styles.scrollIndicator}>
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
                                            <Box className={styles.scrollArrow}>→</Box>
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
