import api from './api';
import type { Order } from '@/types';

export const orderService = {
  getOrders: (params: { storeId: string; status?: string }) =>
    api.get<Order[]>('/orders', { params }),

  updateStatus: (orderId: string, status: string) =>
    api.patch<Order>(`/orders/${orderId}/status`, { status }),

  deleteOrder: (orderId: string) =>
    api.delete(`/orders/${orderId}`),
};
