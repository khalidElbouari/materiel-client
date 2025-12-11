import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#22c55e' },
    secondary: { main: '#34d399' },
    background: {
      default: '#0f1116',
      paper: '#161922',
    },
    divider: 'rgba(255,255,255,0.07)',
    text: {
      primary: '#f6f7fb',
      secondary: '#a5adbf',
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
      color: '#c4cad8',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
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
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
