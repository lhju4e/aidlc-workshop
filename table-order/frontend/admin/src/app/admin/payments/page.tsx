'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { usePaymentStore } from '@/stores/paymentStore';
import { useOrderStore } from '@/stores/orderStore';
import { paymentService } from '@/services/paymentService';
import { orderService } from '@/services/orderService';
import PaymentTable from '@/components/admin/PaymentTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBanner from '@/components/common/ErrorBanner';

export default function PaymentManagementPage() {
  const { store } = useAuthStore();
  const { payments, setPayments, updatePayment } = usePaymentStore();
  const { orders, setOrders } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!store) return;
    try {
      setLoading(true);
      const [pRes, oRes] = await Promise.all([
        paymentService.getPayments({ storeId: store.id }),
        orderService.getOrders({ storeId: store.id }),
      ]);
      setPayments(pRes.data);
      setOrders(oRes.data);
    } catch { setError('결제 정보를 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [store, setPayments, setOrders]);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await paymentService.updateStatus(orderId, status);
      updatePayment(orderId, { status: status as 'unpaid' | 'paid' | 'failed' });
    } catch { setError('결제 상태 변경에 실패했습니다.'); }
  };

  const enriched = payments.map((p) => ({ ...p, order: orders.find((o) => o.id === p.orderId) }));
  const totalUnpaid = enriched.filter((p) => p.status === 'unpaid').reduce((sum, p) => sum + (p.order?.totalAmount ?? 0), 0);

  if (loading) return <LoadingSpinner />;

  return (
    <div data-testid="payment-management-page">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">결제 관리</h1>
        <span className="text-sm text-red-600 font-medium">미결제 총액: {totalUnpaid.toLocaleString()}원</span>
      </div>
      {error && <ErrorBanner message={error} onRetry={load} />}
      <PaymentTable payments={enriched} onStatusChange={handleStatusChange} />
    </div>
  );
}
