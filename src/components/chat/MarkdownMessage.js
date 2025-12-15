import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Box } from '@mui/material';

const MarkdownMessage = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        // Paragraphs
        p: ({ children }) => (
          <Typography variant="body1" sx={{ mb: 1.5, lineHeight: 1.6 }}>
            {children}
          </Typography>
        ),
        
        // Headings
        h1: ({ children }) => (
          <Typography variant="h5" sx={{ mb: 1.5, mt: 2, fontWeight: 600 }}>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant="h6" sx={{ mb: 1, mt: 1.5, fontWeight: 600 }}>
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant="subtitle1" sx={{ mb: 1, mt: 1.5, fontWeight: 600 }}>
            {children}
          </Typography>
        ),
        
        // Lists
        ul: ({ children }) => (
          <Box component="ul" sx={{ mb: 1.5, pl: 2 }}>
            {children}
          </Box>
        ),
        ol: ({ children }) => (
          <Box component="ol" sx={{ mb: 1.5, pl: 2 }}>
            {children}
          </Box>
        ),
        li: ({ children }) => (
          <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
            {children}
          </Typography>
        ),
        
        // Text formatting
        strong: ({ children }) => (
          <Typography component="strong" sx={{ fontWeight: 700 }}>
            {children}
          </Typography>
        ),
        em: ({ children }) => (
          <Typography component="em" sx={{ fontStyle: 'italic' }}>
            {children}
          </Typography>
        ),
        
        // Code blocks
        code: ({ inline, children }) => {
          if (inline) {
            return (
              <Typography
                component="code"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  px: 0.5,
                  py: 0.25,
                  borderRadius: 0.5,
                  fontSize: '0.875em',
                  fontFamily: 'monospace',
                }}
              >
                {children}
              </Typography>
            );
          }
          return (
            <Box
              component="pre"
              sx={{
                bgcolor: 'rgba(255,255,255,0.05)',
                p: 1.5,
                borderRadius: 1,
                overflow: 'auto',
                mb: 1.5,
              }}
            >
              <Typography
                component="code"
                sx={{
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              >
                {children}
              </Typography>
            </Box>
          );
        },
        
        // Blockquotes
        blockquote: ({ children }) => (
          <Box
            component="blockquote"
            sx={{
              borderLeft: '3px solid',
              borderColor: 'primary.main',
              pl: 2,
              py: 0.5,
              my: 1.5,
              color: 'text.secondary',
            }}
          >
            {children}
          </Box>
        ),
        
        // Links
        a: ({ href, children }) => (
          <Typography
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {children}
          </Typography>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownMessage;