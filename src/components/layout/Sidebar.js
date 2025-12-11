import React from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { useNotebook } from '../../contexts/NotebookContext';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ collapsed, onToggle }) => {
  const { notebooks, activeNotebookId, createNotebook, selectNotebook } = useNotebook();
  const { user, logout } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [newNotebookName, setNewNotebookName] = React.useState('');
  const [newNotebookDesc, setNewNotebookDesc] = React.useState('');

  const handleCreateNotebook = () => {
    if (newNotebookName.trim()) {
      createNotebook(newNotebookName.trim(), newNotebookDesc.trim());
      setNewNotebookName('');
      setNewNotebookDesc('');
      setCreateDialogOpen(false);
    }
  };

  const itemButtonStyles = {
    borderRadius: 12,
    px: collapsed ? 1 : 1.5,
    py: 1,
    justifyContent: collapsed ? 'center' : 'flex-start',
    minHeight: 46,
    '& .MuiListItemIcon-root': {
      minWidth: collapsed ? 0 : 40,
      mr: collapsed ? 0 : 1,
      justifyContent: 'center',
    },
  };

  return (
    <>
    <Box
      component="aside"
      sx={{
        width: collapsed ? 88 : { xs: 260, sm: 280 },
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: collapsed ? 1.5 : 2,
        p: collapsed ? 1.25 : 2,
        overflowY: 'auto',
        transition: 'width 0.25s ease, padding 0.25s ease',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={collapsed ? 0.75 : 1.5}
        sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '12px',
            bgcolor: 'rgba(34,197,94,0.16)',
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          <TranslateRoundedIcon fontSize="small" />
        </Box>
        {!collapsed && (
          <Typography variant="subtitle1" fontWeight={700}>
            {process.env.REACT_APP_NAME || 'NotebookLM Clone'}
          </Typography>
        )}
        <IconButton
          aria-label="Toggle sidebar"
          size="small"
          onClick={onToggle}
          sx={{ ml: 'auto', color: 'text.secondary' }}
        >
          {collapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
        </IconButton>
      </Stack>

      <List
        disablePadding
        dense
        sx={{
          '& .MuiListItemButton-root': itemButtonStyles,
        }}
      >
        <ListItem disableGutters>
          <ListItemButton onClick={() => setCreateDialogOpen(true)}>
            <ListItemIcon>
              <AddCircleRoundedIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="New Notebook" />}
          </ListItemButton>
        </ListItem>
        {notebooks.map((notebook) => (
          <ListItem key={notebook.id} disableGutters>
            <ListItemButton
              selected={notebook.id === activeNotebookId}
              onClick={() => selectNotebook(notebook.id)}
            >
              <ListItemIcon>
                <DescriptionRoundedIcon />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={notebook.name}
                  secondary={`${notebook.documentCount} docs`}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider flexItem />

      <Stack gap={0.75}>
        {!collapsed && (
          <Typography variant="overline" color="text.secondary" letterSpacing={0.8}>
            Conversations
          </Typography>
        )}
        <Box
          sx={{
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 12,
            p: collapsed ? 1 : 2,
            bgcolor: 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          {!collapsed ? (
            <Stack spacing={0.5}>
              <Typography variant="body2" fontWeight={600}>
                Historique en attente
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Les chats s&apos;afficheront ici une fois connectes au backend.
              </Typography>
            </Stack>
          ) : (
            <TranslateRoundedIcon color="primary" fontSize="small" />
          )}
        </Box>
      </Stack>

      <Box sx={{ flex: 1 }} />
      <Divider flexItem />
      <ListItemButton
        onClick={logout}
        sx={{
          ...itemButtonStyles,
          px: collapsed ? 1 : 1,
          py: 0.5,
        }}
      >
        <Avatar
          src={user?.avatar}
          sx={{
            width: 32,
            height: 32,
            flexShrink: 0,
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        {!collapsed && (
          <ListItemText
            primary={user?.name || 'User'}
            secondary="Sign Out"
            sx={{ ml: 1 }}
          />
        )}
        <IconButton size="small" color="inherit" sx={{ ml: collapsed ? 0 : 'auto' }}>
          <LogoutRoundedIcon fontSize="small" />
        </IconButton>
      </ListItemButton>
    </Box>

    <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Notebook</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Notebook Name"
          fullWidth
          variant="outlined"
          value={newNotebookName}
          onChange={(e) => setNewNotebookName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Description (optional)"
          fullWidth
          variant="outlined"
          multiline
          rows={2}
          value={newNotebookDesc}
          onChange={(e) => setNewNotebookDesc(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleCreateNotebook} variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default Sidebar;