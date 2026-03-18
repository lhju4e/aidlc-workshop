'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import Navbar from '@/components/admin/Navbar';

const publicPaths = ['/admin/login', '/admin/register'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hydrate } = useAuthStore();
  const { hydrate: hydrateNotification } = useNotificationStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    hydrate();
    hydrateNotification();
  }, [hydrate, hydrateNotification]);

  const isPublic = publicPaths.includes(pathname);

  useEffect(() => {
    if (!isPublic && !isAuthenticated && !localStorage.getItem('token')) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, router, isPublic]);

  if (isPublic) return <>{children}</>;

  if (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('token')) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
