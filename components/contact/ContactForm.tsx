'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    Stack,
    Typography
} from '@mui/material';

export default function ContactForm() {
    const t = useTranslations('contactForm');
    const locale = useLocale();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    subject: 'Richiesta di Contatto Generale - Sito Web',
                    itemReference: 'Contatto Generale', // Fallback for the API
                    locale: locale
                }),
            });

            if (!res.ok) {
                throw new Error(t('error'));
            }

            setIsSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
        } catch (err) {
            setError(err instanceof Error ? err.message : t('error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Box sx={{ p: 4, textAlign: 'center', backgroundColor: 'rgba(212, 175, 55, 0.05)', borderRadius: 2 }}>
                <Alert severity="success" sx={{ mb: 3, justifyContent: 'center' }}>
                    {t('success')}
                </Alert>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setIsSuccess(false)}
                    sx={{ mt: 2 }}
                >
                    Invia un altro messaggio
                </Button>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={3}>
                <TextField
                    required
                    fullWidth
                    name="name"
                    label={t('name')}
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                />

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

                <TextField
                    fullWidth
                    name="phone"
                    type="tel"
                    label={t('phone')}
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                />

                <TextField
                    required
                    fullWidth
                    name="message"
                    label={t('message')}
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    sx={{ py: 1.5 }}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('submit')}
                </Button>
            </Stack>
        </Box>
    );
}
