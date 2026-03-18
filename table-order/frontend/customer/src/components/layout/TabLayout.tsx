import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/', label: '메뉴', icon: '🍽️' },
  { path: '/history', label: '주문내역', icon: '📋' },
];

export default function TabLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">{children}</div>
      <nav className="flex border-t bg-white shrink-0" data-testid="tab-layout-nav">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            data-testid={`tab-${tab.label}`}
            onClick={() => navigate(tab.path)}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              pathname === tab.path ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            <span className="block text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
