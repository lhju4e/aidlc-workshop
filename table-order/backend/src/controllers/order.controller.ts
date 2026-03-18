import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/order.service';
import { sessionRepository } from '../repositories/session.repository';

export const orderController = {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, tableId } = req.user!;
      const order = await orderService.createOrder(storeId, tableId!, req.body);
      res.status(201).json(order);
    } catch (err) { next(err); }
  },

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, role, tableId } = req.user!;
      if (role === 'table') {
        const session = await sessionRepository.findActiveByTable(tableId!);
        const orders = await orderService.getOrders(storeId, tableId, session?.id);
        res.json(orders);
      } else if (req.query.kitchen === 'true') {
        const orders = await orderService.getKitchenOrders(storeId);
        res.json(orders);
      } else {
        const orders = await orderService.getOrders(storeId, req.query.tableId as string);
        res.json(orders);
      }
    } catch (err) { next(err); }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.updateStatus(req.params.id, req.body.status, req.user!.storeId);
      res.json(order);
    } catch (err) { next(err); }
  },

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      await orderService.deleteOrder(req.params.id, req.user!.storeId);
      res.json({ success: true });
    } catch (err) { next(err); }
  },
};
