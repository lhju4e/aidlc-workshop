'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTableStore } from '@/stores/tableStore';
import { tableService } from '@/services/tableService';
import type { Table } from '@/types';
import ConfirmModal from '@/components/common/ConfirmModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBanner from '@/components/common/ErrorBanner';

export default function TableManagementPage() {
  const { store, hydrate } = useAuthStore();
  const { tables, setTables } = useTableStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => { hydrate(); }, [hydrate]);

  const load = useCallback(async () => {
    if (!store) { setLoading(false); return; }
    try {
      setLoading(true);
      const { data } = await tableService.getTables(store.id);
      setTables(data);
    } catch { setError('테이블 목록을 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [store, setTables]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!tableNumber || !password || password.length < 8) {
      setFormError('테이블 번호와 비밀번호(8자 이상)를 입력해주세요.');
      return;
    }
    try {
      await tableService.setupTable({ storeId: store!.id, tableNumber: Number(tableNumber), password });
      setShowForm(false);
      setTableNumber('');
      setPassword('');
      load();
    } catch { setFormError('테이블 생성에 실패했습니다. 중복된 번호일 수 있습니다.'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div data-testid="table-management-page">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">테이블 관리</h1>
        <button data-testid="table-add-button" onClick={() => setShowForm(true)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          테이블 추가
        </button>
      </div>
      {error && <ErrorBanner message={error} onRetry={load} />}

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white border rounded-lg p-4 mb-4 max-w-sm" data-testid="table-create-form">
          {formError && <p className="text-red-600 text-sm mb-2">{formError}</p>}
          <input data-testid="table-form-number" type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} placeholder="테이블 번호" className="w-full border rounded px-3 py-2 mb-2 text-sm" />
          <input data-testid="table-form-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 (8자 이상)" className="w-full border rounded px-3 py-2 mb-3 text-sm" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">생성</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">취소</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tables.map((t) => (
          <div key={t.id} className="bg-white border rounded-lg p-4" data-testid={`table-item-${t.tableNumber}`}>
            <div className="font-bold text-lg mb-2">테이블 {t.tableNumber}</div>
            <div className="text-xs text-gray-500 break-all">
              <span className="select-all">{t.id}</span>
              <button onClick={() => { navigator.clipboard.writeText(t.id); }} className="ml-2 text-blue-600 hover:underline">복사</button>
            </div>
          </div>
        ))}
      </div>

      {tables.length === 0 && !loading && (
        <p className="text-center text-gray-400 mt-8">등록된 테이블이 없습니다.</p>
      )}
    </div>
  );
}
