import { Request, Response, NextFunction } from 'express';
import { tableService } from '../services/table.service';

export const tableController = {
  async setupTable(req: Request, res: Response, next: NextFunction) {
    try {
      const table = await tableService.setupTable(req.user!.storeId, req.body.tableNumber, req.body.password);
      res.status(201).json(table);
    } catch (err) { next(err); }
  },

  async getTables(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await tableService.getTables(req.user!.storeId);
      res.json(tables);
    } catch (err) { next(err); }
  },

  async completeTable(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await tableService.completeTable(req.params.id, req.user!.storeId);
      res.json(result);
    } catch (err) { next(err); }
  },

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await tableService.getHistory(req.params.id, req.user!.storeId, req.query.startDate as string, req.query.endDate as string);
      res.json(orders);
    } catch (err) { next(err); }
  },
};
