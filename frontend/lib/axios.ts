import axios from 'axios'

import { apiURLs } from '@/utils/apiUrls'
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const axiosInstance = axios.create(
  {
    baseURL: BASE_URL || "http://localhost:5500/v1",
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  }
)

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // only handle 401 errors 
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url === apiURLs.AUTH.refresh) {
      // Refresh failed - logout user
      if (typeof window !== "undefined") {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login?session=expired';
      }
      return Promise.reject(error);
    }

    // If already tried once, logout
    if (originalRequest._retry) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login?session=expired';
      }
      return Promise.reject(error);
    }

    // If already refreshing, just reject
    if (isRefreshing) {
      return Promise.reject(error);
    }

    // Try to refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await axiosInstance.post(apiURLs.AUTH.refresh);
      isRefreshing = false;

      // Retry original request
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;

      // Refresh failed - logout
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login?session=expired';
      }

      return Promise.reject(refreshError);
    }
  },
)

export default axiosInstance
