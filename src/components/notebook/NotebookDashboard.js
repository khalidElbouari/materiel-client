import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Snackbar,
  LinearProgress,
} from '@mui/material';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { useNotebook } from '../../contexts/NotebookContext';
import { api } from '../../services/api';

const NotebookDashboard = () => {
  const { activeNotebook, documents, addDocument, removeDocument, toggleChatMode } = useNotebook();
  const [uploadingFiles, setUploadingFiles] = useState(new Set());
  const [uploadProgress, setUploadProgress] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  if (!activeNotebook) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a notebook to get started
        </Typography>
      </Box>
    );
  }

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // Validate files before upload
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['text/plain', 'text/markdown', 'text/csv', 'application/pdf',
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                         'application/msword'];

    const validFiles = [];
    const invalidFiles = [];

    files.forEach(file => {
      if (file.size > maxFileSize) {
        invalidFiles.push(`${file.name}: Fichier trop volumineux (max 10MB)`);
      } else if (!allowedTypes.includes(file.type) && !file.name.match(/\.(txt|md|csv|pdf|doc|docx)$/i)) {
        invalidFiles.push(`${file.name}: Format non supporté`);
      } else {
        validFiles.push(file);
      }
    });

    // Show validation errors
    invalidFiles.forEach(error => {
      setSnackbar({
        open: true,
        message: error,
        severity: 'error'
      });
    });

    if (validFiles.length === 0) return;

    // Initialize upload states for valid files
    const fileIds = validFiles.map(file => `${file.name}-${Date.now()}`);
    const newUploadingFiles = new Set(fileIds);
    const newProgress = {};

    fileIds.forEach(id => {
      newProgress[id] = 0;
    });

    setUploadingFiles(prev => new Set([...prev, ...newUploadingFiles]));
    setUploadProgress(prev => ({ ...prev, ...newProgress }));

    let successCount = 0;
    let errorCount = 0;

    // Upload files concurrently with individual progress tracking
    const uploadPromises = validFiles.map(async (file, index) => {
      const fileId = fileIds[index];

      try {
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: Math.min(prev[fileId] + Math.random() * 30, 90)
          }));
        }, 200);

        const result = await addDocument(activeNotebook.id, file);

        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));

        successCount++;

        // Remove from uploading state after a short delay
        setTimeout(() => {
          setUploadingFiles(prev => {
            const newSet = new Set(prev);
            newSet.delete(fileId);
            return newSet;
          });
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
          });
        }, 1000);

        return result;
      } catch (error) {
        console.error(`Upload failed for ${file.name}:`, error);
        errorCount++;

        setUploadingFiles(prev => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });

        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });

        // Show specific error message
        const errorMessage = error.message?.includes('Unsupported file type')
          ? `${file.name}: Format non supporté. Utilisez PDF, DOCX, TXT, ou MD.`
          : error.message?.includes('File too large')
          ? `${file.name}: Fichier trop volumineux.`
          : `${file.name}: Échec de l'upload.`;

        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error'
        });

        return null;
      }
    });

    await Promise.allSettled(uploadPromises);

    // Show final summary
    if (successCount > 0) {
      setSnackbar({
        open: true,
        message: `${successCount} document${successCount > 1 ? 's' : ''} uploadé${successCount > 1 ? 's' : ''} avec succès${errorCount > 0 ? ` (${errorCount} échec${errorCount > 1 ? 's' : ''})` : ''}`,
        severity: errorCount > 0 ? 'warning' : 'success'
      });
    } else if (errorCount > 0) {
      setSnackbar({
        open: true,
        message: 'Tous les uploads ont échoué. Vérifiez vos fichiers.',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {activeNotebook.name}
          </Typography>
          {activeNotebook.description && (
            <Typography variant="body2" color="text.secondary">
              {activeNotebook.description}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          startIcon={<ChatRoundedIcon />}
          sx={{ borderRadius: 3 }}
          onClick={toggleChatMode}
        >
          Start Chat
        </Button>
      </Stack>

      <Alert severity="warning" sx={{ mb: 3 }}>
        All documents are currently shared globally. Multi-notebook isolation coming soon.
      </Alert>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: '2px dashed',
          borderColor: uploadingFiles.size > 0 ? 'primary.main' : 'divider',
          bgcolor: uploadingFiles.size > 0 ? 'rgba(25,118,210,0.04)' : 'rgba(255,255,255,0.02)',
          textAlign: 'center',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Upload Progress Indicators */}
        {uploadingFiles.size > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
              Uploading {uploadingFiles.size} file{uploadingFiles.size > 1 ? 's' : ''}...
            </Typography>
            <Stack spacing={1}>
              {Array.from(uploadingFiles).map(fileId => (
                <Box key={fileId} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ flex: 1, textAlign: 'left' }}>
                    {fileId.split('-')[0]}
                  </Typography>
                  <Box sx={{ flex: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress[fileId] || 0}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {Math.round(uploadProgress[fileId] || 0)}%
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        <input
          accept=".txt,.md,.csv,.pdf,.doc,.docx"
          style={{ display: 'none' }}
          id="file-upload"
          multiple
          type="file"
          onChange={handleFileUpload}
          disabled={uploadingFiles.size > 0}
        />
        <label htmlFor="file-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<UploadFileRoundedIcon />}
            sx={{ borderRadius: 2 }}
            disabled={uploadingFiles.size > 0}
          >
            {uploadingFiles.size > 0 ? 'Uploading...' : 'Upload Documents'}
          </Button>
        </label>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Drag & drop files here or click to browse
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Supports TXT, MD, CSV, PDF, DOC, DOCX (Max 10MB per file)
        </Typography>
      </Paper>

      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Documents ({documents.length})
      </Typography>

      {documents.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.02)' }}>
          <Typography variant="body1" color="text.secondary">
            No documents uploaded yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload some documents to start chatting with them
          </Typography>
        </Paper>
      ) : (
        <List>
          {documents.map((doc) => (
            <ListItem key={doc._id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
              <ListItemText
                primary={doc.title}
                secondary={`${(doc.metadata?.fileName || 'Unknown file')} • ${(doc.metadata?.size / 1024 || 0).toFixed(1)} KB • ${new Date(doc.createdAt).toLocaleDateString()}`}
              />
              <ListItemSecondaryAction>
                <Chip
                  label={`${doc.chunkCount || 0} chunks`}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
                <IconButton
                  edge="end"
                  onClick={() => removeDocument(activeNotebook.id, doc._id)}
                  color="error"
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotebookDashboard;