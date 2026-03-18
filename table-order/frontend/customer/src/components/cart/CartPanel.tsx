import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/format';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

interface Props {
  onOrder: () => void;
}

export default function CartPanel({ onOrder }: Props) {
  const { items, totalAmount, updateQuantity, removeItem, clear } = useCartStore();

  return (
    <aside className="w-72 shrink-0 border-l bg-white flex flex-col" data-testid="cart-panel">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-bold text-lg">장바구니</h2>
        {items.length > 0 && (
          <button data-testid="cart-clear" onClick={clear} className="text-sm text-red-500">
            전체 삭제
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.length === 0 ? (
          <p className="text-center text-gray-400 mt-8 text-sm">장바구니가 비어있습니다</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.menuId}
              item={item}
              onUpdate={(q) => updateQuantity(item.menuId, q)}
              onRemove={() => removeItem(item.menuId)}
            />
          ))
        )}
      </div>

      <CartSummary totalAmount={totalAmount} itemCount={items.length} onOrder={onOrder} />
    </aside>
  );
}
