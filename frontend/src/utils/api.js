// src/utils/api.js
// Centralised axios instance – all backend calls go through here

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor – attach JWT if present ───────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adh_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor – handle 401 globally ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid – clear auth and redirect
      localStorage.removeItem('adh_token');
      localStorage.removeItem('adh_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login',    data),
  getMe:    ()     => api.get('/auth/me'),
};

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS & CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
export const productAPI = {
  getCategories:          ()     => api.get('/categories'),
  getSubcategories:       (catId)=> api.get(`/subcategories/${catId}`),

  // params: { search, category, subcategory, isNew, sort }
  getProducts:            (params) => api.get('/products', { params }),
  getProductById:         (id)     => api.get(`/products/${id}`),
  getByCategory:          (catId)  => api.get(`/products/category/${catId}`),
  getBySubcategory:       (subId)  => api.get(`/products/subcategory/${subId}`),
};

// ─────────────────────────────────────────────────────────────────────────────
// CART  (requires auth token)
// ─────────────────────────────────────────────────────────────────────────────
export const cartAPI = {
  getCart:    ()           => api.get('/cart'),
  addToCart:  (product_id, quantity = 1) => api.post('/cart/add', { product_id, quantity }),
  updateCart: (cartItemId, quantity)     => api.put(`/cart/update/${cartItemId}`, { quantity }),
  removeItem: (cartItemId)               => api.delete(`/cart/remove/${cartItemId}`),
  clearCart:  ()                         => api.delete('/cart/clear'),
};

// ─────────────────────────────────────────────────────────────────────────────
// ORDERS  (requires auth token)
// ─────────────────────────────────────────────────────────────────────────────
export const orderAPI = {
  placeOrder:  (data)  => api.post('/orders', data),
  getMyOrders: ()      => api.get('/orders/my-orders'),
  getOrder:    (id)    => api.get(`/orders/${id}`),
};

export default api;
