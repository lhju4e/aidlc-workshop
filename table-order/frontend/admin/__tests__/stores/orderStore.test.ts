import { useOrderStore } from '@/stores/orderStore';
import type { Order } from '@/types';

const mockOrder: Order = {
  id: 'o1', storeId: 's1', tableId: 't1', sessionId: 'ss1',
  orderNumber: 1, status: 'pending', totalAmount: 10000,
  items: [{ id: 'i1', orderId: 'o1', menuId: 'm1', menuName: '김치찌개', quantity: 1, unitPrice: 10000 }],
  createdAt: '2026-01-01T00:00:00Z',
};

describe('orderStore', () => {
  beforeEach(() => useOrderStore.setState({ orders: [] }));

  it('setOrders should replace orders', () => {
    useOrderStore.getState().setOrders([mockOrder]);
    expect(useOrderStore.getState().orders).toHaveLength(1);
  });

  it('addOrder should append', () => {
    useOrderStore.getState().setOrders([mockOrder]);
    useOrderStore.getState().addOrder({ ...mockOrder, id: 'o2', orderNumber: 2 });
    expect(useOrderStore.getState().orders).toHaveLength(2);
  });

  it('updateOrder should update matching order', () => {
    useOrderStore.getState().setOrders([mockOrder]);
    useOrderStore.getState().updateOrder('o1', { status: 'preparing' });
    expect(useOrderStore.getState().orders[0].status).toBe('preparing');
  });

  it('removeOrder should filter out', () => {
    useOrderStore.getState().setOrders([mockOrder]);
    useOrderStore.getState().removeOrder('o1');
    expect(useOrderStore.getState().orders).toHaveLength(0);
  });
});
