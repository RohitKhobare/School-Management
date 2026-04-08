import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('mms-user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('mms-token') || null;
    } catch (e) {
      return null;
    }
  });

  const login = (authData, navigate) => {
    // authData format from backend response:
    // { token: string, user: { id, name, email, role, linkedStudent? } }
    const userData = authData.user || authData;
    const tokenData = authData.token;
    
    const u = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      linkedStudent: userData.linkedStudent || null,
    };
    
    setUser(u);
    if (tokenData) {
      setToken(tokenData);
      try { localStorage.setItem('mms-token', tokenData); } catch (e) {/* ignore */}
    }
    try { localStorage.setItem('mms-user', JSON.stringify(u)); } catch (e) {/* ignore */}
    
    // Navigate to dashboard
    if (navigate) {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try { localStorage.removeItem('mms-user'); } catch (e) {/* ignore */}
    try { localStorage.removeItem('mms-token'); } catch (e) {/* ignore */}
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
