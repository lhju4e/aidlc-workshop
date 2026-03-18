'use client';

import { Dialog } from '@headlessui/react';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title, message, confirmLabel = '확인', onConfirm, onCancel }: Props) {
  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button data-testid="confirm-modal-cancel" onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
              취소
            </button>
            <button data-testid="confirm-modal-confirm" onClick={onConfirm} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              {confirmLabel}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
