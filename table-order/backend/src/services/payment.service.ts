import { paymentRepository } from '../repositories/payment.repository';
import { orderRepository } from '../repositories/order.repository';
import { AppError } from '../utils/AppError';
import { sseService } from './sse.service';

export const paymentService = {
  async getPayments(storeId: string, status?: string) {
    return paymentRepository.findByStore(storeId, status);
  },

  async updateStatus(orderId: string, status: string, storeId: string) {
    if (!['unpaid', 'paid', 'failed'].includes(status)) throw new AppError('Invalid payment status', 400);
    const order = await orderRepository.findById(orderId);
    if (!order || order.storeId !== storeId) throw new AppError('Order not found', 404);

    await paymentRepository.updateStatus(orderId, status);
    sseService.broadcast('paymentStatusChange', { orderId, status }, storeId);
    return { orderId, status };
  },

  async checkUnpaid(sessionId: string) {
    return paymentRepository.countUnpaidBySession(sessionId);
  },
};
