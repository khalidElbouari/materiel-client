import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { NotebookProvider, useNotebook } from './contexts/NotebookContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './components/layout/AppLayout';
import NotebooksHome from './components/home/NotebooksHome';
import NotebookDashboard from './components/notebook/NotebookDashboard';
import Login from './components/auth/Login';
import theme from './theme';
import './App.css';

const AppContent = () => {
  const { activeNotebookId } = useNotebook();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // AuthContext handles loading state
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <AppLayout>
      {activeNotebookId ? <NotebookDashboard /> : <NotebooksHome />}
    </AppLayout>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotebookProvider>
          <div className="app" />
          <AppContent />
        </NotebookProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
