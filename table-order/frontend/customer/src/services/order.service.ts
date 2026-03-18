import api from './api';
import type { Order } from '../types';

export async function createOrder(items: { menuId: string; quantity: number }[]): Promise<Order> {
  const { data } = await api.post<Order>('/orders', { items });
  return data;
}

export async function getOrders(params: {
  storeId?: string;
  tableId?: string;
  sessionId?: string;
}): Promise<Order[]> {
  const { data } = await api.get<Order[]>('/orders', { params });
  return data;
}
