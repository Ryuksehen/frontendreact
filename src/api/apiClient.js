import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://tallerfinalreact.onrender.com/',
});

// Interceptor para inyectar el token en cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
