'use client';

import { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { useAuthStore } from '@/stores/authStore';
import { useTableStore } from '@/stores/tableStore';
import { orderService } from '@/services/orderService';
import { tableService } from '@/services/tableService';
import type { Order, OrderHistoryFilter } from '@/types';
import HistoryFilter from '@/components/admin/HistoryFilter';
import HistoryTable from '@/components/admin/HistoryTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBanner from '@/components/common/ErrorBanner';

export default function OrderHistoryPage() {
  const { store, hydrate } = useAuthStore();
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

  useEffect(() => { hydrate(); }, [hydrate]);

  useEffect(() => {
    if (!store) return;
    tableService.getTables(store.id).then((r) => setTables(r.data)).catch(() => {});
  }, [store, setTables]);

  const load = useCallback(async () => {
    if (!store) { setLoading(false); return; }
    try {
      setLoading(true);
      const { data: allOrders } = await orderService.getOrders({ storeId: store.id });
      let filtered = allOrders;
      if (filter.tableId) filtered = filtered.filter((o) => o.tableId === filter.tableId);
      if (filter.status.length < 3) filtered = filtered.filter((o) => filter.status.includes(o.status));
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setHistory(filtered);
    } catch { setError('주문 내역을 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [store, filter]);

  useEffect(() => { load(); }, [load]);

  return (
    <div data-testid="order-history-page">
      <h1 className="text-xl font-bold mb-4">주문 내역</h1>
      {error && <ErrorBanner message={error} onRetry={load} />}
      <HistoryFilter filter={filter} tables={tables} onChange={setFilter} />
      {loading ? <LoadingSpinner /> : <HistoryTable orders={history} />}
    </div>
  );
}
