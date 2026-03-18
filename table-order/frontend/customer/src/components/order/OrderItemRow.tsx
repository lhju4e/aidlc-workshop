import type { OrderItem } from '../../types';
import { formatPrice } from '../../utils/format';

export default function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <div className="flex justify-between text-sm text-gray-600" data-testid={`order-item-${item.id}`}>
      <span>{item.menuName} × {item.quantity}</span>
      <span>{formatPrice(item.unitPrice * item.quantity)}</span>
    </div>
  );
}
