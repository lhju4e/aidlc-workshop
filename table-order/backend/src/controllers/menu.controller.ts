import { Request, Response, NextFunction } from 'express';
import { menuService } from '../services/menu.service';

export const menuController = {
  async getMenus(req: Request, res: Response, next: NextFunction) {
    try {
      const storeId = req.user!.storeId;
      const categoryId = req.query.categoryId as string | undefined;
      const menus = await menuService.getMenus(storeId, categoryId);
      res.json(menus);
    } catch (err) { next(err); }
  },

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await menuService.getCategories(req.user!.storeId);
      res.json(categories);
    } catch (err) { next(err); }
  },

  async createMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const menu = await menuService.createMenu(req.user!.storeId, { ...req.body, file: req.file });
      res.status(201).json(menu);
    } catch (err) { next(err); }
  },

  async updateMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const menu = await menuService.updateMenu(req.params.id, req.user!.storeId, { ...req.body, file: req.file });
      res.json(menu);
    } catch (err) { next(err); }
  },

  async deleteMenu(req: Request, res: Response, next: NextFunction) {
    try {
      await menuService.deleteMenu(req.params.id, req.user!.storeId);
      res.json({ success: true });
    } catch (err) { next(err); }
  },

  async reorderMenus(req: Request, res: Response, next: NextFunction) {
    try {
      await menuService.reorderMenus(req.body.menuIds);
      res.json({ success: true });
    } catch (err) { next(err); }
  },

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await menuService.createCategory(req.user!.storeId, req.body.name);
      res.status(201).json(category);
    } catch (err) { next(err); }
  },
};
