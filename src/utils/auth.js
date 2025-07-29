import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rebel-radiance-backend.onrender.com/api/', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && !config.url.startsWith('auth/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;