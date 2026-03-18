import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { tableRepository } from '../repositories/table.repository';
import { sessionRepository } from '../repositories/session.repository';
import { orderRepository } from '../repositories/order.repository';
import { paymentRepository } from '../repositories/payment.repository';
import { AppError } from '../utils/AppError';
import { sseService } from './sse.service';

const SALT_ROUNDS = 10;

export const tableService = {
  async setupTable(storeId: string, tableNumber: number, password: string) {
    if (password.length < 8) throw new AppError('Password must be at least 8 characters', 400);
    const existing = await tableRepository.findByStoreAndNumber(storeId, tableNumber);
    if (existing) throw new AppError('Table number already exists', 409);

    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    await tableRepository.create({ id, storeId, tableNumber, passwordHash });
    return { id, storeId, tableNumber };
  },

  async getTables(storeId: string) {
    return tableRepository.findByStore(storeId);
  },

  async completeTable(tableId: string, storeId: string) {
    const table = await tableRepository.findById(tableId);
    if (!table || table.storeId !== storeId) throw new AppError('Table not found', 404);

    const session = await sessionRepository.findActiveByTable(tableId);
    if (!session) throw new AppError('No active session', 400);

    const unpaid = await paymentRepository.countUnpaidBySession(session.id);
    await sessionRepository.complete(session.id);
    sseService.broadcast('tableCompleted', { tableId }, storeId);

    return { success: true, unpaidWarning: unpaid.count > 0 ? { count: unpaid.count, total: unpaid.total } : null };
  },

  async getHistory(tableId: string, storeId: string, startDate?: string, endDate?: string) {
    const table = await tableRepository.findById(tableId);
    if (!table || table.storeId !== storeId) throw new AppError('Table not found', 404);

    const orders = await orderRepository.findHistoryByTable(tableId, startDate, endDate);
    for (const order of orders) {
      order.items = await orderRepository.findItemsByOrderId(order.id);
    }
    return orders;
  },
};
