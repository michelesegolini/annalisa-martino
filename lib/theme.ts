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
        MuiCssBaseline: {
            styleOverrides: (themeParam) => `
        :root {
          --transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        html {
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        body {
          background-color: ${themeParam.palette.background.default};
          color: ${themeParam.palette.text.primary};
          font-family: ${themeParam.typography.fontFamily};
          line-height: 1.7;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1A1A1A; /* theme.palette.background.paper assuming it matches */
        }
        ::-webkit-scrollbar-thumb {
          background: ${themeParam.palette.primary.dark};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${themeParam.palette.primary.main};
        }
        ::selection {
          background-color: ${themeParam.palette.primary.main};
          color: ${themeParam.palette.common.black};
        }
        a, button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        *:focus-visible {
          outline: 2px solid ${themeParam.palette.primary.main};
          outline-offset: 4px;
        }
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
      `,
        },
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
