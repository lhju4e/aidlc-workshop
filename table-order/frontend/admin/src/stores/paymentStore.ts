import { create } from 'zustand';
import type { Payment } from '@/types';

interface PaymentState {
  payments: Payment[];
  setPayments: (payments: Payment[]) => void;
  updatePayment: (orderId: string, data: Partial<Payment>) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  payments: [],
  setPayments: (payments) => set({ payments }),
  updatePayment: (orderId, data) =>
    set((s) => ({
      payments: s.payments.map((p) =>
        p.orderId === orderId ? { ...p, ...data } : p
      ),
    })),
}));
