import { useMenuStore } from '@/stores/menuStore';
import type { Menu } from '@/types';

const mockMenu: Menu = {
  id: 'm1', storeId: 's1', categoryId: 'c1', name: '김치찌개',
  price: 10000, description: null, imageUrl: null, sortOrder: 0, createdAt: '',
};

describe('menuStore', () => {
  beforeEach(() => useMenuStore.setState({ menus: [], categories: [] }));

  it('addMenu and removeMenu', () => {
    useMenuStore.getState().addMenu(mockMenu);
    expect(useMenuStore.getState().menus).toHaveLength(1);
    useMenuStore.getState().removeMenu('m1');
    expect(useMenuStore.getState().menus).toHaveLength(0);
  });

  it('reorderMenus should update sortOrder', () => {
    const m2 = { ...mockMenu, id: 'm2', name: '된장찌개', sortOrder: 1 };
    useMenuStore.getState().setMenus([mockMenu, m2]);
    useMenuStore.getState().reorderMenus(['m2', 'm1']);
    const menus = useMenuStore.getState().menus;
    expect(menus.find((m) => m.id === 'm2')?.sortOrder).toBe(0);
    expect(menus.find((m) => m.id === 'm1')?.sortOrder).toBe(1);
  });
});
