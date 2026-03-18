import api from './api';
import type { Store } from '@/types';

export const authService = {
  register: (data: { storeName: string; username: string; password: string }) =>
    api.post<{ store: Store; token: string }>('/auth/register', data),

  login: (data: { storeName: string; username: string; password: string }) =>
    api.post<{ store?: Store; storeId?: string; token: string }>('/auth/admin/login', data),
};
