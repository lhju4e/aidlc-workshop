'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useOrderStore } from '@/stores/orderStore';
import { useTableStore } from '@/stores/tableStore';
import { orderService } from '@/services/orderService';
import { tableService } from '@/services/tableService';
import { useSSE } from '@/hooks/useSSE';
import { useNotificationSound } from '@/hooks/useNotificationSound';
import type { TableCardData, Order } from '@/types';
import TableCardGrid from '@/components/admin/TableCardGrid';
import TableDetailModal from '@/components/admin/TableDetailModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBanner from '@/components/common/ErrorBanner';

export default function DashboardPage() {
  const { store } = useAuthStore();
  const { orders, setOrders, addOrder, updateOrder, removeOrder } = useOrderStore();
  const { tables, setTables } = useTableStore();
  const { play } = useNotificationSound();
  const [selected, setSelected] = useState<TableCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!store) { setLoading(false); return; }
    try {
      setLoading(true);
      const [tRes, oRes] = await Promise.all([
        tableService.getTables(store.id),
        orderService.getOrders({ storeId: store.id }),
      ]);
      setTables(tRes.data);
      setOrders(oRes.data);
    } catch { setError('데이터를 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [store, setTables, setOrders]);

  useEffect(() => { load(); }, [load]);

  useSSE(
    store ? `${process.env.NEXT_PUBLIC_API_URL}/sse/orders?storeId=${store.id}` : '',
    {
      newOrder: (data) => { addOrder(data as Order); play(); },
      orderStatusChange: (data) => { const d = data as { orderId: string; status: string }; updateOrder(d.orderId, { status: d.status as Order['status'] }); },
      orderDeleted: (data) => { removeOrder((data as { orderId: string }).orderId); },
      tableCompleted: () => { load(); },
    }
  );

  const tableCards: TableCardData[] = useMemo(() =>
    tables.map((t) => {
      const tOrders = orders.filter((o) => o.tableId === t.id);
      return {
        table: t,
        orders: tOrders,
        totalAmount: tOrders.reduce((sum, o) => sum + o.totalAmount, 0),
        pendingCount: tOrders.filter((o) => o.status === 'pending').length,
        hasActiveSession: tOrders.length > 0,
      };
    }), [tables, orders]);

  const handleStatusChange = async (orderId: string, status: string) => {
    try { await orderService.updateStatus(orderId, status); updateOrder(orderId, { status: status as Order['status'] }); }
    catch { setError('상태 변경에 실패했습니다.'); }
  };

  const handleDelete = async (orderId: string) => {
    try { await orderService.deleteOrder(orderId); removeOrder(orderId); }
    catch { setError('삭제에 실패했습니다.'); }
  };

  const handleComplete = async (tableId: string) => {
    try { await tableService.completeTable(tableId); load(); setSelected(null); }
    catch { setError('이용 완료 처리에 실패했습니다.'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div data-testid="dashboard-page">
      <h1 className="text-xl font-bold mb-4">주문 대시보드</h1>
      {error && <ErrorBanner message={error} onRetry={load} />}
      <TableCardGrid tables={tableCards} onSelect={setSelected} />
      <TableDetailModal
        data={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onStatusChange={handleStatusChange}
        onDeleteOrder={handleDelete}
        onCompleteTable={handleComplete}
      />
    </div>
  );
}
