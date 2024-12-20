// src/services/authService.js
import api from './api';

// Register user
export const register = async (email, password) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};

// Login user
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Logout user (if needed on server-side)
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};
