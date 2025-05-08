import axios from 'axios';

// JSearch API configuration
const API_BASE_URL = 'https://jsearch.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'jsearch.p.rapidapi.com';

if (!RAPIDAPI_KEY) {
  console.warn('NEXT_PUBLIC_RAPIDAPI_KEY is not defined in environment variables');
}

// Axios instance for JSearch API
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY || '',
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  },
});

// Backend API configuration
const BACKEND_API_URL = 'http://localhost:5001/api';

// Axios instance for backend API
export const backendApi = axios.create({
  baseURL: BACKEND_API_URL,
});

// Add request interceptor to include auth token
backendApi.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance; 