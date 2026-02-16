'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import Back Icon
import { useTranslations } from 'next-intl';
import { GalleryItem } from '@/types';
import InquireModal from './InquireModal';
import { trackEvent } from '@/lib/analytics';
interface VirtualGalleryProps {
    items: GalleryItem[];
    onBack?: () => void;
}

const GallerySlideshow = ({ mainImage, images, title, isCleanView }: { mainImage: string, images?: string[], title: string, isCleanView: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const allImages = images && images.length > 0 ? [mainImage, ...images] : [mainImage];
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const hasMultiple = allImages.length > 1;

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        if (!isCleanView || !hasMultiple) return;
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isCleanView || !hasMultiple) return;
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || !isCleanView || !hasMultiple) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            // Next image
            setCurrentIndex((prev) => (prev + 1) % allImages.length);
        } else if (isRightSwipe) {
            // Previous image
            setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
        }
    };

    const lastScrollTime = React.useRef(0);

    const onWheel = (e: React.WheelEvent) => {
        if (!isCleanView || !hasMultiple) return;

        const now = Date.now();
        if (now - lastScrollTime.current < 500) return; // Throttle scroll events

        if (Math.abs(e.deltaX) > 30) { // Reduced threshold slightly
            lastScrollTime.current = now;
            if (e.deltaX > 0) {
                // Next (scrolling right)
                setCurrentIndex((prev) => (prev + 1) % allImages.length);
            } else {
                // Prev (scrolling left)
                setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
            }
        }
    };

    useEffect(() => {
        if (!hasMultiple || isCleanView) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % allImages.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, [hasMultiple, allImages.length, isCleanView]);

    if (!hasMultiple) {
        return (
            <Box
                component="img"
                src={mainImage}
                alt={title}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                }}
            />
        );
    }

    return (
        <Box
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onWheel={onWheel}
        >
            {allImages.map((img, index) => (
                <Box
                    key={`${img}-${index}`}
                    component="img"
                    src={img}
                    alt={`${title} - view ${index + 1}`}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 1.5s ease-in-out', // Smooth crossfade
                        zIndex: index === currentIndex ? 1 : 0
                    }}
                />
            ))}

            {/* Manual Navigation Controls (Only in Clean View) */}
            {isCleanView && (
                <>
                    {/* Previous Button */}
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
                        }}
                        sx={{
                            position: 'absolute',
                            left: { xs: 10, md: 30 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'white',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            zIndex: 20, // Increased z-index
                            pointerEvents: 'auto', // Ensure clickability
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' }
                        }}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    {/* Next Button */}
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex((prev) => (prev + 1) % allImages.length);
                        }}
                        sx={{
                            position: 'absolute',
                            right: { xs: 10, md: 30 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'white',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            zIndex: 20, // Increased z-index
                            pointerEvents: 'auto', // Ensure clickability
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' }
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>

                    {/* Image Counter */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 30,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            zIndex: 10
                        }}
                    >
                        {currentIndex + 1} / {allImages.length}
                    </Box>
                </>
            )}
        </Box>
    );
};

const SequentialVideoPlayer = ({ videoUrls, poster }: { videoUrls: string[], poster?: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, videoUrls.length);
    }, [videoUrls]);

    useEffect(() => {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
            // Ensure the video is ready to play
            if (currentVideo.readyState >= 3) {
                currentVideo.play().catch(e => console.error("Autoplay prevented:", e));
            } else {
                currentVideo.oncanplay = () => {
                    currentVideo.play().catch(e => console.error("Autoplay prevented:", e));
                    currentVideo.oncanplay = null;
                };
            }
        }
    }, [currentIndex]);

    const handleEnded = (index: number) => {
        const nextIndex = (index + 1) % videoUrls.length;
        const nextVideo = videoRefs.current[nextIndex];

        if (nextVideo) {
            nextVideo.currentTime = 0;
            nextVideo.play().catch(e => console.error("Play error:", e));
        }
        setCurrentIndex(nextIndex);
    };

    return (
        <>
            {videoUrls.map((url, index) => (
                <Box
                    key={url}
                    component="video"
                    ref={(el: HTMLVideoElement | null) => { videoRefs.current[index] = el; }}
                    src={url}
                    muted
                    playsInline
                    preload="auto"
                    poster={index === 0 ? poster : undefined}
                    onEnded={() => handleEnded(index)}
                    className="sequential-video"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        opacity: currentIndex === index ? 1 : 0,

                        visibility: currentIndex === index ? 'visible' : 'hidden',
                        pointerEvents: 'none'
                    }}
                />
            ))}
        </>
    );
};

const VirtualGallery: React.FC<VirtualGalleryProps> = ({ items, onBack }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isCleanView, setIsCleanView] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const t = useTranslations('gallery');

    const displayItems = items;

    const handleInquire = (item: GalleryItem) => {
        trackEvent('open_inquire_modal', {
            item_id: item.id,
            item_title: item.title,
            item_price: item.price || 'N/A'
        });
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
                height: '100dvh', // Use dvh for mobile viewport
                overflow: 'hidden',
                position: 'relative',
                zIndex: isCleanView ? 1200 : 1 // Higher z-index to cover navigation when in clean view
            }}>
                <Box sx={{
                    display: 'flex',
                    height: '100dvh', // Use dvh
                    overflowX: isCleanView ? 'hidden' : 'auto', // Disable scrolling when in clean view
                    overflowY: 'hidden',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {displayItems.map((item, index) => (
                        <Box key={item.id} sx={{
                            position: 'relative',
                            minWidth: '100vw',
                            width: '100vw',
                            height: '100dvh', // Use dvh
                            scrollSnapAlign: 'start',
                            scrollSnapStop: 'always',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Media Background (Video or Image/Slideshow) */}
                            {item.videoUrls && item.videoUrls.length > 0 ? (
                                <SequentialVideoPlayer
                                    videoUrls={item.videoUrls}
                                    poster={item.posterImage}
                                />
                            ) : item.videoUrl ? (
                                <Box
                                    component="video"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    poster={item.posterImage}
                                    onError={(e) => {
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
                                    <source src={item.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </Box>
                            ) : (
                                <GallerySlideshow
                                    mainImage={item.posterImage || ''}
                                    images={item.images}
                                    title={item.title}
                                    isCleanView={isCleanView && !item.videoUrl} // Only pass true if not a video item (Video handles itself or doesn't support clean view nav yet)
                                />
                            )}

                            {/* Gradient Overlay */}
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.5) 50%, rgba(10, 10, 10, 0.8) 100%)',
                                zIndex: 1,
                                opacity: isCleanView ? 0 : 1,
                                transition: 'opacity 0.6s ease-in-out',
                                pointerEvents: 'none'
                            }} />

                            {/* Content */}
                            <Container sx={{
                                position: 'relative',
                                zIndex: 2,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                pointerEvents: isCleanView ? 'none' : 'auto' // Allow clicks to pass through when in clean view
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    maxWidth: { md: '900px' },
                                    opacity: isCleanView ? 0 : 1,
                                    transition: 'opacity 0.6s ease-in-out',
                                    pointerEvents: isCleanView ? 'none' : 'auto'
                                }}>
                                    <Box sx={{
                                        padding: { xs: '1rem 0', md: '2rem 0' },
                                        animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                                    }}>
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
                                                animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards',
                                                whiteSpace: 'pre-line'
                                            }}
                                        >
                                            {item.description}
                                        </Typography>

                                        {/* Buttons Container */}
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', md: 'row' },
                                            gap: { xs: 2, md: 2 },
                                            alignItems: { xs: 'stretch', md: 'flex-start' }
                                        }}>
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
                                                {item.id === 'ab-video-slide' ? t('videoSlide.cta') : t('inquirePrice')}
                                            </Button>

                                            {/* Clean View Button */}
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                onClick={() => setIsCleanView(true)}
                                                sx={{
                                                    px: 4,
                                                    py: 1.5,
                                                    fontSize: '0.9rem',
                                                    fontWeight: 600,
                                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                                    color: 'white',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    opacity: 0,
                                                    animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards',
                                                    '&:hover': {
                                                        borderColor: 'primary.main',
                                                        color: 'primary.main',
                                                        backgroundColor: 'rgba(0,0,0,0.2)'
                                                    }
                                                }}
                                            >
                                                {t('viewFullScreen')}
                                            </Button>
                                        </Box>
                                    </Box>

                                    {/* Scroll Indicator (on all items except the last one) */}
                                    {index < displayItems.length - 1 && (
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

            {/* Close Clean View Button */}
            <Box
                sx={{
                    position: 'fixed',
                    top: { xs: '1rem', md: '2rem' },
                    right: { xs: '1rem', md: '2rem' },
                    zIndex: 1300, // Ensure it's above everything including the high z-index container
                    opacity: isCleanView ? 1 : 0,
                    visibility: isCleanView ? 'visible' : 'hidden',
                    transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
                }}
            >
                <IconButton
                    onClick={() => setIsCleanView(false)}
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Back Button (for Collection View) */}
            {onBack && !isCleanView && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: { xs: '1rem', md: '2rem' },
                        left: { xs: '1rem', md: '2rem' },
                        zIndex: 1100, // Above normal content, below clean view z-index (1200+)
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                >
                    <IconButton
                        onClick={onBack}
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(4px)',
                            padding: '12px',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
            )}

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
