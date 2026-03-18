'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hydrate } = useAuthStore();
  const { hydrate: hydrateNotification } = useNotificationStore();
  const router = useRouter();

  useEffect(() => { hydrate(); hydrateNotification(); }, [hydrate, hydrateNotification]);

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem('token')) router.replace('/admin/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('token')) return null;

  return <div className="min-h-screen bg-gray-900 text-white">{children}</div>;
}
