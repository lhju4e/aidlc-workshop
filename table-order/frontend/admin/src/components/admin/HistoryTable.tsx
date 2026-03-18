'use client';

import dayjs from 'dayjs';
import type { Order } from '@/types';

interface Props {
  orders: Order[];
}

export default function HistoryTable({ orders }: Props) {
  if (orders.length === 0) return <p className="text-sm text-gray-400 py-8 text-center">주문 내역이 없습니다.</p>;

  const total = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="overflow-x-auto" data-testid="history-table">
      <div className="mb-3 text-right text-sm font-semibold">
        총 {orders.length}건 · <span className="text-blue-600">{total.toLocaleString()}원</span>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">주문번호</th>
            <th className="px-4 py-2 text-left">시각</th>
            <th className="px-4 py-2 text-left">메뉴</th>
            <th className="px-4 py-2 text-right">금액</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="px-4 py-2">#{o.orderNumber}</td>
              <td className="px-4 py-2">{dayjs(o.createdAt).format('YYYY-MM-DD HH:mm')}</td>
              <td className="px-4 py-2">{o.items.map((i) => `${i.menuName}x${i.quantity}`).join(', ')}</td>
              <td className="px-4 py-2 text-right">{o.totalAmount.toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
