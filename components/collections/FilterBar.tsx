'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

interface FilterBarProps {
    categories: string[];
    activeCategory: string | null;
    onFilterChange: (category: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, onFilterChange }) => {
    const t = useTranslations('gallery');

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 6,
            }}
        >
            <Button
                variant={activeCategory === null ? 'contained' : 'text'}
                color={activeCategory === null ? 'primary' : 'inherit'}
                onClick={() => onFilterChange(null)}
                sx={{
                    minWidth: 'auto',
                    borderRadius: 2,
                    px: 3,
                }}
            >
                {t('filterAll')}
            </Button>
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={activeCategory === category ? 'contained' : 'text'}
                    color={activeCategory === category ? 'primary' : 'inherit'}
                    onClick={() => onFilterChange(category)}
                    sx={{
                        minWidth: 'auto',
                        borderRadius: 2,
                        px: 3,
                    }}
                >
                    {category}
                </Button>
            ))}
        </Box>
    );
};

export default FilterBar;
