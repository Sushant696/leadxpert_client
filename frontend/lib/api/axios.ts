import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL || "http://localhost:5500/v1",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
  validateStatus: function(status) {
    // for manual error handling in actions  
    return status >= 200 && status < 600; // Accept all status codes
  },
})

// For development logging
if (process.env.NEXT_ENV === 'development') {
  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(`✅ Response: ${response.config.url} - ${response.status}`);
      return response;
    },
    (error) => {
      console.log(`❌ Error: ${error.config?.url} - ${error.response?.status}`);
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
