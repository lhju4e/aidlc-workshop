'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import type { TableCardData } from '@/types';
import OrderList from './OrderList';
import ConfirmModal from '@/components/common/ConfirmModal';

interface Props {
  data: TableCardData | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, status: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onCompleteTable: (tableId: string) => void;
}

export default function TableDetailModal({ data, isOpen, onClose, onStatusChange, onDeleteOrder, onCompleteTable }: Props) {
  const [confirmAction, setConfirmAction] = useState<{ type: 'delete' | 'complete'; id: string; message: string } | null>(null);

  if (!data) return null;

  const handleDelete = (orderId: string) => setConfirmAction({ type: 'delete', id: orderId, message: '정말 삭제하시겠습니까?' });
  const handleComplete = () => setConfirmAction({ type: 'complete', id: data.table.id, message: `테이블 ${data.table.tableNumber} 이용을 완료하시겠습니까?` });

  const handleConfirm = () => {
    if (!confirmAction) return;
    if (confirmAction.type === 'delete') onDeleteOrder(confirmAction.id);
    else onCompleteTable(confirmAction.id);
    setConfirmAction(null);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-40">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto" data-testid="table-detail-modal">
            <div className="p-4 border-b flex items-center justify-between">
              <Dialog.Title className="font-bold text-lg">테이블 {data.table.tableNumber}</Dialog.Title>
              <span className="text-sm text-gray-500">총 {data.totalAmount.toLocaleString()}원</span>
            </div>
            <div className="p-4">
              <OrderList orders={data.orders} onStatusChange={onStatusChange} onDelete={handleDelete} />
            </div>
            <div className="p-4 border-t flex justify-between">
              <button data-testid="table-complete-button" onClick={handleComplete} disabled={!data.hasActiveSession} className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900 disabled:opacity-50">
                이용 완료
              </button>
              <button data-testid="table-detail-close" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                닫기
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <ConfirmModal isOpen={!!confirmAction} title="확인" message={confirmAction?.message ?? ''} onConfirm={handleConfirm} onCancel={() => setConfirmAction(null)} />
    </>
  );
}
