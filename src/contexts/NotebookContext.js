import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const NotebookContext = createContext();

export const useNotebook = () => {
  const context = useContext(NotebookContext);
  if (!context) {
    throw new Error('useNotebook must be used within a NotebookProvider');
  }
  return context;
};

export const NotebookProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [notebooks, setNotebooks] = useState([]);
  const [activeNotebookId, setActiveNotebookId] = useState(null);
  const [documents, setDocuments] = useState({});
  const [chatHistory, setChatHistory] = useState({});
  const [chatMode, setChatMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load from server when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    } else {
      // Clear data when not authenticated
      setNotebooks([]);
      setActiveNotebookId(null);
      setDocuments({});
      setChatHistory({});
      setChatMode(false);
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const serverNotebooks = await api.getNotebooks();
      // Transform backend data to frontend format (convert _id to id)
      const transformedNotebooks = serverNotebooks.map(notebook => ({
        ...notebook,
        id: notebook._id,
      }));
      setNotebooks(transformedNotebooks);

      // Load documents for each notebook
      const docs = {};
      for (const notebook of transformedNotebooks) {
        try {
          const notebookDocs = await api.getDocuments(notebook.id);
          docs[notebook.id] = notebookDocs;
        } catch (error) {
          console.warn(`Failed to load documents for notebook ${notebook.id}:`, error);
          docs[notebook.id] = [];
        }
      }
      setDocuments(docs);

      // Load local settings
      const savedActive = localStorage.getItem('activeNotebookId');
      const savedChat = localStorage.getItem('chatHistory');
      const savedChatMode = localStorage.getItem('chatMode');

      if (savedActive && transformedNotebooks.find(nb => nb.id === savedActive)) {
        setActiveNotebookId(savedActive);
      }
      if (savedChat) setChatHistory(JSON.parse(savedChat));
      if (savedChatMode) setChatMode(JSON.parse(savedChatMode));
    } catch (error) {
      console.error('Failed to load data from server:', error);
      // Clear data on error
      setNotebooks([]);
      setDocuments({});
    } finally {
      setLoading(false);
    }
  };

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('notebooks', JSON.stringify(notebooks));
  }, [notebooks]);

  useEffect(() => {
    localStorage.setItem('activeNotebookId', activeNotebookId || '');
  }, [activeNotebookId]);

  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem('chatMode', JSON.stringify(chatMode));
  }, [chatMode]);

  const createNotebook = async (name, description = '') => {
    try {
      const newNotebook = await api.createNotebook(name, description);
      // Transform backend response to frontend format
      const transformedNotebook = {
        ...newNotebook,
        id: newNotebook._id,
      };
      setNotebooks(prev => [...prev, transformedNotebook]);
      setDocuments(prev => ({ ...prev, [transformedNotebook.id]: [] }));
      setChatHistory(prev => ({ ...prev, [transformedNotebook.id]: [] }));
      return transformedNotebook.id;
    } catch (error) {
      console.error('Failed to create notebook:', error);
      throw error;
    }
  };

  const selectNotebook = (id) => {
    setActiveNotebookId(id);
  };

  const deleteNotebook = async (id) => {
    try {
      await api.deleteNotebook(id);
      setNotebooks(prev => prev.filter(nb => nb.id !== id));
      setDocuments(prev => {
        const newDocs = { ...prev };
        delete newDocs[id];
        return newDocs;
      });
      setChatHistory(prev => {
        const newChat = { ...prev };
        delete newChat[id];
        return newChat;
      });
      if (activeNotebookId === id) {
        setActiveNotebookId(null);
      }
    } catch (error) {
      console.error('Failed to delete notebook:', error);
      throw error;
    }
  };

  const addDocument = async (notebookId, file) => {
    try {
      const result = await api.uploadDocument(file, notebookId);
      // Refresh documents from server after upload
      const updatedDocs = await api.getDocuments(notebookId);
      setDocuments(prev => ({
        ...prev,
        [notebookId]: updatedDocs
      }));
      setNotebooks(prev => prev.map(nb =>
        nb.id === notebookId ? { ...nb, documentCount: updatedDocs.length } : nb
      ));
      return result;
    } catch (error) {
      console.error('Failed to upload document:', error);
      throw error;
    }
  };

  const removeDocument = (notebookId, documentId) => {
    // For now, just update local state since backend doesn't have delete document endpoint
    setDocuments(prev => ({
      ...prev,
      [notebookId]: prev[notebookId].filter(doc => doc._id !== documentId)
    }));
    setNotebooks(prev => prev.map(nb =>
      nb.id === notebookId ? { ...nb, documentCount: Math.max(0, nb.documentCount - 1) } : nb
    ));
  };

  const addMessage = (notebookId, message) => {
    setChatHistory(prev => ({
      ...prev,
      [notebookId]: [...(prev[notebookId] || []), message]
    }));
  };

  const clearChat = (notebookId) => {
    setChatHistory(prev => ({
      ...prev,
      [notebookId]: []
    }));
  };

  const toggleChatMode = () => {
    setChatMode(prev => !prev);
  };

  const value = {
    notebooks,
    activeNotebookId,
    activeNotebook: notebooks.find(nb => nb.id === activeNotebookId),
    documents: documents[activeNotebookId] || [],
    chatHistory: chatHistory[activeNotebookId] || [],
    chatMode,
    loading,
    createNotebook,
    selectNotebook,
    deleteNotebook,
    addDocument,
    removeDocument,
    addMessage,
    clearChat,
    toggleChatMode,
  };

  return (
    <NotebookContext.Provider value={value}>
      {children}
    </NotebookContext.Provider>
  );
};