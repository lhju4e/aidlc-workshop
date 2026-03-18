'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useOrderStore } from '@/stores/orderStore';
import { useTableStore } from '@/stores/tableStore';
import { orderService } from '@/services/orderService';
import { tableService } from '@/services/tableService';
import { useSSE } from '@/hooks/useSSE';
import { useNotificationSound } from '@/hooks/useNotificationSound';
import type { Order } from '@/types';
import KitchenOrderGrid from '@/components/kitchen/KitchenOrderGrid';
import NotificationToggle from '@/components/common/NotificationToggle';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBanner from '@/components/common/ErrorBanner';

export default function KitchenDisplayPage() {
  const { store } = useAuthStore();
  const { orders, setOrders, addOrder, updateOrder, removeOrder } = useOrderStore();
  const { tables, setTables } = useTableStore();
  const { play } = useNotificationSound();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!store) return;
    try {
      setLoading(true);
      const [oRes, tRes] = await Promise.all([
        orderService.getOrders({ storeId: store.id, status: 'pending,preparing' }),
        tableService.getTables(store.id),
      ]);
      setOrders(oRes.data);
      setTables(tRes.data);
    } catch { setError('주문을 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [store, setOrders, setTables]);

  useEffect(() => { load(); }, [load]);

  useSSE(
    store ? `${process.env.NEXT_PUBLIC_API_URL}/sse/orders?storeId=${store.id}` : '',
    {
      newOrder: (data) => { addOrder(data as Order); play(); },
      orderStatusChange: (data) => {
        const d = data as { orderId: string; status: string };
        if (d.status === 'completed') removeOrder(d.orderId);
        else updateOrder(d.orderId, { status: d.status as Order['status'] });
      },
      orderDeleted: (data) => { removeOrder((data as { orderId: string }).orderId); },
    }
  );

  const activeOrders = orders.filter((o) => o.status !== 'completed');

  const handleStart = async (orderId: string) => {
    try { await orderService.updateStatus(orderId, 'preparing'); updateOrder(orderId, { status: 'preparing' }); }
    catch { setError('상태 변경에 실패했습니다.'); }
  };

  const handleComplete = async (orderId: string) => {
    try { await orderService.updateStatus(orderId, 'completed'); removeOrder(orderId); }
    catch { setError('상태 변경에 실패했습니다.'); }
  };

  if (loading) return <div className="p-8"><LoadingSpinner /></div>;

  return (
    <div className="p-4" data-testid="kitchen-display-page">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">주방 디스플레이</h1>
        <NotificationToggle />
      </div>
      {error && <ErrorBanner message={error} onRetry={load} />}
      <KitchenOrderGrid orders={activeOrders} tables={tables} onStartCooking={handleStart} onCompleteCooking={handleComplete} />
    </div>
  );
}
