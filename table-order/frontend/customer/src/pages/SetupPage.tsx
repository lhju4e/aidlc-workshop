import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

export default function SetupPage() {
  const login = useAuthStore((s) => s.login);
  const [storeName, setStoreName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !tableNumber || !password) { setError('모든 항목을 입력해주세요'); return; }
    setIsSubmitting(true);
    setError('');
    try {
      await login({ storeName, tableNumber: Number(tableNumber), password });
    } catch {
      setError('로그인에 실패했습니다. 정보를 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4" data-testid="setup-form">
        <h1 className="text-2xl font-bold text-center">테이블 설정</h1>
        <p className="text-gray-500 text-sm text-center">관리자가 초기 설정을 진행합니다</p>
        {error && <p className="text-red-500 text-sm text-center" data-testid="setup-error">{error}</p>}
        <input data-testid="setup-store-name" type="text" placeholder="매장명" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full px-4 py-3 border rounded-xl" />
        <input data-testid="setup-table-number" type="number" placeholder="테이블 번호" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="w-full px-4 py-3 border rounded-xl" />
        <input data-testid="setup-password" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-xl" />
        <button data-testid="setup-submit" type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium disabled:bg-gray-300">
          {isSubmitting ? '설정 중...' : '설정 완료'}
        </button>
      </form>
    </div>
  );
}
