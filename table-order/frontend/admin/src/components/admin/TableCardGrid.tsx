'use client';

import type { TableCardData } from '@/types';
import TableCard from './TableCard';

interface Props {
  tables: TableCardData[];
  onSelect: (data: TableCardData) => void;
}

export default function TableCardGrid({ tables, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="table-card-grid">
      {tables.map((t) => (
        <TableCard key={t.table.id} data={t} onClick={() => onSelect(t)} />
      ))}
    </div>
  );
}
