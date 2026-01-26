'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D4AF37', // Luxurious gold
            light: '#E5C158',
            dark: '#B8941F',
            contrastText: '#0A0A0A',
        },
        secondary: {
            main: '#F5F5F0', // Elegant cream
            light: '#FFFFFF',
            dark: '#E0E0D8',
            contrastText: '#0A0A0A',
        },
        background: {
            default: '#0A0A0A', // Deep black
            paper: '#1A1A1A',
        },
        text: {
            primary: '#F5F5F0',
            secondary: '#B8B8B0',
        },
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
            fontSize: '3.5rem',
            lineHeight: 1.2,
            letterSpacing: '0.02em',
        },
        h2: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
            fontSize: '2.75rem',
            lineHeight: 1.3,
            letterSpacing: '0.01em',
        },
        h3: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500,
            fontSize: '2rem',
            lineHeight: 1.4,
        },
        h4: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 500,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0',
                    padding: '14px 32px',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(212, 175, 55, 0.25)',
                    },
                },
                contained: {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: '4px',
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(26, 26, 26, 0.95)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(212, 175, 55, 0.3)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(212, 175, 55, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
