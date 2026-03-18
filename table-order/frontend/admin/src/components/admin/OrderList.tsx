'use client';

import type { Order } from '@/types';
import OrderCard from './OrderCard';

interface Props {
  orders: Order[];
  onStatusChange: (orderId: string, status: string) => void;
  onDelete: (orderId: string) => void;
}

export default function OrderList({ orders, onStatusChange, onDelete }: Props) {
  if (orders.length === 0) return <p className="text-sm text-gray-400 py-4 text-center">주문이 없습니다.</p>;

  return (
    <div className="space-y-3" data-testid="order-list">
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  );
}
