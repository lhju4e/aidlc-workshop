import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/format';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function OrderConfirmModal({ onConfirm, onCancel, isSubmitting }: Props) {
  const { items, totalAmount } = useCartStore();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onCancel}>
      <div
        className="bg-white rounded-2xl w-[90%] max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
        data-testid="order-confirm-modal"
      >
        <h2 className="text-xl font-bold mb-4">주문 확인</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <div key={item.menuId} className="flex justify-between text-sm">
              <span>{item.menuName} × {item.quantity}</span>
              <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
          <span>총 금액</span>
          <span className="text-blue-600">{formatPrice(totalAmount)}</span>
        </div>
        <div className="flex gap-3 mt-5">
          <button
            data-testid="order-cancel-button"
            onClick={onCancel}
            className="flex-1 py-3 border rounded-xl font-medium"
          >
            취소
          </button>
          <button
            data-testid="order-confirm-button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium disabled:bg-gray-300"
          >
            {isSubmitting ? '주문 중...' : '주문 확정'}
          </button>
        </div>
      </div>
    </div>
  );
}
