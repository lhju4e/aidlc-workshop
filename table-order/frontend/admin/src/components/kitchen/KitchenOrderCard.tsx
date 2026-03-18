'use client';

import type { Order } from '@/types';
import { cn } from '@/utils/cn';
import dayjs from 'dayjs';

interface Props {
  order: Order;
  tableNumber: number;
  onStartCooking: (orderId: string) => void;
  onCompleteCooking: (orderId: string) => void;
}

export default function KitchenOrderCard({ order, tableNumber, onStartCooking, onCompleteCooking }: Props) {
  const isPending = order.status === 'pending';

  return (
    <div className={cn('rounded-lg p-4', isPending ? 'bg-orange-900/50 border border-orange-500' : 'bg-blue-900/50 border border-blue-500')} data-testid={`kitchen-order-${order.orderNumber}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-lg">테이블 {tableNumber}</span>
        <span className="text-xs text-gray-400">{dayjs(order.createdAt).format('HH:mm')}</span>
      </div>
      <ul className="space-y-1 mb-3">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between text-sm">
            <span>{item.menuName}</span>
            <span className="font-bold">x{item.quantity}</span>
          </li>
        ))}
      </ul>
      <button
        data-testid={`kitchen-action-${order.orderNumber}`}
        onClick={() => isPending ? onStartCooking(order.id) : onCompleteCooking(order.id)}
        className={cn('w-full py-2 rounded text-sm font-medium', isPending ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600')}
      >
        {isPending ? '조리 시작' : '조리 완료'}
      </button>
    </div>
  );
}
