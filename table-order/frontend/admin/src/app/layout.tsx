import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '테이블오더 관리',
  description: '테이블오더 관리자 및 주방 시스템',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
