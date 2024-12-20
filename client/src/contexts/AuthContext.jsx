// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, login, logout, register, loading } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
