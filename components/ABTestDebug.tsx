'use client';

import { useABVariant } from './ABTestProvider';
import { Box, Typography } from '@mui/material';

export default function ABTestDebug() {
    const variant = useABVariant();

    if (process.env.NODE_ENV === 'production') {
        return null; // Hide in production usually, or keep behind a flag
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: 1,
                borderRadius: 1,
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        >
            <Typography variant="caption">
                A/B Variant: <strong>{variant}</strong>
            </Typography>
        </Box>
    );
}
