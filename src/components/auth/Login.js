import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Stack,
  Container,
  Grid,
  Fade,
  useTheme,
  alpha,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import { useAuth } from '../../contexts/AuthContext';

const FeatureCard = ({ icon, title, description, delay }) => {
  const theme = useTheme();
  
  return (
    <Fade in timeout={1000} style={{ transitionDelay: `${delay}ms` }}>
      <Paper
        sx={{
          p: 3,
          height: '100%',
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: 3,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            borderColor: theme.palette.primary.main,
            boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1, color: '#ffffff' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#b0b0b0', lineHeight: 1.7 }}>
          {description}
        </Typography>
      </Paper>
    </Fade>
  );
};

const Login = () => {
  const { login, loading } = useAuth();
  const theme = useTheme();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: 'background.default' }}
      >
        <Stack spacing={2} alignItems="center">
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '4px solid',
              borderColor: 'primary.main',
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
          <Typography variant="h6" sx={{ color: '#ffffff' }}>
            Loading...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '60%',
          height: '100%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(-50px, 50px) scale(1.1)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '50%',
          height: '80%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left side - Hero content */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={800}>
                <Stack spacing={4}>
                  {/* Logo & Brand */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                      }}
                    >
                      <TranslateRoundedIcon sx={{ fontSize: 36, color: 'primary.main' }} />
                    </Box>
                    <Typography 
                      variant="h4" 
                      fontWeight={700}
                      sx={{ color: '#ffffff' }}
                    >
                      {process.env.REACT_APP_NAME || 'RAG Materiel'}
                    </Typography>
                  </Box>

                  {/* Hero text */}
                  <Box>
                    <Typography 
                      variant="h2" 
                      fontWeight={700}
                      sx={{ 
                        color: '#ffffff',
                        mb: 2,
                        lineHeight: 1.2,
                      }}
                    >
                      Your Documents,
                      <Box 
                        component="span" 
                        sx={{ 
                          color: 'primary.main',
                          display: 'block',
                        }}
                      >
                        Supercharged by AI
                      </Box>
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#b0b0b0',
                        lineHeight: 1.6,
                        maxWidth: 500,
                      }}
                    >
                      Upload your documents and have intelligent conversations with them. 
                      Get instant answers, summaries, and insights powered by advanced AI.
                    </Typography>
                  </Box>

                  {/* Key stats */}
                  <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
                    <Box>
                      <Typography variant="h4" fontWeight={700} sx={{ color: 'primary.main' }}>
                        100%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#808080' }}>
                        Private & Secure
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight={700} sx={{ color: 'primary.main' }}>
                        AI
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#808080' }}>
                        Powered Analysis
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight={700} sx={{ color: 'primary.main' }}>
                        ∞
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#808080' }}>
                        Documents
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Fade>
            </Grid>

            {/* Right side - Login card */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(40px)',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    boxShadow: `0 20px 60px ${alpha('#000', 0.4)}`,
                  }}
                >
                  <Stack spacing={3} alignItems="center">
                    {/* Decorative icon */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: -4,
                          borderRadius: '50%',
                          padding: '2px',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                        },
                      }}
                    >
                      <AutoAwesomeRoundedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ mb: 1, color: '#ffffff' }}>
                        Welcome Back
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#b0b0b0' }}>
                        Sign in to access your intelligent document workspace
                      </Typography>
                    </Box>

                    {/* Sign in button */}
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={login}
                      sx={{
                        py: 1.8,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        bgcolor: '#ffffff',
                        color: '#1f1f1f',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          bgcolor: '#f5f5f5',
                          boxShadow: '0 6px 30px rgba(0, 0, 0, 0.15)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Continue with Google
                    </Button>

                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#808080',
                        textAlign: 'center',
                        maxWidth: 320,
                      }}
                    >
                      By continuing, you agree to our Terms of Service and Privacy Policy. 
                      Your data is encrypted and secure.
                    </Typography>
                  </Stack>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Box>

        {/* Features section */}
        <Box sx={{ pb: 8 }}>
          <Typography 
            variant="h4" 
            fontWeight={700} 
            textAlign="center" 
            sx={{ mb: 6, color: '#ffffff' }}
          >
            Why Choose {process.env.REACT_APP_NAME || 'RAG Materiel'}?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<DescriptionRoundedIcon sx={{ fontSize: 28, color: 'primary.main' }} />}
                title="Upload Any Document"
                description="Support for PDF, DOCX, TXT, MD, and more. Your documents are automatically processed and indexed for intelligent search."
                delay={0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<ChatRoundedIcon sx={{ fontSize: 28, color: 'primary.main' }} />}
                title="AI-Powered Chat"
                description="Ask questions in natural language and get accurate answers with citations. Our AI understands context and provides relevant insights."
                delay={100}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<SecurityRoundedIcon sx={{ fontSize: 28, color: 'primary.main' }} />}
                title="Private & Secure"
                description="Your documents are encrypted and isolated. Only you have access to your data. We prioritize your privacy and security."
                delay={200}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;