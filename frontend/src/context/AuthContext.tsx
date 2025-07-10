import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import * as api from '../lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('rentalradar-user') || 'null')
  );

  const login = async (email: string, password: string) => {
    try {
      const res = await api.login({ email, password });
      const userData = res.data;
      localStorage.setItem('rentalradar-user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const res = await api.register({ name, email, password, role });
      const userData = res.data;
      localStorage.setItem('rentalradar-user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('rentalradar-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
