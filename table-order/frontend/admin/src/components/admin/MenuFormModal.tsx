'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import type { Menu, Category, MenuFormData } from '@/types';

interface Props {
  menu: Menu | null;
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MenuFormData) => void;
}

export default function MenuFormModal({ menu, categories, isOpen, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (menu) { setName(menu.name); setPrice(menu.price); setDescription(menu.description ?? ''); setCategoryId(menu.categoryId); }
    else { setName(''); setPrice(0); setDescription(''); setCategoryId(categories[0]?.id ?? ''); }
    setImage(null);
    setErrors({});
  }, [menu, isOpen, categories]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim() || name.length > 100) e.name = '메뉴명은 1~100자 필수입니다.';
    if (price < 0 || !Number.isInteger(price)) e.price = '가격은 0 이상 정수여야 합니다.';
    if (!categoryId) e.categoryId = '카테고리를 선택해주세요.';
    if (image) {
      const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowed.includes(image.type)) e.image = '허용 형식: jpg, png, gif, webp';
      if (image.size > 5 * 1024 * 1024) e.image = '최대 5MB까지 업로드 가능합니다.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, price, description, categoryId, image });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl" data-testid="menu-form-modal">
          <Dialog.Title className="text-lg font-bold mb-4">{menu ? '메뉴 수정' : '메뉴 등록'}</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input data-testid="menu-form-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="메뉴명" className="w-full border rounded px-3 py-2 text-sm" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input data-testid="menu-form-price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="가격" className="w-full border rounded px-3 py-2 text-sm" />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <textarea data-testid="menu-form-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설명 (선택)" className="w-full border rounded px-3 py-2 text-sm" rows={2} />
            <div>
              <select data-testid="menu-form-category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
            </div>
            <div>
              <input data-testid="menu-form-image" type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={(e) => setImage(e.target.files?.[0] ?? null)} className="text-sm" />
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">취소</button>
              <button data-testid="menu-form-submit" type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">{menu ? '수정' : '등록'}</button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
