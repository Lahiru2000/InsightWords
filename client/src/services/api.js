import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Add request interceptor to handle authentication and FormData
api.interceptors.request.use(config => {
  // Add authorization token to all requests
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Don't set Content-Type when sending FormData
  // Axios will automatically set the correct multipart/form-data header with boundary
  if (config.data instanceof FormData) {
    Object.assign(config.headers, { 
      'Content-Type': 'multipart/form-data'
    });
  }
  
  return config;
});

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication methods
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
};

// Token management
export const tokenManager = {
  setToken: (token) => localStorage.setItem('token', token),
  getToken,
  removeToken: () => localStorage.removeItem('token'),
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default api;
