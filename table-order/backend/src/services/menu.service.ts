import { v4 as uuidv4 } from 'uuid';
import { menuRepository } from '../repositories/menu.repository';
import { categoryRepository } from '../repositories/category.repository';
import { AppError } from '../utils/AppError';
import { fileService } from './file.service';

export const menuService = {
  async getMenus(storeId: string, categoryId?: string) {
    return menuRepository.findByStore(storeId, categoryId);
  },

  async getCategories(storeId: string) {
    return categoryRepository.findByStore(storeId);
  },

  async createMenu(storeId: string, data: { name: string; price: number; description?: string; categoryId: string; file?: Express.Multer.File }) {
    const category = await categoryRepository.findById(data.categoryId);
    if (!category || category.storeId !== storeId) throw new AppError('Invalid category', 400);
    if (data.price < 0) throw new AppError('Price must be >= 0', 400);

    let imageUrl: string | null = null;
    if (data.file) {
      fileService.validateFile(data.file.mimetype, data.file.size);
      imageUrl = fileService.saveFile(data.file, storeId);
    }

    const id = uuidv4();
    const menus = await menuRepository.findByStore(storeId, data.categoryId);
    const sortOrder = menus.length;
    await menuRepository.create({ id, storeId, categoryId: data.categoryId, name: data.name, price: data.price, description: data.description || null, imageUrl, sortOrder });
    return { id, storeId, categoryId: data.categoryId, name: data.name, price: data.price, description: data.description || null, imageUrl, sortOrder };
  },

  async updateMenu(id: string, storeId: string, data: { name?: string; price?: number; description?: string; categoryId?: string; file?: Express.Multer.File }) {
    const menu = await menuRepository.findById(id);
    if (!menu || menu.storeId !== storeId) throw new AppError('Menu not found', 404);
    if (data.price !== undefined && data.price < 0) throw new AppError('Price must be >= 0', 400);

    let imageUrl: string | undefined;
    if (data.file) {
      fileService.validateFile(data.file.mimetype, data.file.size);
      if (menu.imageUrl) fileService.deleteFile(menu.imageUrl);
      imageUrl = fileService.saveFile(data.file, storeId);
    }

    await menuRepository.update(id, { name: data.name, price: data.price, description: data.description, categoryId: data.categoryId, imageUrl });
    return { ...menu, ...data, imageUrl: imageUrl ?? menu.imageUrl };
  },

  async deleteMenu(id: string, storeId: string) {
    const menu = await menuRepository.findById(id);
    if (!menu || menu.storeId !== storeId) throw new AppError('Menu not found', 404);
    if (menu.imageUrl) fileService.deleteFile(menu.imageUrl);
    await menuRepository.delete(id);
  },

  async reorderMenus(menuIds: string[]) {
    await menuRepository.bulkUpdateSortOrder(menuIds);
  },

  async createCategory(storeId: string, name: string) {
    const id = uuidv4();
    const categories = await categoryRepository.findByStore(storeId);
    await categoryRepository.create({ id, storeId, name, sortOrder: categories.length });
    return { id, storeId, name, sortOrder: categories.length };
  },
};
