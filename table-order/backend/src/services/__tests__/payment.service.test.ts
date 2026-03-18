jest.mock('../../repositories/payment.repository');
jest.mock('../../repositories/order.repository');
jest.mock('../sse.service', () => ({ sseService: { broadcast: jest.fn() } }));

import { paymentService } from '../payment.service';
import { orderRepository } from '../../repositories/order.repository';

describe('PaymentService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('updateStatus throws on invalid status', async () => {
    await expect(paymentService.updateStatus('o1', 'invalid', 's1')).rejects.toThrow('Invalid payment status');
  });

  test('updateStatus throws if order not found', async () => {
    (orderRepository.findById as jest.Mock).mockResolvedValue(null);
    await expect(paymentService.updateStatus('o1', 'paid', 's1')).rejects.toThrow('Order not found');
  });
});
