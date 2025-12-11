const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const getDefaultOptions = () => ({
  credentials: 'include', // Include cookies for authentication
});

export const api = {
  async getNotebooks() {
    const response = await fetch(`${API_BASE_URL}/api/notebooks`, getDefaultOptions());
    if (!response.ok) {
      throw new Error('Failed to fetch notebooks');
    }
    return response.json();
  },

  async createNotebook(name, description = '') {
    const response = await fetch(`${API_BASE_URL}/api/notebooks`, {
      ...getDefaultOptions(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error('Failed to create notebook');
    }

    return response.json();
  },

  async getNotebook(id) {
    const response = await fetch(`${API_BASE_URL}/api/notebooks/${id}`, getDefaultOptions());
    if (!response.ok) {
      throw new Error('Failed to fetch notebook');
    }
    return response.json();
  },

  async deleteNotebook(id) {
    const response = await fetch(`${API_BASE_URL}/api/notebooks/${id}`, {
      ...getDefaultOptions(),
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete notebook');
    }

    return response.json();
  },

  async getDocuments(notebookId) {
    const response = await fetch(`${API_BASE_URL}/api/documents/${notebookId}`, getDefaultOptions());
    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }
    return response.json();
  },

  async uploadDocument(file, notebookId) {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch(`${API_BASE_URL}/api/documents/${notebookId}/upload`, {
      ...getDefaultOptions(),
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },

  async queryDocuments(query, notebookId) {
    const response = await fetch(`${API_BASE_URL}/api/documents/${notebookId}/query`, {
      ...getDefaultOptions(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Query failed');
    }

    return response.json();
  },

  async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  },
};