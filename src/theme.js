import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#34d399',
      light: '#6ee7b7',
      dark: '#10b981',
    },
    background: {
      default: '#0f1116',
      paper: '#161922',
      alt: '#1a1d29',
    },
    divider: 'rgba(255,255,255,0.07)',
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    success: {
      main: '#4ade80',
      light: '#6ee7b7',
      dark: '#22c55e',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Space Grotesk","Segoe UI",system-ui,-apple-system,sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      color: '#ffffff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input::placeholder': {
            color: '#c0c0c0',
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#f5f5f5',
          '&.Mui-focused': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#e0e0e0',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#f5f5f5',
          '&:hover': {
            color: '#ffffff',
          },
        },
      },
    },
  },
});

export default theme;
