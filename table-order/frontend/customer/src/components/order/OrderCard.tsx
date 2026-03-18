import type { Order } from '../../types';
import { formatPrice, formatTime, getStatusLabel, getStatusColor } from '../../utils/format';
import OrderItemRow from './OrderItemRow';

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4" data-testid={`order-card-${order.id}`}>
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="font-bold">주문 #{order.orderNumber}</span>
          <span className="text-gray-400 text-sm ml-2">{formatTime(order.createdAt)}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {getStatusLabel(order.status)}
        </span>
      </div>
      {order.items && (
        <div className="space-y-1">
          {order.items.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </div>
      )}
      <div className="border-t mt-3 pt-3 flex justify-between font-bold">
        <span>합계</span>
        <span className="text-blue-600">{formatPrice(order.totalAmount)}</span>
      </div>
    </div>
  );
}
