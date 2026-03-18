'use client';

import type { Category } from '@/types';
import { cn } from '@/utils/cn';

interface Props {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export default function CategoryTabs({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-4" data-testid="category-tabs">
      <button onClick={() => onSelect(null)} className={cn('px-3 py-1 rounded text-sm', !selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
        전체
      </button>
      {categories.map((c) => (
        <button key={c.id} onClick={() => onSelect(c.id)} className={cn('px-3 py-1 rounded text-sm', selected === c.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
          {c.name}
        </button>
      ))}
    </div>
  );
}
