'use client';

import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { GalleryItem } from '@/types';
import CollectionGrid from './CollectionGrid';

import InquireModal from '@/components/gallery/InquireModal';

interface CollectionDetailProps {
    title: string;
    description: string;
    items: GalleryItem[];
}

const CollectionDetail: React.FC<CollectionDetailProps> = ({ title, description, items }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const handleItemClick = (item: GalleryItem) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <Box sx={{ pt: { xs: 12, md: 16 }, pb: 12, minHeight: '100vh', backgroundColor: 'background.default' }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <Typography
                        variant="overline"
                        sx={{ color: 'primary.main', letterSpacing: '0.2em', mb: 2, display: 'block' }}
                    >
                        COLLECTION
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: '"Cormorant Garamond", serif',
                            mb: 3,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            maxWidth: '700px',
                            mx: 'auto',
                            color: 'text.secondary',
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                        }}
                    >
                        {description}
                    </Typography>
                </Box>



                {/* Grid */}
                <CollectionGrid items={items} onItemClick={handleItemClick} />

                {/* Modal */}
                <InquireModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    item={selectedItem}
                />
            </Container>
        </Box>
    );
};

export default CollectionDetail;
