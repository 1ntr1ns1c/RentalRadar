import axios from 'axios';
import type { AxiosResponse } from 'axios';

// ─── Base URL Strategy ────────────────────────────────────────────────────────
// Two modes controlled by .env.local:
//
//  Mode A — Next.js proxy (recommended for local dev, zero CORS issues):
//    NEXT_PUBLIC_USE_PROXY=true   → baseURL = '/api'
//    Requests go to Next.js itself, which rewrites them to Django (next.config.mjs)
//    The browser never makes a cross-origin request.
//
//  Mode B — Direct to Django (for production or when proxy is off):
//    NEXT_PUBLIC_USE_PROXY=false  → baseURL = NEXT_PUBLIC_API_URL
//    Django must have CORS_ALLOWED_ORIGINS set correctly.
//
const useProxy =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_USE_PROXY === 'true'
    : false; // SSR always uses direct URL

const baseURL = useProxy
  ? '/api'
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL,
  withCredentials: false,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  try {
    const stored = localStorage.getItem('rentalradar-user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (_) {}
  return config;
});

// ─── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use((response: AxiosResponse) => {
  const data = response.data;
  const isPaginated =
    data !== null &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    'results' in data &&
    Array.isArray(data.results);

  if (isPaginated) {
    (response as any).pagination = {
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
    response.data = data.results;
  }
  return response;
});

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => api.post('/auth/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
  token: string;
}) =>
  api.post(
    '/auth/change-password',
    { currentPassword: data.currentPassword, newPassword: data.newPassword },
    { headers: { Authorization: `Bearer ${data.token}` } }
  );

// ─── Properties ───────────────────────────────────────────────────────────────
export const getProperties = (params?: Record<string, any>) =>
  api.get('/properties/', { params });

export const getProperty = (id: number) =>
  api.get(`/properties/${id}/`);

export const createProperty = (data: any, token: string) =>
  api.post('/properties/', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProperty = (id: number, data: any, token: string) =>
  api.put(`/properties/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProperty = (id: number, token: string) =>
  api.delete(`/properties/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ─── Inquiries ────────────────────────────────────────────────────────────────
export const sendInquiry = (data: any, token?: string) =>
  api.post(
    '/inquiries/',
    data,
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );

export const getInquiries = (params: Record<string, any>, token: string) =>
  api.get('/inquiries/', {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

export const respondToInquiry = (inquiryId: number, data: any, token: string) =>
  api.post(`/inquiries/${inquiryId}/respond/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateInquiryStatus = (id: number, status: string, token: string) =>
  api.put(
    `/inquiries/${id}/status/`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export default api;
