import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { NotebookProvider, useNotebook } from './contexts/NotebookContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './components/layout/AppLayout';
import ChatWelcome from './components/chat/ChatWelcome';
import NotebookDashboard from './components/notebook/NotebookDashboard';
import ChatInterface from './components/chat/ChatInterface';
import Login from './components/auth/Login';
import theme from './theme';
import './App.css';

const AppContent = () => {
  const { activeNotebookId, chatMode } = useNotebook();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // AuthContext handles loading state
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (chatMode && activeNotebookId) {
    return <ChatInterface />;
  }

  return (
    <AppLayout>
      {activeNotebookId ? <NotebookDashboard /> : <ChatWelcome />}
    </AppLayout>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotebookProvider>
          <div className="app-bg" />
          <AppContent />
        </NotebookProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
