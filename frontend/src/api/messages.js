import apiClient from './axios';

export const sendMessage = (payload) => apiClient.post('/messages', payload).then((res) => res.data);

export const fetchMessages = (params = {}) => apiClient.get('/messages', { params }).then((res) => res.data);

export const fetchMessageById = (id) => apiClient.get(`/messages/${id}`).then((res) => res.data);

export const markMessageReplied = (id) => apiClient.patch(`/messages/${id}/replied`).then((res) => res.data);

export const deleteMessage = (id) => apiClient.delete(`/messages/${id}`).then((res) => res.data);
