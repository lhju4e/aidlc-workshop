import { create } from 'zustand';
import type { CartItem } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

interface CartState {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (menuId: string, quantity: number) => void;
  removeItem: (menuId: string) => void;
  clear: () => void;
}

function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');
  } catch {
    return [];
  }
}

const initialItems = loadCart();

export const useCartStore = create<CartState>((set) => ({
  items: initialItems,
  totalAmount: calcTotal(initialItems),

  addItem: (item, quantity) =>
    set((state) => {
      const existing = state.items.find((i) => i.menuId === item.menuId);
      const items = existing
        ? state.items.map((i) => (i.menuId === item.menuId ? { ...i, quantity: i.quantity + quantity } : i))
        : [...state.items, { ...item, quantity }];
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
      return { items, totalAmount: calcTotal(items) };
    }),

  updateQuantity: (menuId, quantity) =>
    set((state) => {
      const items = quantity <= 0 ? state.items.filter((i) => i.menuId !== menuId) : state.items.map((i) => (i.menuId === menuId ? { ...i, quantity } : i));
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
      return { items, totalAmount: calcTotal(items) };
    }),

  removeItem: (menuId) =>
    set((state) => {
      const items = state.items.filter((i) => i.menuId !== menuId);
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
      return { items, totalAmount: calcTotal(items) };
    }),

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.CART);
    set({ items: [], totalAmount: 0 });
  },
}));
