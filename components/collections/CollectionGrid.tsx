'use client';

import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { GalleryItem } from '@/types';

interface CollectionGridProps {
    items: GalleryItem[];
    onItemClick: (item: GalleryItem) => void;
}

const CollectionGrid: React.FC<CollectionGridProps> = ({ items, onItemClick }) => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
            },
            gap: 3
        }}>
            {items.map((item) => (
                <Box key={item.id}>
                    <Card
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            cursor: 'pointer',
                            '&:hover .item-image': {
                                transform: 'scale(1.05)',
                            },
                        }}
                        onClick={() => onItemClick(item)}
                    >
                        <Box sx={{ overflow: 'hidden', position: 'relative', paddingTop: '150%' /* 2:3 aspect ratio */ }}>
                            <CardMedia
                                component="img"
                                image={item.posterImage || item.videoUrl} // Fallback to poster or video placeholder
                                alt={item.title}
                                className="item-image"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s ease',
                                }}
                            />
                        </Box>
                        <CardContent sx={{ px: 0, py: 2 }}>
                            <Typography
                                variant="overline"
                                sx={{ color: 'primary.main', letterSpacing: '0.1em' }}
                            >
                                {item.category}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{ fontFamily: '"Cormorant Garamond", serif', mt: 0.5 }}
                            >
                                {item.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};

export default CollectionGrid;
