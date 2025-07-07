// apiService.js
import axios from 'axios';
import { BASE_URL } from '../constants';

// Create Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
});

// Request Interceptor: Attach token and handle headers
apiClient.interceptors.request.use(
  async config => {
    const token = await getAuthToken(); // Replace this with actual token retrieval logic

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Dynamically set Content-Type
    if (
      config.data instanceof FormData &&
      config.headers['Content-Type'] !== 'application/json'
    ) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Unified API Service Methods
const apiService = {
  get: (url, config = {}) => apiClient.get(url, config),

  post: (url, data, config = {}) => {
    return apiClient.post(url, data, config);
  },

  put: (url, data, config = {}) => {
    return apiClient.put(url, data, config);
  },

  patch: (url, data, config = {}) => {
    return apiClient.patch(url, data, config);
  },

  delete: (url, config = {}) => {
    return apiClient.delete(url, config);
  },
};

export default apiService;

// Dummy token getter
async function getAuthToken() {
  return localStorage.getItem('authToken'); // For React Native, use AsyncStorage instead
}
