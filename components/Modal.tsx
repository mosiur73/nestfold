'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ModalState } from '@/types';
import { XIcon, FolderIcon, FileTextIcon, PencilIcon, TrashIcon } from './Icons';

interface ModalProps {
  modal: ModalState;
  onClose: () => void;
  onConfirm: (value: string) => void;
}

const MODAL_CONFIG = {
  'create-folder': {
    title: 'New Folder',
    label: 'Folder name',
    placeholder: 'Untitled Folder',
    confirmText: 'Create',
    icon: <FolderIcon size={20} className="text-amber-500" />,
  },
  'create-file': {
    title: 'New Text File',
    label: 'File name',
    placeholder: 'untitled.txt',
    confirmText: 'Create',
    icon: <FileTextIcon size={20} className="text-indigo-500" />,
  },
  rename: {
    title: 'Rename',
    label: 'New name',
    placeholder: '',
    confirmText: 'Rename',
    icon: <PencilIcon size={20} className="text-blue-500" />,
  },
  delete: {
    title: 'Delete Item',
    label: '',
    placeholder: '',
    confirmText: 'Delete',
    icon: <TrashIcon size={20} className="text-red-500" />,
  },
};

export default function Modal({ modal, onClose, onConfirm }: ModalProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modal.isOpen) {
      setValue(modal.initialValue ?? '');
      setTimeout(() => inputRef.current?.select(), 50);
    }
  }, [modal.isOpen, modal.initialValue]);

  if (!modal.isOpen || !modal.mode) return null;

  const config = MODAL_CONFIG[modal.mode];
  const isDelete = modal.mode === 'delete';

  function handleConfirm() {
    if (isDelete) {
      onConfirm('');
    } else {
      if (!value.trim()) return;
      onConfirm(value.trim());
    }
    onClose();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-sm bg-white rounded-xl shadow-2xl ring-1 ring-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            {config.icon}
            <h2 id="modal-title" className="text-base font-semibold text-slate-800">
              {config.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {isDelete ? (
            <p className="text-sm text-slate-600">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-slate-800">
                &ldquo;{modal.initialValue}&rdquo;
              </span>
              ? This action cannot be undone.
            </p>
          ) : (
            <div>
              <label
                htmlFor="modal-input"
                className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide"
              >
                {config.label}
              </label>
              <input
                id="modal-input"
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={config.placeholder}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isDelete && !value.trim()}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isDelete
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            {config.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
