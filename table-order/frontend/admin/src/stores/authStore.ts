import { create } from 'zustand';
import type { Store } from '@/types';

interface AuthState {
  token: string | null;
  store: Store | null;
  isAuthenticated: boolean;
  setAuth: (token: string, store: Store) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  store: null,
  isAuthenticated: false,
  setAuth: (token, store) => {
    localStorage.setItem('token', token);
    localStorage.setItem('store', JSON.stringify(store));
    set({ token, store, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('store');
    set({ token: null, store: null, isAuthenticated: false });
  },
  hydrate: () => {
    const token = localStorage.getItem('token');
    const storeData = localStorage.getItem('store');
    if (token && storeData && storeData !== 'undefined') {
      try {
        set({ token, store: JSON.parse(storeData), isAuthenticated: true });
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('store');
      }
    }
  },
}));
