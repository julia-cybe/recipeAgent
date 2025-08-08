import axios from 'axios';
import { refreshToken } from './authService';

const api = axios.create();

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh');
      if (refresh) {
        try {
          const data = await refreshToken(refresh);
          localStorage.setItem('access', data.access);
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (e) {
          // Optionally redirect to login
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;