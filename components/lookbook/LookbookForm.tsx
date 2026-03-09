'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    TextField,
    Button,
    Box,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Alert,
    CircularProgress,
    Typography,
    Stack
} from '@mui/material';

interface LookbookFormProps {
    pdfUrl: string | null;
}

export default function LookbookForm() {
    const t = useTranslations('lookbook');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        clientType: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/lookbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(t('errorMessage'));
            }

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('errorMessage'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="overline"
                        sx={{ color: 'primary.main', letterSpacing: '0.2em', mb: 2, display: 'block' }}
                    >
                        {t('title')}
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: '"Cormorant Garamond", serif',
                            mb: 2,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                        }}
                    >
                        Annalisa Martino Collection
                    </Typography>
                </Box>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Alert severity="success" sx={{ mb: 4, justifyContent: 'center' }}>
                        {t('successMessage')}
                    </Alert>
                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                        {t('successDescription')}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        href="/"
                        sx={{ px: 4, py: 1.5 }}
                    >
                        {t('exploreGallery')}
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'primary.main', letterSpacing: '0.2em', mb: 2, display: 'block' }}
                >
                    {t('title')}
                </Typography>

                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        mb: 2,
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                    }}
                >
                    Annalisa Martino Collection
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: '600px', mx: 'auto', fontSize: '1.1rem' }}
                >
                    {t('subtitle')}
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: '600px', mx: 'auto' }}>
                <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            required
                            fullWidth
                            name="firstName"
                            label={t('firstName')}
                            value={formData.firstName}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            required
                            fullWidth
                            name="lastName"
                            label={t('lastName')}
                            value={formData.lastName}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Stack>

                    <TextField
                        required
                        fullWidth
                        name="email"
                        type="email"
                        label={t('email')}
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                    />

                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">{t('clientType')}</FormLabel>
                        <RadioGroup
                            name="clientType"
                            value={formData.clientType}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel
                                value="buyer"
                                control={<Radio />}
                                label={t('buyer')}
                            />
                            <FormControlLabel
                                value="private"
                                control={<Radio />}
                                label={t('privateClient')}
                            />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        fullWidth
                        name="message"
                        label={t('optionalMessage')}
                        multiline
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        variant="outlined"
                        helperText={t('messageHelper') || ''}
                    />

                    {error && <Alert severity="error">{error}</Alert>}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.clientType}
                        sx={{ mt: 2, py: 1.5 }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('submit')}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
