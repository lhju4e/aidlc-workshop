import type { Menu } from '../../types';
import MenuCard from './MenuCard';

interface Props {
  menus: Menu[];
  onMenuClick: (menu: Menu) => void;
}

export default function MenuGrid({ menus, onMenuClick }: Props) {
  if (menus.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400">메뉴가 없습니다</div>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto" data-testid="menu-grid">
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} onClick={() => onMenuClick(menu)} />
      ))}
    </div>
  );
}
