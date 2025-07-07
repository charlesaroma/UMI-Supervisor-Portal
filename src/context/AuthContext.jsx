import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('umi_auth_token');
    const role = localStorage.getItem('role');
    
    if (token && role === 'SUPERVISOR') {
      setUser({ token, role });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('umi_auth_token', userData.token);
    localStorage.setItem('role', userData.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('umi_auth_token');
    localStorage.removeItem('role');
    localStorage.removeItem('umi_auth_state');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 