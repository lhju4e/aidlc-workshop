import api from './api';
import type { Payment } from '@/types';

export const paymentService = {
  getPayments: (params: { storeId: string; tableId?: string; status?: string }) =>
    api.get<Payment[]>('/payments', { params }),

  updateStatus: (orderId: string, status: string) =>
    api.patch<Payment>(`/payments/${orderId}`, { status }),
};
