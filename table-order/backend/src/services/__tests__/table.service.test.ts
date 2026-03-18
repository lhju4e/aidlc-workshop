jest.mock('../../repositories/table.repository');
jest.mock('../../repositories/session.repository');
jest.mock('../../repositories/order.repository');
jest.mock('../../repositories/payment.repository');
jest.mock('../sse.service', () => ({ sseService: { broadcast: jest.fn() } }));
jest.mock('bcrypt');

import { tableService } from '../table.service';
import { tableRepository } from '../../repositories/table.repository';
import { sessionRepository } from '../../repositories/session.repository';
import { paymentRepository } from '../../repositories/payment.repository';

describe('TableService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('setupTable throws if table number exists', async () => {
    (tableRepository.findByStoreAndNumber as jest.Mock).mockResolvedValue({ id: 't1' });
    await expect(tableService.setupTable('s1', 1, 'password123')).rejects.toThrow('Table number already exists');
  });

  test('setupTable throws if password too short', async () => {
    await expect(tableService.setupTable('s1', 1, 'short')).rejects.toThrow('Password must be at least 8 characters');
  });

  test('completeTable throws if no active session', async () => {
    (tableRepository.findById as jest.Mock).mockResolvedValue({ id: 't1', storeId: 's1' });
    (sessionRepository.findActiveByTable as jest.Mock).mockResolvedValue(null);
    await expect(tableService.completeTable('t1', 's1')).rejects.toThrow('No active session');
  });

  test('completeTable returns unpaid warning', async () => {
    (tableRepository.findById as jest.Mock).mockResolvedValue({ id: 't1', storeId: 's1' });
    (sessionRepository.findActiveByTable as jest.Mock).mockResolvedValue({ id: 'ses1' });
    (paymentRepository.countUnpaidBySession as jest.Mock).mockResolvedValue({ count: 2, total: 30000 });
    (sessionRepository.complete as jest.Mock).mockResolvedValue(undefined);

    const result = await tableService.completeTable('t1', 's1');
    expect(result.unpaidWarning).toEqual({ count: 2, total: 30000 });
  });
});
