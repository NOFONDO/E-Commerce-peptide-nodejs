import apiClient from './axios';

export const fetchDashboardStats = () => apiClient.get('/dashboard/stats').then((res) => res.data);
