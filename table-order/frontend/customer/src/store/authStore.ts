import { create } from 'zustand';
import type { Table, SetupCredentials } from '../types';
import { loginTable } from '../services/auth.service';
import { STORAGE_KEYS } from '../utils/constants';

interface AuthState {
  token: string | null;
  table: Table | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (creds: SetupCredentials) => Promise<void>;
  autoLogin: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(STORAGE_KEYS.TOKEN),
  table: JSON.parse(localStorage.getItem(STORAGE_KEYS.TABLE) || 'null'),
  sessionId: localStorage.getItem(STORAGE_KEYS.SESSION_ID),
  isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.TOKEN),
  isLoading: false,

  login: async (creds) => {
    const res = await loginTable(creds);
    const table = { ...res.table, storeId: res.table.storeId || creds.storeId || '' };
    localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(creds));
    localStorage.setItem(STORAGE_KEYS.TABLE, JSON.stringify(table));
    if (res.session?.id) localStorage.setItem(STORAGE_KEYS.SESSION_ID, res.session.id);
    set({ token: res.token, table, sessionId: res.session?.id ?? null, isAuthenticated: true });
  },

  autoLogin: async () => {
    const stored = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    if (!stored) return;
    set({ isLoading: true });
    try {
      const creds: SetupCredentials = JSON.parse(stored);
      const res = await loginTable(creds);
      const table = { ...res.table, storeId: res.table.storeId || creds.storeId || '' };
      localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
      localStorage.setItem(STORAGE_KEYS.TABLE, JSON.stringify(table));
      if (res.session?.id) localStorage.setItem(STORAGE_KEYS.SESSION_ID, res.session.id);
      set({ token: res.token, table, sessionId: res.session?.id ?? null, isAuthenticated: true });
    } catch {
      localStorage.removeItem(STORAGE_KEYS.CREDENTIALS);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.TABLE);
      localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
      set({ token: null, table: null, sessionId: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    set({ token: null, table: null, sessionId: null, isAuthenticated: false });
  },
}));
