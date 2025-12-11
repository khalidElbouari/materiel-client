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
        <Typography>Loading your notebooks...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', p: 3 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome to {process.env.REACT_APP_NAME || 'RAG Materiel'}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
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
              bgcolor: 'rgba(255,255,255,0.02)',
              border: '2px dashed',
              borderColor: 'divider',
            }}
          >
            <DescriptionRoundedIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              No notebooks yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Create your first notebook to start uploading documents and chatting with your AI assistant.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddCircleRoundedIcon />}
              onClick={handleCreateNotebook}
              sx={{ borderRadius: 2 }}
            >
              Create Your First Notebook
            </Button>
          </Paper>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600}>
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
                      borderColor: 'divider',
                      background: 'linear-gradient(135deg, rgba(22, 25, 34, 0.8) 0%, rgba(26, 29, 41, 0.8) 100%)',
                      backdropFilter: 'blur(10px)',
                      animationDelay: `${index * 0.1}s`,
                    }}
                    onClick={() => selectNotebook(notebook.id)}
                  >
                    <CardContent sx={{ pb: 1 }}>
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <DescriptionRoundedIcon color="primary" />
                          <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
                            {notebook.name}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => handleDeleteNotebook(e, notebook.id, notebook.name)}
                            sx={{
                              color: 'error.main',
                              '&:hover': { bgcolor: 'error.main', color: 'white' },
                            }}
                          >
                            <DeleteRoundedIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {notebook.description && (
                          <Typography variant="body2" color="text.secondary">
                            {notebook.description}
                          </Typography>
                        )}

                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={`${notebook.documentCount} documents`}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Created {new Date(notebook.createdAt).toLocaleDateString()}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                      <Button
                        size="small"
                        startIcon={<ChatRoundedIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
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

        {/* Features Section */}
        {notebooks.length > 0 && (
          <Paper sx={{ p: 4, bgcolor: 'rgba(25,118,210,0.04)', borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              🚀 What you can do with {process.env.REACT_APP_NAME || 'RAG Materiel'}
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    📄 Upload Documents
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Support for PDF, DOCX, TXT, and MD files. Documents are automatically processed and chunked.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    🤖 AI-Powered Chat
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ask questions about your documents. The AI uses RAG to provide accurate, contextual answers.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    🔒 Secure & Private
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your documents and conversations are private. Data is isolated per user account.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

export default NotebooksHome;