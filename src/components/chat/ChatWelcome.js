import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import ChatInput from './ChatInput';

const starterPrompts = [
  'Summarize the uploaded documents',
  'What are the key findings in my research papers?',
  'Explain the main concepts from these files',
  'Generate insights from my documents',
];

const ChatWelcome = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        textAlign: 'center',
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Typography variant="h4">Ask your documents</Typography>
        <Typography variant="body1" color="text.secondary">
          Upload documents to your notebook and start chatting with them.
        </Typography>
      </Stack>

      <ChatInput />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 2,
          width: '100%',
          maxWidth: 960,
          px: { xs: 2, md: 0 },
        }}
      >
        {starterPrompts.map((prompt) => (
          <Paper
            key={prompt}
            variant="outlined"
            sx={{
              p: 2,
              height: '100%',
              borderRadius: 12,
              bgcolor: 'rgba(255,255,255,0.04)',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
              <Chip
                label="Suggestion"
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: 'rgba(34,197,94,0.14)',
                  color: 'primary.main',
                  fontWeight: 600,
                }}
              />
            <Typography variant="body1" fontWeight={600}>
              {prompt}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ChatWelcome;
