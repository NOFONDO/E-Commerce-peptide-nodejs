import apiClient from './axios';

export const fetchCategories = () => apiClient.get('/categories').then((res) => res.data);

export const fetchCategoryBySlug = (slug) => apiClient.get(`/categories/${slug}`).then((res) => res.data);

export const createCategory = (payload) => apiClient.post('/categories', payload).then((res) => res.data);

export const updateCategory = (id, payload) => apiClient.put(`/categories/${id}`, payload).then((res) => res.data);

export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`).then((res) => res.data);
