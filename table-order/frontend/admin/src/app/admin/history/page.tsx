'use client';

import { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { useAuthStore } from '@/stores/authStore';
import { useTableStore } from '@/stores/tableStore';
import { tableService } from '@/services/tableService';
import type { Order, OrderHistoryFilter } from '@/types';
import HistoryFilter from '@/components/admin/HistoryFilter';
import HistoryTable from '@/components/admin/HistoryTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBanner from '@/components/common/ErrorBanner';

export default function OrderHistoryPage() {
  const { store } = useAuthStore();
  const { tables, setTables } = useTableStore();
  const [history, setHistory] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderHistoryFilter>({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    tableId: null,
    status: ['pending', 'preparing', 'completed'],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!store) return;
    tableService.getTables(store.id).then((r) => setTables(r.data)).catch(() => {});
  }, [store, setTables]);

  const load = useCallback(async () => {
    if (!store) return;
    try {
      setLoading(true);
      const targetTables = filter.tableId ? [filter.tableId] : tables.map((t) => t.id);
      const results = await Promise.all(
        targetTables.map((tid) => tableService.getHistory(tid, { startDate: filter.startDate, endDate: filter.endDate }))
      );
      const all = results.flatMap((r) => r.data);
      const filtered = filter.status.length < 3 ? all.filter((o) => filter.status.includes(o.status)) : all;
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setHistory(filtered);
    } catch { setError('주문 내역을 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [store, tables, filter]);

  useEffect(() => { if (tables.length > 0) load(); }, [load, tables.length]);

  return (
    <div data-testid="order-history-page">
      <h1 className="text-xl font-bold mb-4">과거 주문 내역</h1>
      {error && <ErrorBanner message={error} onRetry={load} />}
      <HistoryFilter filter={filter} tables={tables} onChange={setFilter} />
      {loading ? <LoadingSpinner /> : <HistoryTable orders={history} />}
    </div>
  );
}
