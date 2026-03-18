'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useMenuStore } from '@/stores/menuStore';
import { menuService } from '@/services/menuService';
import type { Menu, MenuFormData } from '@/types';
import CategoryTabs from '@/components/admin/CategoryTabs';
import DraggableMenuList from '@/components/admin/DraggableMenuList';
import MenuFormModal from '@/components/admin/MenuFormModal';
import ConfirmModal from '@/components/common/ConfirmModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBanner from '@/components/common/ErrorBanner';

export default function MenuManagementPage() {
  const { store, hydrate } = useAuthStore();
  const { menus, categories, setMenus, setCategories, addMenu, updateMenu, removeMenu, reorderMenus } = useMenuStore();

  useEffect(() => { hydrate(); }, [hydrate]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!store) { setLoading(false); return; }
    try {
      setLoading(true);
      const [mRes, cRes] = await Promise.all([menuService.getMenus(store.id), menuService.getCategories(store.id)]);
      console.log('categories loaded:', cRes.data);
      setMenus(mRes.data);
      setCategories(cRes.data);
    } catch (e) { console.error('menu load error:', e); setError('메뉴를 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [store, setMenus, setCategories]);

  useEffect(() => { load(); }, [load]);

  const filtered = selectedCategory ? menus.filter((m) => m.categoryId === selectedCategory) : menus;
  const sorted = [...filtered].sort((a, b) => a.sortOrder - b.sortOrder);

  const handleSubmit = async (data: MenuFormData) => {
    try {
      if (editingMenu) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', String(data.price));
        formData.append('description', data.description);
        formData.append('categoryId', data.categoryId);
        if (data.image) formData.append('image', data.image);
        const { data: updated } = await menuService.updateMenu(editingMenu.id, formData as unknown as Partial<Menu>);
        updateMenu(editingMenu.id, updated);
      } else {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', String(data.price));
        formData.append('description', data.description);
        formData.append('categoryId', data.categoryId);
        formData.append('storeId', store!.id);
        if (data.image) formData.append('image', data.image);
        const { data: created } = await menuService.createMenu(formData);
        addMenu(created);
      }
      setIsFormOpen(false);
      setEditingMenu(null);
      load();
    } catch { setError('메뉴 저장에 실패했습니다.'); }
  };

  const handleReorder = async (menuIds: string[]) => {
    const prev = [...menus];
    reorderMenus(menuIds);
    try { await menuService.reorder(menuIds); }
    catch { setMenus(prev); setError('순서 변경에 실패했습니다.'); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await menuService.deleteMenu(deleteId); removeMenu(deleteId); }
    catch { setError('삭제에 실패했습니다.'); }
    setDeleteId(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div data-testid="menu-management-page">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">메뉴 관리</h1>
        <button data-testid="menu-add-button" onClick={() => { setEditingMenu(null); setIsFormOpen(true); }} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          메뉴 추가
        </button>
      </div>
      {error && <ErrorBanner message={error} onRetry={load} />}
      <CategoryTabs categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <DraggableMenuList menus={sorted} onReorder={handleReorder} onEdit={(m) => { setEditingMenu(m); setIsFormOpen(true); }} onDelete={setDeleteId} />
      <MenuFormModal menu={editingMenu} categories={categories} isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); setEditingMenu(null); }} onSubmit={handleSubmit} />
      <ConfirmModal isOpen={!!deleteId} title="메뉴 삭제" message="정말 삭제하시겠습니까?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
