import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeName, username, password } = req.body;
      const result = await authService.registerStore(storeName, username, password);
      res.status(201).json(result);
    } catch (err) { next(err); }
  },

  async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, username, password } = req.body;
      const result = await authService.loginAdmin(storeId, username, password);
      res.json(result);
    } catch (err) { next(err); }
  },

  async tableLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, tableNumber, password } = req.body;
      const result = await authService.loginTable(storeId, tableNumber, password);
      res.json(result);
    } catch (err) { next(err); }
  },
};
