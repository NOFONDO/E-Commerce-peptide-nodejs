import apiClient from './axios';

export const fetchSettings = () => apiClient.get('/settings').then((res) => res.data);

export const updateSettings = (payload) => apiClient.put('/settings', payload).then((res) => res.data);
