import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Chip,
  IconButton,
  Stack,
  Paper,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { useNotebook } from '../../contexts/NotebookContext';

const NotebooksHome = () => {
  const { notebooks, createNotebook, selectNotebook, deleteNotebook, loading } = useNotebook();

  const handleCreateNotebook = () => {
    const name = prompt('Enter notebook name:');
    if (name?.trim()) {
      createNotebook(name.trim());
    }
  };

  const handleDeleteNotebook = (e, notebookId, notebookName) => {
    e.stopPropagation();
    if (window.confirm(`Delete notebook "${notebookName}"? This action cannot be undone.`)) {
      deleteNotebook(notebookId);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography sx={{ color: '#ffffff' }}>Loading your notebooks...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', p: 3 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            fontWeight={700} 
            gutterBottom
            sx={{ color: '#ffffff' }}
          >
            Welcome to {process.env.REACT_APP_NAME || 'RAG Materiel'}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ mb: 4, color: '#b0b0b0' }}
          >
            Your AI-powered document analysis platform
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddCircleRoundedIcon />}
            onClick={handleCreateNotebook}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
              bgcolor: 'primary.main',
              color: '#ffffff',
              boxShadow: '0 4px 20px rgba(34, 197, 94, 0.25)',
              '&:hover': {
                bgcolor: 'primary.dark',
                boxShadow: '0 6px 30px rgba(34, 197, 94, 0.35)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Create New Notebook
          </Button>
        </Box>

        {/* Notebooks Grid */}
        {notebooks.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              bgcolor: 'background.paper',
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <DescriptionRoundedIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>
              No notebooks yet
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#b0b0b0' }}>
              Create your first notebook to start uploading documents and chatting with your AI assistant.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddCircleRoundedIcon />}
              onClick={handleCreateNotebook}
              sx={{ 
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.light',
                  bgcolor: 'rgba(34, 197, 94, 0.08)',
                }
              }}
            >
              Create Your First Notebook
            </Button>
          </Paper>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600} sx={{ color: '#ffffff' }}>
              Your Notebooks ({notebooks.length})
            </Typography>

            <Grid container spacing={3}>
              {notebooks.map((notebook, index) => (
                <Grid item xs={12} sm={6} md={4} key={notebook.id}>
                  <Card
                    className="fade-in hover-lift"
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      animationDelay: `${index * 0.1}s`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: 'primary.main',
                        boxShadow: '0 12px 40px rgba(34, 197, 94, 0.2)',
                        '&::before': {
                          opacity: 1,
                        },
                      },
                    }}
                    onClick={() => selectNotebook(notebook.id)}
                  >
                    <CardContent sx={{ pb: 2 }}>
                      <Stack spacing={2.5}>
                        {/* Header with icon and delete button */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              bgcolor: 'rgba(34, 197, 94, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <FolderOpenRoundedIcon 
                              sx={{ 
                                fontSize: 24, 
                                color: 'primary.main' 
                              }} 
                            />
                          </Box>
                          
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography 
                              variant="h6" 
                              fontWeight={600}
                              sx={{ 
                                color: '#ffffff',
                                mb: 0.5,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {notebook.name}
                            </Typography>
                            {notebook.description && (
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: '#b0b0b0',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  lineHeight: 1.5,
                                }}
                              >
                                {notebook.description}
                              </Typography>
                            )}
                          </Box>

                          <IconButton
                            size="small"
                            onClick={(e) => handleDeleteNotebook(e, notebook.id, notebook.name)}
                            sx={{
                              color: 'rgba(255, 255, 255, 0.3)',
                              transition: 'all 0.2s ease',
                              '&:hover': { 
                                bgcolor: 'rgba(239, 68, 68, 0.1)',
                                color: 'error.main',
                              },
                            }}
                          >
                            <DeleteRoundedIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {/* Stats section */}
                        <Stack 
                          direction="row" 
                          spacing={1.5} 
                          alignItems="center"
                          sx={{ pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
                        >
                          <Chip
                            icon={<DescriptionRoundedIcon sx={{ fontSize: 16 }} />}
                            label={`${notebook.documentCount} ${notebook.documentCount === 1 ? 'doc' : 'docs'}`}
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(34, 197, 94, 0.1)',
                              color: 'primary.light',
                              borderRadius: 1.5,
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              '& .MuiChip-icon': {
                                color: 'primary.main',
                              }
                            }}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeRoundedIcon sx={{ fontSize: 14, color: '#808080' }} />
                            <Typography variant="caption" sx={{ color: '#808080' }}>
                              {new Date(notebook.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="medium"
                        startIcon={<ChatRoundedIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          borderColor: 'rgba(34, 197, 94, 0.3)',
                          color: 'primary.main',
                          fontWeight: 500,
                          py: 1,
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'rgba(34, 197, 94, 0.08)',
                          },
                        }}
                      >
                        Open Chat
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default NotebooksHome;