import { useState } from 'react';
import type { Menu } from '../../types';
import { formatPrice } from '../../utils/format';

interface Props {
  menu: Menu;
  onClose: () => void;
  onAddToCart: (menu: Menu, quantity: number) => void;
}

export default function MenuDetailModal({ menu, onClose, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-[90%] max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-testid="menu-detail-modal"
      >
        <img
          src={menu.imageUrl || '/placeholder.png'}
          alt={menu.name}
          className="w-full h-48 object-cover bg-gray-100"
        />
        <div className="p-5">
          <h2 className="text-xl font-bold">{menu.name}</h2>
          {menu.description && <p className="text-gray-500 mt-2 text-sm">{menu.description}</p>}
          <p className="text-blue-600 font-bold text-lg mt-3">{formatPrice(menu.price)}</p>

          <div className="flex items-center justify-center gap-6 mt-5">
            <button
              data-testid="modal-quantity-decrease"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full bg-gray-100 text-xl font-bold"
            >
              −
            </button>
            <span className="text-xl font-bold w-8 text-center" data-testid="modal-quantity">{quantity}</span>
            <button
              data-testid="modal-quantity-increase"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 rounded-full bg-gray-100 text-xl font-bold"
            >
              +
            </button>
          </div>

          <button
            data-testid="modal-add-to-cart"
            onClick={() => { onAddToCart(menu, quantity); onClose(); }}
            className="w-full mt-5 py-3 bg-blue-600 text-white rounded-xl font-medium text-lg"
          >
            장바구니 담기 · {formatPrice(menu.price * quantity)}
          </button>
        </div>
      </div>
    </div>
  );
}
