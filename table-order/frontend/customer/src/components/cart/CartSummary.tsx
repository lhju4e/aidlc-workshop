import { formatPrice } from '../../utils/format';

interface Props {
  totalAmount: number;
  itemCount: number;
  onOrder: () => void;
}

export default function CartSummary({ totalAmount, itemCount, onOrder }: Props) {
  return (
    <div className="border-t p-4 space-y-3" data-testid="cart-summary">
      <div className="flex justify-between font-bold text-lg">
        <span>합계</span>
        <span className="text-blue-600">{formatPrice(totalAmount)}</span>
      </div>
      <button
        data-testid="cart-order-button"
        onClick={onOrder}
        disabled={itemCount === 0}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        주문하기 ({itemCount})
      </button>
    </div>
  );
}
