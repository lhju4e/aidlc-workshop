jest.mock('../../repositories/order.repository');
jest.mock('../../repositories/menu.repository');
jest.mock('../../repositories/session.repository');
jest.mock('../../repositories/payment.repository');
jest.mock('../../utils/transaction', () => ({ withTransaction: jest.fn((fn: any) => fn({} as any)) }));
jest.mock('../sse.service', () => ({ sseService: { broadcast: jest.fn() } }));

import { orderService } from '../order.service';
import { orderRepository } from '../../repositories/order.repository';
import { menuRepository } from '../../repositories/menu.repository';
import { sessionRepository } from '../../repositories/session.repository';

describe('OrderService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('createOrder throws if no items', async () => {
    await expect(orderService.createOrder('s1', 't1', { items: [] })).rejects.toThrow('At least one item required');
  });

  test('createOrder creates session if none active', async () => {
    (sessionRepository.findActiveByTable as jest.Mock).mockResolvedValue(null);
    (sessionRepository.create as jest.Mock).mockResolvedValue(undefined);
    (orderRepository.getNextOrderNumber as jest.Mock).mockResolvedValue(1);
    (menuRepository.findById as jest.Mock).mockResolvedValue({ id: 'm1', storeId: 's1', name: 'Menu1', price: 10000 });
    (orderRepository.create as jest.Mock).mockResolvedValue(undefined);
    (orderRepository.createItems as jest.Mock).mockResolvedValue(undefined);

    const result = await orderService.createOrder('s1', 't1', { items: [{ menuId: 'm1', quantity: 2 }] });
    expect(sessionRepository.create).toHaveBeenCalled();
    expect(result.totalAmount).toBe(20000);
  });

  test('updateStatus throws on invalid transition', async () => {
    (orderRepository.findById as jest.Mock).mockResolvedValue({ id: 'o1', storeId: 's1', status: 'completed' });
    await expect(orderService.updateStatus('o1', 'preparing', 's1')).rejects.toThrow('Cannot transition');
  });

  test('updateStatus allows valid transition', async () => {
    (orderRepository.findById as jest.Mock).mockResolvedValue({ id: 'o1', storeId: 's1', status: 'pending', tableId: 't1' });
    (orderRepository.updateStatus as jest.Mock).mockResolvedValue(undefined);
    const result = await orderService.updateStatus('o1', 'preparing', 's1');
    expect(result.status).toBe('preparing');
  });
});
