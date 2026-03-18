'use client';

import type { Order } from '@/types';
import { cn } from '@/utils/cn';

interface Props {
  order: Order;
  onStatusChange: (orderId: string, status: string) => void;
  onDelete: (orderId: string) => void;
}

const statusLabel: Record<string, string> = { pending: '대기중', preparing: '준비중', completed: '완료' };
const statusColor: Record<string, string> = { pending: 'bg-orange-100 text-orange-700', preparing: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700' };

export default function OrderCard({ order, onStatusChange, onDelete }: Props) {
  const nextStatus = order.status === 'pending' ? 'preparing' : order.status === 'preparing' ? 'completed' : null;

  return (
    <div className="border rounded p-3 text-sm" data-testid={`order-card-${order.orderNumber}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">#{order.orderNumber}</span>
        <span className={cn('px-2 py-0.5 rounded text-xs', statusColor[order.status])}>{statusLabel[order.status]}</span>
      </div>
      <ul className="space-y-1 mb-2">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between text-gray-600">
            <span>{item.menuName} x{item.quantity}</span>
            <span>{(item.unitPrice * item.quantity).toLocaleString()}원</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2">
        <span>{order.totalAmount.toLocaleString()}원</span>
        <div className="flex gap-1">
          {nextStatus && (
            <button data-testid={`order-status-${order.orderNumber}`} onClick={() => onStatusChange(order.id, nextStatus)} className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              {nextStatus === 'preparing' ? '조리 시작' : '조리 완료'}
            </button>
          )}
          <button data-testid={`order-delete-${order.orderNumber}`} onClick={() => onDelete(order.id)} className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
