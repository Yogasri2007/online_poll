import { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../services/storage.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(storage.getCurrentUser());
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const existing = storage.findUser(email, password);
    if (existing) {
      storage.setCurrentUser(existing.id);
      setUser(existing);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials.' };
  };

  const register = (name, email, password) => {
    const existing = storage.findUserByEmail(email);
    if (existing) {
      return { success: false, message: 'Email already in use.' };
    }
    const newUser = storage.createUser({ name, email, password });
    storage.setCurrentUser(newUser.id);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    storage.clearCurrentUser();
    setUser(null);
  };

  const refreshUser = () => setUser(storage.getCurrentUser());

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
