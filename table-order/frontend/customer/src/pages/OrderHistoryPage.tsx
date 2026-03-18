import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { getOrders } from '../services/order.service';
import { useSSE } from '../hooks/useSSE';
import { useToast } from '../hooks/useToast';
import type { Order, OrderSSEEvent } from '../types';
import { getStatusLabel } from '../utils/format';
import OrderCard from '../components/order/OrderCard';
import Toast from '../components/common/Toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function OrderHistoryPage() {
  const { table, sessionId } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, show, remove } = useToast();

  useEffect(() => {
    if (!table) return;
    getOrders({ storeId: table.storeId, tableId: table.id, sessionId: sessionId ?? undefined })
      .then((data) => setOrders(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())))
      .catch(() => show('주문 내역을 불러올 수 없습니다', 'error'))
      .finally(() => setIsLoading(false));
  }, [table, sessionId]);

  const handleSSE = useCallback((event: OrderSSEEvent) => {
    if (event.type === 'order_status_changed' && event.status) {
      setOrders((prev) => prev.map((o) => (o.id === event.orderId ? { ...o, status: event.status! } : o)));
      show(`주문 상태가 ${getStatusLabel(event.status)}(으)로 변경되었습니다`, 'info');
    } else if (event.type === 'order_created' && event.order) {
      setOrders((prev) => [event.order!, ...prev]);
    } else if (event.type === 'order_deleted') {
      setOrders((prev) => prev.filter((o) => o.id !== event.orderId));
    }
  }, [show]);

  useSSE(table ? { storeId: table.storeId, tableId: table.id } : null, handleSSE);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-4 space-y-4" data-testid="order-history-page">
      <h1 className="text-xl font-bold">주문 내역</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">주문 내역이 없습니다</p>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}

      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => remove(t.id)} />
        ))}
      </div>
    </div>
  );
}
