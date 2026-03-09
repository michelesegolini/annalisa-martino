'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    Alert,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslations, useLocale } from 'next-intl';
import { GalleryItem, ContactFormData } from '@/types';
import { trackEvent } from '@/lib/analytics';

interface InquireModalProps {
    open: boolean;
    onClose: () => void;
    item: GalleryItem | null;
}

const InquireModal: React.FC<InquireModalProps> = ({ open, onClose, item }) => {
    const t = useTranslations('modal');
    const locale = useLocale();
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        itemReference: '',
        price: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    React.useEffect(() => {
        if (item && open) {
            setFormData((prev) => ({
                ...prev,
                itemReference: item.title,
                price: item.price || '',
                message: `${t('interestedIn')} "${item.title}".`,
            }));
            setSuccess(false);
            setError('');
        }
    }, [item, open, t]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const subject = t('emailSubject', {
                item: formData.itemReference || 'Item',
                price: formData.price || 'N/A',
                name: formData.name
            });

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, subject, locale }),
            });

            if (!response.ok) {
                throw new Error('Failed to send inquiry');
            }

            // Success handling
            setSuccess(true);
            setSnackbarOpen(true);

            trackEvent('inquire_form_submit', {
                item_reference: formData.itemReference || '',
                item_price: formData.price || ''
            });

            // Close modal immediately
            onClose();

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                itemReference: '',
                price: '',
            });
            setSuccess(false); // Reset success state for next open

        } catch (err) {
            setError('Failed to send your inquiry. Please try again.');
            console.error('Contact form error:', err);

            trackEvent('inquire_form_error', {
                error_message: err instanceof Error ? err.message : 'Unknown error',
                item_reference: formData.itemReference || ''
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
            setError('');
            setSuccess(false);
        }
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 1,
                        p: 2,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pb: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h4" component="div" sx={{ mb: 0.5 }}>
                            {t('title')}
                        </Typography>
                        {item && (
                            <Typography variant="body2" color="text.secondary">
                                {item.title}
                            </Typography>
                        )}
                    </Box>
                    <IconButton
                        onClick={handleClose}
                        disabled={loading}
                        sx={{ color: 'text.secondary' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        {/* Error Alert kept inside modal */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {t('errorMessage')}
                            </Alert>
                        )}

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <TextField
                                required
                                fullWidth
                                label={t('fullName')}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                                autoFocus
                            />

                            <TextField
                                required
                                fullWidth
                                type="email"
                                label={t('email')}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <TextField
                                fullWidth
                                label={t('phone')}
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <TextField
                                required
                                fullWidth
                                multiline
                                rows={4}
                                label={t('message')}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                disabled={loading}
                                helperText={t('messageHelper')}
                            />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 2, pt: 3 }}>
                        <Button
                            onClick={handleClose}
                            disabled={loading}
                            sx={{ mr: 1 }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                minWidth: 120,
                                position: 'relative',
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                t('send')
                            )}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {t('successMessage')}
                </Alert>
            </Snackbar>
        </>
    );
};

export default InquireModal;
