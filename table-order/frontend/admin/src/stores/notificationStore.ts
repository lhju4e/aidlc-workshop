import { create } from 'zustand';

interface NotificationState {
  enabled: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
  hydrate: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  enabled: true,
  volume: 70,
  toggle: () =>
    set((s) => {
      const next = !s.enabled;
      localStorage.setItem('notificationEnabled', String(next));
      return { enabled: next };
    }),
  setVolume: (v) => {
    localStorage.setItem('notificationVolume', String(v));
    set({ volume: v });
  },
  hydrate: () => {
    const enabled = localStorage.getItem('notificationEnabled');
    const volume = localStorage.getItem('notificationVolume');
    set({
      enabled: enabled !== null ? enabled === 'true' : true,
      volume: volume !== null ? Number(volume) : 70,
    });
  },
}));
