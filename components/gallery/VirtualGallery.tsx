'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import Back Icon
import FullscreenIcon from '@mui/icons-material/Fullscreen'; // Import Fullscreen Icon
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

    const renderImage = (img: string, index: number, isSingle: boolean = false) => (
        <Box
            key={`${img}-${index}`}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: isSingle ? 1 : (index === currentIndex ? 1 : 0),
                transition: isSingle ? 'none' : 'opacity 1.5s ease-in-out',
                zIndex: isSingle ? 0 : (index === currentIndex ? 1 : 0),
                overflow: 'hidden'
            }}
        >
            {/* Blurred Background - Only visible on desktop where main image is contained */}
            <Box
                component="img"
                src={img}
                alt=""
                sx={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '120%',
                    height: '120%',
                    objectFit: 'cover',
                    filter: 'blur(30px) brightness(0.6)',
                    transform: 'scale(1.1)',
                    display: { xs: 'none', md: 'block' }
                }}
            />
            {/* Main Image */}
            <Box
                component="img"
                src={img}
                alt={isSingle ? title : `${title} - view ${index + 1}`}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: { xs: 'cover', md: 'contain' }, // Cover on mobile, contain with blur on desktop
                    zIndex: 1
                }}
            />
        </Box>
    );

    if (!hasMultiple) {
        return (
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                {renderImage(mainImage, 0, true)}
            </Box>
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
            {allImages.map((img, index) => renderImage(img, index))}

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
                            zIndex: 20,
                            pointerEvents: 'auto',
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
                            zIndex: 20,
                            pointerEvents: 'auto',
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
    const [activeIndex, setActiveIndex] = useState(0); // State for dot indicator
    const t = useTranslations('gallery');

    // Refs for Intersection Observer
    const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    const displayItems = items;

    // Setup intersection observer to detect the currently visible slide
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // Trigger when 50% of the item is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = itemRefs.current.findIndex(ref => ref === entry.target);
                    if (index !== -1) {
                        setActiveIndex(index);
                    }
                }
            });
        }, options);

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            itemRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [displayItems]);

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
                        <Box
                            key={item.id}
                            ref={(el: HTMLDivElement | null) => { itemRefs.current[index] = el; }} // Assign ref
                            sx={{
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
                                background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(10, 10, 10, 0.6) 80%, rgba(10, 10, 10, 0.9) 100%)',
                                zIndex: 1,
                                opacity: isCleanView ? 0 : 1,
                                transition: 'opacity 0.6s ease-in-out',
                                pointerEvents: 'none'
                            }} />

                            {/* Expand to Fullscreen Icon (Discrete) */}
                            {(!item.videoUrls || item.videoUrls.length === 0) && !item.videoUrl && !isCleanView && (
                                <IconButton
                                    onClick={() => setIsCleanView(true)}
                                    sx={{
                                        position: 'absolute',
                                        top: { xs: '1rem', md: '2rem' },
                                        right: { xs: '1rem', md: '2rem' },
                                        color: 'white',
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        backdropFilter: 'blur(4px)',
                                        width: 44,
                                        height: 44,
                                        zIndex: 10,
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                        }
                                    }}
                                    aria-label="View Fullscreen"
                                >
                                    <FullscreenIcon />
                                </IconButton>
                            )}

                            {/* Content */}
                            <Container sx={{
                                position: 'relative',
                                zIndex: 2,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'flex-end',
                                pb: { xs: '2rem', md: '3rem' },
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
                                        {item.category && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, opacity: 0, animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards' }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.8rem',
                                                        letterSpacing: '0.2em',
                                                        textTransform: 'uppercase',
                                                        color: 'rgba(255,255,255,0.7)',
                                                        border: '1px solid rgba(255,255,255,0.3)',
                                                        padding: '4px 12px',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    {item.category}
                                                </Typography>
                                            </Box>
                                        )}

                                        {/* Title */}
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                mb: 4,
                                                fontWeight: 600,
                                                textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
                                                fontSize: { xs: '2rem', md: '3.5rem' },
                                                opacity: 0,
                                                animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards'
                                            }}
                                        >
                                            {item.title}
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
                                        </Box>
                                    </Box>

                                    {/* Scroll Indicator REMOVED */}
                                </Box>
                            </Container>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Carousel Dot Indicator */}
            {displayItems.length > 1 && !isCleanView && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: { xs: '1rem', md: '2rem' },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        zIndex: 1100, // Above content, below modals
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(4px)',
                        padding: '8px 12px',
                        borderRadius: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                >
                    {displayItems.map((_, idx) => (
                        <Box
                            key={`dot-${idx}`}
                            onClick={() => {
                                itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: activeIndex === idx ? 'primary.main' : 'rgba(255, 255, 255, 0.4)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: activeIndex === idx ? 'primary.main' : 'rgba(255, 255, 255, 0.8)',
                                }
                            }}
                        />
                    ))}
                </Box>
            )}

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
                        width: 44,
                        height: 44,
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
                            width: 44,
                            height: 44,
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
