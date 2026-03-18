import api from './api';
import type { Table, Order } from '@/types';

export const tableService = {
  getTables: (storeId: string) =>
    api.get<Table[]>('/tables', { params: { storeId } }),

  setupTable: (data: { storeId: string; tableNumber: number; password: string }) =>
    api.post<Table>('/tables', data),

  completeTable: (tableId: string) =>
    api.post<{ success: boolean; unpaidWarning?: string }>(`/tables/${tableId}/complete`),

  getHistory: (tableId: string, params?: { startDate?: string; endDate?: string }) =>
    api.get<Order[]>(`/tables/${tableId}/history`, { params }),
};
