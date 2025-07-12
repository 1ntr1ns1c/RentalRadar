import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api', //local host
  baseURL: import.meta.env.VITE_API_URL || 'https://rentalradar-production.up.railway.app/api',
  withCredentials: false, // Set to true if using cookies for auth
});

// --- Auth ---
export const register = (data: { name: string; email: string; password: string; role: string }) =>
  api.post('/auth/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const changePassword = (data: { currentPassword: string; newPassword: string; token: string }) =>
  api.post('/auth/change-password', {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  }, {
    headers: { Authorization: `Bearer ${data.token}` }
  });

// --- Properties ---
export const getProperties = (params?: any) =>
  api.get('/properties', { params });

export const getProperty = (id: number) =>
  api.get(`/properties/${id}`);

export const createProperty = (data: any, token: string) =>
  api.post('/properties', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateProperty = (id: number, data: any, token: string) =>
  api.put(`/properties/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteProperty = (id: number, token: string) =>
  api.delete(`/properties/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// --- Inquiries ---
export const sendInquiry = (data: any, token?: string) =>
  api.post('/inquiries', data, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);

export const getInquiries = (params: any, token: string) =>
  api.get('/inquiries', { params, headers: { Authorization: `Bearer ${token}` } });

export const respondToInquiry = (inquiryId: number, data: any, token: string) =>
  api.post(`/inquiries/${inquiryId}/respond`, data, { headers: { Authorization: `Bearer ${token}` } });

export const updateInquiryStatus = (id: number, status: string, token: string) =>
  api.put(`/inquiries/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });

export default api;

