import axios from 'axios';
import type { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: false,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attach access token from localStorage to every request when present
api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('rentalradar-user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (_) {
    // ignore invalid JSON
  }
  return config;
});

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Django REST Framework returns paginated list responses in the shape:
//   { count: number, next: string | null, previous: string | null, results: T[] }
// This interceptor normalises every list response so callers always receive
// a plain array in `response.data`, with pagination metadata available
// separately in `response.pagination` (if you ever need it).
api.interceptors.response.use((response: AxiosResponse) => {
  const data = response.data;

  const isPaginated =
    data !== null &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    'results' in data &&
    Array.isArray(data.results);

  if (isPaginated) {
    // Preserve pagination metadata on the response object for callers that
    // need it (e.g. implementing Load More / page controls).
    (response as any).pagination = {
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
    // Replace response.data with the plain array so all existing callers
    // (response.data.filter, response.data.map, etc.) work without changes.
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

export const respondToInquiry = (
  inquiryId: number,
  data: any,
  token: string
) =>
  api.post(`/inquiries/${inquiryId}/respond/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateInquiryStatus = (
  id: number,
  status: string,
  token: string
) =>
  api.put(
    `/inquiries/${id}/status/`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export default api;
