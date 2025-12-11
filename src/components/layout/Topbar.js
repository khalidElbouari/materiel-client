import React from 'react';
import { Box, Chip, IconButton, Stack, Typography, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useAuth } from '../../contexts/AuthContext';

const Topbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <Box
      sx={{
        px: { xs: 3, md: 4 },
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        backdropFilter: 'blur(12px)',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            bgcolor: 'rgba(34,197,94,0.16)',
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
          }}
        >
          <TranslateRoundedIcon />
        </Box>
        <Stack spacing={0.2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="subtitle1" fontWeight={700}>
              {process.env.REACT_APP_NAME || 'NotebookLM Clone'}
            </Typography>
            <KeyboardArrowDownRoundedIcon fontSize="small" />
          </Stack>
          <Chip
            label="Authenticated"
            size="small"
            sx={{
              bgcolor: 'rgba(34,197,94,0.16)',
              color: 'success.main',
              fontWeight: 600,
              height: 24,
            }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton size="small" color="inherit">
          <LanguageRoundedIcon />
        </IconButton>
        <IconButton size="small" color="inherit">
          <HelpOutlineRoundedIcon />
        </IconButton>
        <IconButton size="small" color="inherit">
          <SettingsRoundedIcon />
        </IconButton>

        {/* User Menu */}
        <Button
          onClick={handleMenuClick}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 2,
            py: 1,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
          }}
          startIcon={
            <Avatar
              src={user?.avatar}
              sx={{ width: 32, height: 32 }}
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          }
          endIcon={<KeyboardArrowDownRoundedIcon />}
        >
          <Typography variant="body2" sx={{ ml: 1 }}>
            {user?.name}
          </Typography>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { minWidth: 200 },
          }}
        >
          <MenuItem onClick={handleLogout}>
            <LogoutRoundedIcon sx={{ mr: 1 }} />
            Sign Out
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default Topbar;