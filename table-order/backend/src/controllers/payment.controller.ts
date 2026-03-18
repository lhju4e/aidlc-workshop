import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/payment.service';

export const paymentController = {
  async getPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await paymentService.getPayments(req.user!.storeId, req.query.status as string);
      res.json(payments);
    } catch (err) { next(err); }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.updateStatus(req.params.orderId, req.body.status, req.user!.storeId);
      res.json(result);
    } catch (err) { next(err); }
  },
};
