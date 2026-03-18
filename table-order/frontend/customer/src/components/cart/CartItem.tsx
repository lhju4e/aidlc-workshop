import type { CartItem as CartItemType } from '../../types';
import { formatPrice } from '../../utils/format';

interface Props {
  item: CartItemType;
  onUpdate: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({ item, onUpdate, onRemove }: Props) {
  return (
    <div className="bg-gray-50 rounded-lg p-3" data-testid={`cart-item-${item.menuId}`}>
      <div className="flex justify-between items-start">
        <span className="font-medium text-sm truncate flex-1">{item.menuName}</span>
        <button data-testid={`cart-remove-${item.menuId}`} onClick={onRemove} className="text-gray-400 text-xs ml-2">✕</button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <button
            data-testid={`cart-decrease-${item.menuId}`}
            onClick={() => onUpdate(item.quantity - 1)}
            className="w-7 h-7 rounded-full bg-white border text-sm"
          >
            −
          </button>
          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
          <button
            data-testid={`cart-increase-${item.menuId}`}
            onClick={() => onUpdate(item.quantity + 1)}
            className="w-7 h-7 rounded-full bg-white border text-sm"
          >
            +
          </button>
        </div>
        <span className="text-sm font-bold text-blue-600">{formatPrice(item.unitPrice * item.quantity)}</span>
      </div>
    </div>
  );
}
