import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://rebel-radiance-backend.onrender.com';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;