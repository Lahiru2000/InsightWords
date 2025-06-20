import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add request interceptor to handle FormData correctly
api.interceptors.request.use(config => {
  // Don't set Content-Type when sending FormData
  // Axios will automatically set the correct multipart/form-data header with boundary
  if (config.data instanceof FormData) {
    Object.assign(config.headers, { 
      'Content-Type': 'multipart/form-data'
    });
  }
  return config;
});

export default api;
