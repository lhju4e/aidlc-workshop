import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      const stored = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
      if (stored) {
        try {
          const creds = JSON.parse(stored);
          const { data } = await axios.post(`${API_BASE_URL}/auth/table/login`, creds);
          localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
          error.config.headers.Authorization = `Bearer ${data.token}`;
          return axios(error.config);
        } catch {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
