import { useAuthStore } from '@/stores/authStore';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('authStore', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    useAuthStore.setState({ token: null, store: null, isAuthenticated: false });
  });

  it('setAuth should set token and store', () => {
    const store = { id: '1', name: 'Test Store', createdAt: '' };
    useAuthStore.getState().setAuth('test-token', store);

    expect(useAuthStore.getState().token).toBe('test-token');
    expect(useAuthStore.getState().store).toEqual(store);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(mockLocalStorage.getItem('token')).toBe('test-token');
  });

  it('logout should clear state and localStorage', () => {
    useAuthStore.getState().setAuth('token', { id: '1', name: 'Test', createdAt: '' });
    useAuthStore.getState().logout();

    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(mockLocalStorage.getItem('token')).toBeNull();
  });

  it('hydrate should restore from localStorage', () => {
    mockLocalStorage.setItem('token', 'saved-token');
    mockLocalStorage.setItem('store', JSON.stringify({ id: '1', name: 'Saved', createdAt: '' }));
    useAuthStore.getState().hydrate();

    expect(useAuthStore.getState().token).toBe('saved-token');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });
});
