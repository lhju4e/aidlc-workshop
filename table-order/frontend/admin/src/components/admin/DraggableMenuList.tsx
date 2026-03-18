'use client';

import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Menu } from '@/types';

interface Props {
  menus: Menu[];
  onReorder: (menuIds: string[]) => void;
  onEdit: (menu: Menu) => void;
  onDelete: (id: string) => void;
}

function SortableMenuItem({ menu, onEdit, onDelete }: { menu: Menu; onEdit: (m: Menu) => void; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-white border rounded p-3" data-testid={`menu-item-${menu.id}`}>
      <button {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600" aria-label="드래그하여 순서 변경">⠿</button>
      {menu.imageUrl && <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${menu.imageUrl}`} alt={menu.name} className="w-10 h-10 rounded object-cover" />}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{menu.name}</div>
        <div className="text-xs text-gray-500">{menu.price.toLocaleString()}원</div>
      </div>
      <button data-testid={`menu-edit-${menu.id}`} onClick={() => onEdit(menu)} className="text-xs text-blue-600 hover:underline">수정</button>
      <button data-testid={`menu-delete-${menu.id}`} onClick={() => onDelete(menu.id)} className="text-xs text-red-600 hover:underline">삭제</button>
    </div>
  );
}

export default function DraggableMenuList({ menus, onReorder, onEdit, onDelete }: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = menus.findIndex((m) => m.id === active.id);
    const newIndex = menus.findIndex((m) => m.id === over.id);
    const reordered = arrayMove(menus, oldIndex, newIndex);
    onReorder(reordered.map((m) => m.id));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={menus.map((m) => m.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2" data-testid="draggable-menu-list">
          {menus.map((m) => (
            <SortableMenuItem key={m.id} menu={m} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
