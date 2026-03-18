import { create } from 'zustand';
import type { Menu, Category } from '@/types';

interface MenuState {
  menus: Menu[];
  categories: Category[];
  setMenus: (menus: Menu[]) => void;
  setCategories: (categories: Category[]) => void;
  addMenu: (menu: Menu) => void;
  updateMenu: (id: string, data: Partial<Menu>) => void;
  removeMenu: (id: string) => void;
  reorderMenus: (menuIds: string[]) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  categories: [],
  setMenus: (menus) => set({ menus }),
  setCategories: (categories) => set({ categories }),
  addMenu: (menu) => set((s) => ({ menus: [...s.menus, menu] })),
  updateMenu: (id, data) =>
    set((s) => ({
      menus: s.menus.map((m) => (m.id === id ? { ...m, ...data } : m)),
    })),
  removeMenu: (id) =>
    set((s) => ({ menus: s.menus.filter((m) => m.id !== id) })),
  reorderMenus: (menuIds) =>
    set((s) => ({
      menus: menuIds
        .map((id, i) => {
          const menu = s.menus.find((m) => m.id === id);
          return menu ? { ...menu, sortOrder: i } : null;
        })
        .filter((m): m is Menu => m !== null),
    })),
}));
