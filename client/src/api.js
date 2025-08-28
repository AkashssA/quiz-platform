import axios from 'axios';

const api = axios.create({
  baseURL: (process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000') + '/api',
});

// Attach Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response handler for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      // Best-effort redirect to login if available
      if (typeof window !== 'undefined') {
        if (window.location.pathname !== '/admin-login') {
          window.location.href = '/admin-login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;


