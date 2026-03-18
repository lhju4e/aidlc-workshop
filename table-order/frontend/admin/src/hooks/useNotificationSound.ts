'use client';

import { useRef, useCallback } from 'react';
import { useNotificationStore } from '@/stores/notificationStore';

export function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { enabled, volume } = useNotificationStore();

  const play = useCallback(() => {
    if (!enabled) return;
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/notification.mp3');
    }
    audioRef.current.volume = volume / 100;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [enabled, volume]);

  return { play };
}
