import type { Menu } from '../../types';
import { formatPrice } from '../../utils/format';

interface Props {
  menu: Menu;
  onClick: () => void;
}

export default function MenuCard({ menu, onClick }: Props) {
  return (
    <button
      data-testid={`menu-card-${menu.id}`}
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow"
    >
      <div className="w-full h-36 overflow-hidden bg-gray-100">
        <img
          src={menu.imageUrl || '/placeholder.png'}
          alt={menu.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate">{menu.name}</h3>
        <p className="text-blue-600 font-bold mt-1">{formatPrice(menu.price)}</p>
      </div>
    </button>
  );
}
