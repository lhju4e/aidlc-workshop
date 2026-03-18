import { v4 as uuidv4 } from 'uuid';
import { orderRepository } from '../repositories/order.repository';
import { menuRepository } from '../repositories/menu.repository';
import { sessionRepository } from '../repositories/session.repository';
import { paymentRepository } from '../repositories/payment.repository';
import { AppError } from '../utils/AppError';
import { withTransaction } from '../utils/transaction';
import { sseService } from './sse.service';
import { CreateOrderInput, OrderItem } from '../models/types';

const VALID_TRANSITIONS: Record<string, string> = { pending: 'preparing', preparing: 'completed' };

export const orderService = {
  async createOrder(storeId: string, tableId: string, input: CreateOrderInput) {
    if (!input.items?.length) throw new AppError('At least one item required', 400);

    return withTransaction(async (conn) => {
      let session = await sessionRepository.findActiveByTable(tableId);
      if (!session) {
        const sessionId = uuidv4();
        await sessionRepository.create({ id: sessionId, tableId, storeId }, conn);
        session = { id: sessionId, tableId, storeId, startedAt: new Date(), completedAt: null, isActive: true };
      }

      const orderId = uuidv4();
      const orderNumber = await orderRepository.getNextOrderNumber(storeId, conn);

      const items: OrderItem[] = [];
      let totalAmount = 0;
      for (const item of input.items) {
        const menu = await menuRepository.findById(item.menuId);
        if (!menu || menu.storeId !== storeId) throw new AppError(`Invalid menu: ${item.menuId}`, 400);
        if (item.quantity < 1) throw new AppError('Quantity must be >= 1', 400);
        items.push({ id: uuidv4(), orderId, menuId: menu.id, menuName: menu.name, quantity: item.quantity, unitPrice: menu.price });
        totalAmount += menu.price * item.quantity;
      }

      const order = { id: orderId, storeId, tableId, sessionId: session.id, orderNumber, status: 'pending' as const, totalAmount };
      await orderRepository.create(order, conn);
      await orderRepository.createItems(items, conn);
      await paymentRepository.create({ id: uuidv4(), orderId, status: 'unpaid' }, conn);

      const result = { ...order, createdAt: new Date(), items };
      sseService.broadcast('newOrder', result, storeId);
      return result;
    });
  },

  async getOrders(storeId: string, tableId?: string, sessionId?: string) {
    let orders;
    if (sessionId) {
      orders = await orderRepository.findBySession(sessionId);
    } else {
      orders = await orderRepository.findActiveByStore(storeId);
    }
    if (tableId) orders = orders.filter((o) => o.tableId === tableId);

    for (const order of orders) {
      order.items = await orderRepository.findItemsByOrderId(order.id);
    }
    return orders;
  },

  async getKitchenOrders(storeId: string) {
    const orders = await orderRepository.findPendingAndPreparingByStore(storeId);
    for (const order of orders) {
      order.items = await orderRepository.findItemsByOrderId(order.id);
    }
    return orders;
  },

  async updateStatus(orderId: string, status: string, storeId: string) {
    const order = await orderRepository.findById(orderId);
    if (!order || order.storeId !== storeId) throw new AppError('Order not found', 404);
    if (VALID_TRANSITIONS[order.status] !== status) throw new AppError(`Cannot transition from ${order.status} to ${status}`, 400);

    await orderRepository.updateStatus(orderId, status);
    sseService.broadcast('orderStatusChange', { orderId, status, tableId: order.tableId }, storeId);
    return { ...order, status };
  },

  async deleteOrder(orderId: string, storeId: string) {
    const order = await orderRepository.findById(orderId);
    if (!order || order.storeId !== storeId) throw new AppError('Order not found', 404);
    await orderRepository.delete(orderId);
    sseService.broadcast('orderDeleted', { orderId, tableId: order.tableId }, storeId);
  },
};
