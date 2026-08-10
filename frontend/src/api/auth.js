import apiClient from './axios';

export const loginAdmin = (payload) => apiClient.post('/auth/login', payload).then((res) => res.data);

export const logoutAdmin = () => apiClient.post('/auth/logout').then((res) => res.data);

export const fetchCurrentAdmin = () => apiClient.get('/auth/me').then((res) => res.data);
