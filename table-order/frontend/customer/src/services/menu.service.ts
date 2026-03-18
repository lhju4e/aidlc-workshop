import api from './api';
import type { Menu, Category } from '../types';

export async function getMenus(storeId: string): Promise<Menu[]> {
  const { data } = await api.get<Menu[]>('/menus', { params: { storeId } });
  return data;
}

export async function getCategories(storeId: string): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/menus/categories', { params: { storeId } });
  return data;
}
