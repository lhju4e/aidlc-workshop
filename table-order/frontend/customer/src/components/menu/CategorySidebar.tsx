import type { Category } from '../../types';

interface Props {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
}

export default function CategorySidebar({ categories, activeId, onSelect }: Props) {
  return (
    <aside className="w-36 shrink-0 bg-gray-50 border-r overflow-y-auto" data-testid="category-sidebar">
      <button
        data-testid="category-all"
        onClick={() => onSelect(null)}
        className={`w-full px-3 py-4 text-left text-sm font-medium ${
          activeId === null ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
        }`}
      >
        전체
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          data-testid={`category-${cat.id}`}
          onClick={() => onSelect(cat.id)}
          className={`w-full px-3 py-4 text-left text-sm font-medium ${
            activeId === cat.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </aside>
  );
}
