import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { storeRepository } from '../repositories/store.repository';
import { AppError } from '../utils/AppError';

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
      const { storeId, storeName, username, password } = req.body;
      let resolvedStoreId = storeId;
      if (!resolvedStoreId && storeName) {
        const store = await storeRepository.findByName(storeName);
        if (!store) throw new AppError('Invalid credentials', 401);
        resolvedStoreId = store.id;
      }
      if (!resolvedStoreId) throw new AppError('Store identifier required', 400);
      const result = await authService.loginAdmin(resolvedStoreId, username, password);
      res.json(result);
    } catch (err) { next(err); }
  },

  async tableLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, storeName, tableNumber, password } = req.body;
      let resolvedStoreId = storeId;
      if (!resolvedStoreId && storeName) {
        const store = await storeRepository.findByName(storeName);
        if (!store) throw new AppError('Invalid credentials', 401);
        resolvedStoreId = store.id;
      }
      if (!resolvedStoreId) throw new AppError('Store identifier required', 400);
      const result = await authService.loginTable(resolvedStoreId, tableNumber, password);
      res.json(result);
    } catch (err) { next(err); }
  },
};
