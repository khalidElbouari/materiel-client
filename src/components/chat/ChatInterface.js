import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNotebook } from '../../contexts/NotebookContext';
import ChatInput from './ChatInput';
import MarkdownMessage from './MarkdownMessage';  // ✅ Import the new component
import { api } from '../../services/api';

const ChatInterface = () => {
  const { activeNotebook, chatHistory, addMessage, toggleChatMode, clearChat } = useNotebook();
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    addMessage(activeNotebook.id, {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    });

    setLoading(true);

    try {
      const response = await api.queryDocuments(message, activeNotebook.id);
      addMessage(activeNotebook.id, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.answer,
        sources: response.sourceDocuments || [],
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Query failed:', error);
      addMessage(activeNotebook.id, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error while processing your question. Please try again.',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    clearChat(activeNotebook.id);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <IconButton color="primary" onClick={toggleChatMode} sx={{ mr: 1 }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            Chat with {activeNotebook.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ask questions about your documents
          </Typography>
        </Box>
        <Chip
          label="New Chat"
          onClick={handleNewChat}
          size="small"
          sx={{ borderRadius: 2 }}
        />
      </Stack>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {chatHistory.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h6">Start a conversation</Typography>
              <Typography variant="body2" color="text.secondary">
                Ask questions about your uploaded documents
              </Typography>
            </Stack>
          </Box>
        ) : (
          chatHistory.map((message) => (
            <Box key={message.id}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: message.type === 'user' ? 'primary.main' : 'background.paper',
                  color: message.type === 'user' ? 'primary.contrastText' : 'text.primary',
                  alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  ml: message.type === 'user' ? 'auto' : 0,
                  mr: message.type === 'user' ? 0 : 'auto',
                }}
              >
                {/* ✅ Use MarkdownMessage component for AI responses */}
                {message.type === 'ai' ? (
                  <MarkdownMessage content={message.content} />
                ) : (
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>{message.content}</Typography>
                )}
              </Paper>

              {/* Sources */}
              {message.sources && message.sources.length > 0 && (
                <Box
                  sx={{
                    mt: 1,
                    ml: message.type === 'user' ? 'auto' : 0,
                    mr: message.type === 'user' ? 0 : 'auto',
                    maxWidth: '80%',
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 0.5, display: 'block' }}
                  >
                    Sources:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {message.sources.map((source, index) => (
                      <Chip
                        key={index}
                        label={source.metadata?.filename || `Source ${index + 1}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem', mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          ))
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <ChatInput onSend={handleSendMessage} disabled={loading} />
      </Box>
    </Box>
  );
};

export default ChatInterface;