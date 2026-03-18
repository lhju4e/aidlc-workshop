'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import NotificationToggle from '@/components/common/NotificationToggle';

const navItems = [
  { href: '/admin/dashboard', label: '대시보드' },
  { href: '/admin/menus', label: '메뉴 관리' },
  { href: '/admin/payments', label: '결제 관리' },
  { href: '/admin/history', label: '주문 내역' },
  { href: '/kitchen', label: '주방' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { store, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between flex-wrap gap-2" data-testid="admin-navbar">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="font-bold text-lg">{store?.name ?? '테이블오더'}</span>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm px-2 py-1 rounded ${pathname === item.href ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <NotificationToggle />
        <button data-testid="logout-button" onClick={logout} className="text-sm text-red-600 hover:underline">
          로그아웃
        </button>
      </div>
    </nav>
  );
}
