import React from 'react';
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Tooltip,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const ChatInput = ({ onSend, disabled = false }) => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: 1,
        borderRadius: 14,
        bgcolor: 'rgba(255,255,255,0.06)',
        border: '1px solid',
        borderColor: 'divider',
        maxWidth: 900,
        mx: 'auto',
        width: '100%',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton color="inherit" size="small" type="button">
          <AddRoundedIcon />
        </IconButton>
        <InputBase
          fullWidth
          placeholder="Ask a question about your documents"
          sx={{ color: 'text.primary', fontSize: 16, px: 1 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: 'divider', mx: 0.5, height: 32 }}
        />
        <Tooltip title="Voice input">
          <IconButton color="inherit" size="small" type="button">
            <MicNoneRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Transcribe">
          <IconButton color="inherit" size="small" type="button">
            <GraphicEqRoundedIcon />
          </IconButton>
        </Tooltip>
        <IconButton
          color="primary"
          size="small"
          sx={{ bgcolor: 'rgba(34,197,94,0.14)' }}
          type="submit"
          disabled={disabled || !message.trim()}
        >
          <SendRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default ChatInput;
