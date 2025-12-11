import React from 'react';
import { Box, Button, Typography, Paper, Avatar } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <Typography variant="h6" color="white">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            bgcolor: 'primary.main',
          }}
        >
          📚
        </Avatar>

        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          {process.env.REACT_APP_NAME || 'NotebookLM Clone'}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Sign in with Google to access your personal notebooks and documents
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={login}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: 500,
            backgroundColor: '#4285f4',
            '&:hover': {
              backgroundColor: '#3367d6',
            },
          }}
          fullWidth
        >
          Sign in with Google
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Secure authentication powered by Google OAuth
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;