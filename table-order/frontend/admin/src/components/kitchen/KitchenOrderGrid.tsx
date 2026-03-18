'use client';

import type { Order, Table } from '@/types';
import KitchenOrderCard from './KitchenOrderCard';

interface Props {
  orders: Order[];
  tables: Table[];
  onStartCooking: (orderId: string) => void;
  onCompleteCooking: (orderId: string) => void;
}

export default function KitchenOrderGrid({ orders, tables, onStartCooking, onCompleteCooking }: Props) {
  const sorted = [...orders].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const getTableNumber = (tableId: string) => tables.find((t) => t.id === tableId)?.tableNumber ?? 0;

  if (sorted.length === 0) return <p className="text-center text-gray-500 py-12 text-lg">대기 중인 주문이 없습니다.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="kitchen-order-grid">
      {sorted.map((o) => (
        <KitchenOrderCard key={o.id} order={o} tableNumber={getTableNumber(o.tableId)} onStartCooking={onStartCooking} onCompleteCooking={onCompleteCooking} />
      ))}
    </div>
  );
}
