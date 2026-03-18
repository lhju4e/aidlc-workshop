'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';

export default function RegisterPage() {
  const [storeName, setStoreName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError('비밀번호는 최소 8자 이상이어야 합니다.'); return; }
    setError(null);
    setIsLoading(true);
    try {
      const { data } = await authService.register({ storeName, username, password });
      setAuth(data.token, data.store);
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? '등록에 실패했습니다.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" data-testid="register-form">
        <h1 className="text-xl font-bold mb-4">매장 등록</h1>
        {error && <p className="text-red-600 text-sm mb-3" data-testid="register-error">{error}</p>}
        <input data-testid="register-store-name" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="매장명" required className="w-full border rounded px-3 py-2 mb-3 text-sm" />
        <input data-testid="register-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="사용자명" required className="w-full border rounded px-3 py-2 mb-3 text-sm" />
        <input data-testid="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 (8자 이상)" required className="w-full border rounded px-3 py-2 mb-4 text-sm" />
        <button data-testid="register-submit" type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 text-sm">
          {isLoading ? '등록 중...' : '매장 등록'}
        </button>
        <p className="mt-3 text-center text-sm text-gray-500">
          이미 매장이 있으신가요? <Link href="/admin/login" className="text-blue-600 hover:underline">로그인</Link>
        </p>
      </form>
    </div>
  );
}
