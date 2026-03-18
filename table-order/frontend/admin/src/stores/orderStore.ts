import { create } from 'zustand';
import type { Order } from '@/types';

interface OrderState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, data: Partial<Order>) => void;
  removeOrder: (orderId: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((s) => ({ orders: [...s.orders, order] })),
  updateOrder: (orderId, data) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === orderId ? { ...o, ...data } : o)),
    })),
  removeOrder: (orderId) =>
    set((s) => ({ orders: s.orders.filter((o) => o.id !== orderId) })),
}));
