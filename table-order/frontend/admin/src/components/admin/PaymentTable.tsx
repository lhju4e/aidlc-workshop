'use client';

import type { Payment, Order } from '@/types';

interface Props {
  payments: (Payment & { order?: Order })[];
  onStatusChange: (orderId: string, status: string) => void;
}

const statusLabel: Record<string, string> = { unpaid: '미결제', paid: '결제완료', failed: '결제실패' };
const statusColor: Record<string, string> = { unpaid: 'text-red-600', paid: 'text-green-600', failed: 'text-orange-600' };

export default function PaymentTable({ payments, onStatusChange }: Props) {
  return (
    <div className="overflow-x-auto" data-testid="payment-table">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">주문번호</th>
            <th className="px-4 py-2 text-left">금액</th>
            <th className="px-4 py-2 text-left">상태</th>
            <th className="px-4 py-2 text-left">변경</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">#{p.order?.orderNumber ?? '-'}</td>
              <td className="px-4 py-2">{p.order?.totalAmount?.toLocaleString() ?? 0}원</td>
              <td className={`px-4 py-2 font-medium ${statusColor[p.status]}`}>{statusLabel[p.status]}</td>
              <td className="px-4 py-2">
                <select
                  data-testid={`payment-status-${p.orderId}`}
                  value={p.status}
                  onChange={(e) => onStatusChange(p.orderId, e.target.value)}
                  className="border rounded px-2 py-1 text-xs"
                >
                  <option value="unpaid">미결제</option>
                  <option value="paid">결제완료</option>
                  <option value="failed">결제실패</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
