'use client';

import { useNotificationStore } from '@/stores/notificationStore';

export default function NotificationToggle() {
  const { enabled, volume, toggle, setVolume } = useNotificationStore();

  return (
    <div className="flex items-center gap-3">
      <button data-testid="notification-toggle" onClick={toggle} className="text-sm px-3 py-1 rounded border" aria-label={enabled ? '알림음 끄기' : '알림음 켜기'}>
        {enabled ? '🔔 ON' : '🔕 OFF'}
      </button>
      {enabled && (
        <input
          data-testid="notification-volume"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24"
          aria-label="알림음 볼륨"
        />
      )}
    </div>
  );
}
