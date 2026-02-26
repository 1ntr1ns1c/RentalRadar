import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import * as api from '../lib/api';

function getAuthErrorMessage(err: any, fallback: string): string {
  const data = err?.response?.data;
  if (!data) return fallback;
  if (typeof data.message === 'string') return data.message;
  if (typeof data.detail === 'string') return data.detail;
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    const first = Object.values(data).flat().find((v) => typeof v === 'string' || (Array.isArray(v) && v[0]));
    if (Array.isArray(first)) return first[0] ?? fallback;
    if (typeof first === 'string') return first;
  }
  return fallback;
}

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
      return { success: false, error: getAuthErrorMessage(err, 'Login failed') };
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
      return { success: false, error: getAuthErrorMessage(err, 'Registration failed') };
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
