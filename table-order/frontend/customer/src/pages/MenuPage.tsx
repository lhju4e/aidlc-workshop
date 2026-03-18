import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { getMenus, getCategories } from '../services/menu.service';
import { createOrder } from '../services/order.service';
import type { Menu, Category } from '../types';
import CategorySidebar from '../components/menu/CategorySidebar';
import MenuGrid from '../components/menu/MenuGrid';
import MenuDetailModal from '../components/menu/MenuDetailModal';
import CartPanel from '../components/cart/CartPanel';
import OrderConfirmModal from '../components/order/OrderConfirmModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function MenuPage() {
  const navigate = useNavigate();
  const table = useAuthStore((s) => s.table);
  const { addItem, items, clear } = useCartStore();

  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!table) return;
    Promise.all([getMenus(table.storeId), getCategories(table.storeId)])
      .then(([m, c]) => { setMenus(m); setCategories(c); })
      .catch(() => setError('메뉴를 불러올 수 없습니다'))
      .finally(() => setIsLoading(false));
  }, [table]);

  const filteredMenus = activeCategoryId ? menus.filter((m) => m.categoryId === activeCategoryId) : menus;

  const handleAddToCart = useCallback((menu: Menu, quantity: number) => {
    addItem({ menuId: menu.id, menuName: menu.name, unitPrice: menu.price, imageUrl: menu.imageUrl }, quantity);
  }, [addItem]);

  const handleOrder = async () => {
    setIsSubmitting(true);
    try {
      const order = await createOrder(items.map((i) => ({ menuId: i.menuId, quantity: i.quantity })));
      clear();
      setShowConfirm(false);
      navigate('/order-success', { state: { orderNumber: order.orderNumber } });
    } catch {
      setError('주문에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-full" data-testid="menu-page">
      <CategorySidebar categories={categories} activeId={activeCategoryId} onSelect={setActiveCategoryId} />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {error && <p className="text-red-500 text-center p-4">{error}</p>}
        <MenuGrid menus={filteredMenus} onMenuClick={setSelectedMenu} />
      </div>
      <CartPanel onOrder={() => setShowConfirm(true)} />

      {selectedMenu && (
        <MenuDetailModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} onAddToCart={handleAddToCart} />
      )}
      {showConfirm && (
        <OrderConfirmModal onConfirm={handleOrder} onCancel={() => setShowConfirm(false)} isSubmitting={isSubmitting} />
      )}
    </div>
  );
}
