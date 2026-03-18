'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const [storeName, setStoreName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { data } = await authService.login({ storeName, username, password });
      setAuth(data.token, data.store ?? { id: data.storeId ?? '', name: storeName, createdAt: '' });
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? '로그인에 실패했습니다.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" data-testid="login-form">
        <h1 className="text-xl font-bold mb-4">관리자 로그인</h1>
        {error && <p className="text-red-600 text-sm mb-3" data-testid="login-error">{error}</p>}
        <input data-testid="login-store-name" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="매장명" required className="w-full border rounded px-3 py-2 mb-3 text-sm" />
        <input data-testid="login-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="사용자명" required className="w-full border rounded px-3 py-2 mb-3 text-sm" />
        <input data-testid="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required className="w-full border rounded px-3 py-2 mb-4 text-sm" />
        <button data-testid="login-submit" type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 text-sm">
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
        <p className="mt-3 text-center text-sm text-gray-500">
          매장이 없으신가요? <Link href="/admin/register" className="text-blue-600 hover:underline">매장 등록</Link>
        </p>
      </form>
    </div>
  );
}
