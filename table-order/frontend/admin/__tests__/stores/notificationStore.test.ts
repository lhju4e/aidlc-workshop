import { useNotificationStore } from '@/stores/notificationStore';

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

describe('notificationStore', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    useNotificationStore.setState({ enabled: true, volume: 70 });
  });

  it('toggle should flip enabled', () => {
    useNotificationStore.getState().toggle();
    expect(useNotificationStore.getState().enabled).toBe(false);
    useNotificationStore.getState().toggle();
    expect(useNotificationStore.getState().enabled).toBe(true);
  });

  it('setVolume should update volume', () => {
    useNotificationStore.getState().setVolume(50);
    expect(useNotificationStore.getState().volume).toBe(50);
    expect(mockLocalStorage.getItem('notificationVolume')).toBe('50');
  });
});
