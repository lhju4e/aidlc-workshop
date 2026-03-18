'use client';

import dayjs from 'dayjs';
import type { OrderHistoryFilter, Table } from '@/types';

interface Props {
  filter: OrderHistoryFilter;
  tables: Table[];
  onChange: (filter: OrderHistoryFilter) => void;
}

export default function HistoryFilter({ filter, tables, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-end" data-testid="history-filter">
      <div>
        <label className="block text-xs text-gray-500 mb-1">시작일</label>
        <input data-testid="history-filter-start" type="date" value={filter.startDate} onChange={(e) => onChange({ ...filter, startDate: e.target.value })} className="border rounded px-3 py-1.5 text-sm" />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">종료일</label>
        <input data-testid="history-filter-end" type="date" value={filter.endDate} onChange={(e) => onChange({ ...filter, endDate: e.target.value })} className="border rounded px-3 py-1.5 text-sm" />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">테이블</label>
        <select data-testid="history-filter-table" value={filter.tableId ?? ''} onChange={(e) => onChange({ ...filter, tableId: e.target.value || null })} className="border rounded px-3 py-1.5 text-sm">
          <option value="">전체</option>
          {tables.map((t) => <option key={t.id} value={t.id}>테이블 {t.tableNumber}</option>)}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        {(['pending', 'preparing', 'completed'] as const).map((s) => (
          <label key={s} className="flex items-center gap-1 text-xs">
            <input
              type="checkbox"
              checked={filter.status.includes(s)}
              onChange={(e) => {
                const next = e.target.checked ? [...filter.status, s] : filter.status.filter((x) => x !== s);
                onChange({ ...filter, status: next });
              }}
            />
            {{ pending: '대기중', preparing: '준비중', completed: '완료' }[s]}
          </label>
        ))}
      </div>
    </div>
  );
}
