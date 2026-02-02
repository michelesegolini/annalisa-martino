'use client';

import { useABVariant } from './ABTestProvider';
import { Box, Typography } from '@mui/material';

export default function ABTestDebug() {
    const variant = useABVariant();

    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace',
                pointerEvents: 'none'
            }}
        >
            <Typography variant="caption">
                A/B Variant: <strong>{variant}</strong>
            </Typography>
        </Box>
    );
}
