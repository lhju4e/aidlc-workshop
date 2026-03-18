import api from './api';
import type { Menu, Category } from '@/types';

export const menuService = {
  getMenus: (storeId: string, category?: string) =>
    api.get<Menu[]>('/menus', { params: { storeId, category } }),

  getCategories: (storeId: string) =>
    api.get<Category[]>('/menus/categories', { params: { storeId } }),

  createMenu: (data: FormData) =>
    api.post<Menu>('/menus', data, { headers: { 'Content-Type': 'multipart/form-data' } }),

  updateMenu: (id: string, data: Partial<Menu>) =>
    api.put<Menu>(`/menus/${id}`, data),

  deleteMenu: (id: string) =>
    api.delete(`/menus/${id}`),

  reorder: (menuIds: string[]) =>
    api.put('/menus/reorder', { menuIds }),

  uploadImage: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{ imageUrl: string }>(`/menus/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
