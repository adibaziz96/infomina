import axios from 'axios';
import router from '../router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('token')

      if (router.currentRoute.value.path !== '/login') {
        router.replace('/login')
      }
    }

    return Promise.reject(error)
  }
)

export default api;
