'use client';

import type { TableCardData } from '@/types';
import { cn } from '@/utils/cn';

interface Props {
  data: TableCardData;
  onClick: () => void;
}

export default function TableCard({ data, onClick }: Props) {
  const { table, totalAmount, pendingCount, hasActiveSession } = data;

  const bgColor = !hasActiveSession
    ? 'bg-gray-100'
    : pendingCount > 0
      ? 'bg-orange-50 border-orange-300'
      : 'bg-blue-50 border-blue-300';

  return (
    <button
      data-testid={`table-card-${table.tableNumber}`}
      onClick={onClick}
      className={cn('relative p-4 rounded-lg border-2 text-left w-full hover:shadow-md transition-shadow', bgColor)}
    >
      <div className="font-bold text-lg">테이블 {table.tableNumber}</div>
      <div className="text-sm text-gray-600 mt-1">{totalAmount.toLocaleString()}원</div>
      {pendingCount > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center" data-testid={`table-card-badge-${table.tableNumber}`}>
          {pendingCount}
        </span>
      )}
    </button>
  );
}
