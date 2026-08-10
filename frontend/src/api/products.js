import apiClient from './axios';

export const fetchProducts = (params = {}) => apiClient.get('/products', { params }).then((res) => res.data);

export const fetchProductBySlug = (slug) => apiClient.get(`/products/slug/${slug}`).then((res) => res.data);

export const fetchProductById = (id) => apiClient.get(`/products/${id}`).then((res) => res.data);

export const createProduct = (formData) =>
  apiClient
    .post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data);

export const updateProduct = (id, formData) =>
  apiClient
    .put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data);

export const deleteProduct = (id) => apiClient.delete(`/products/${id}`).then((res) => res.data);
