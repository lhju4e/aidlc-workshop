import { usePaymentStore } from '@/stores/paymentStore';

describe('paymentStore', () => {
  beforeEach(() => usePaymentStore.setState({ payments: [] }));

  it('setPayments and updatePayment', () => {
    usePaymentStore.getState().setPayments([{ id: 'p1', orderId: 'o1', status: 'unpaid', updatedAt: '' }]);
    expect(usePaymentStore.getState().payments).toHaveLength(1);

    usePaymentStore.getState().updatePayment('o1', { status: 'paid' });
    expect(usePaymentStore.getState().payments[0].status).toBe('paid');
  });
});
