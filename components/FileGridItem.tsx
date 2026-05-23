'use client';

import { useState } from 'react';
import { FileSystemItem } from '@/types';
import { FolderIcon, FileTextIcon, PencilIcon, TrashIcon } from './Icons';

interface FileGridItemProps {
  item: FileSystemItem;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export default function FileGridItem({
  item,
  onOpen,
  onRename,
  onDelete,
}: FileGridItemProps) {
  const [hovered, setHovered] = useState(false);
  const isFolder = item.type === 'folder';

  return (
    <div
      className="relative group flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer
        bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-50
        transition-all duration-150 select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={onOpen}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`${isFolder ? 'Folder' : 'File'}: ${item.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen();
      }}
    >
      {/* Icon */}
      <div className="relative">
        {isFolder ? (
          <div className="w-14 h-14 flex items-center justify-center">
            <FolderIcon size={48} className="text-amber-400 drop-shadow-sm" />
          </div>
        ) : (
          <div className="w-14 h-14 flex items-center justify-center">
            <div className="relative">
              <FileTextIcon size={44} className="text-indigo-400 drop-shadow-sm" />
            </div>
          </div>
        )}

        {/* Item count badge for folders */}
        {isFolder && item.children && item.children.length > 0 && (
          <span className="absolute -bottom-0.5 -right-1 text-[9px] font-bold bg-slate-700 text-white rounded-full px-1.5 py-0.5 leading-none">
            {item.children.length}
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className="w-full text-center text-xs font-medium text-slate-700 truncate leading-snug px-1"
        title={item.name}
      >
        {item.name}
      </span>

      {/* Type label */}
      <span className="text-[10px] text-slate-400 -mt-1">
        {isFolder ? 'Folder' : 'Text file'}
      </span>

      {/* Action buttons (visible on hover) */}
      {hovered && (
        <div
          className="absolute top-1.5 right-1.5 flex gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename();
            }}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-colors"
            title="Rename"
            aria-label={`Rename ${item.name}`}
          >
            <PencilIcon size={11} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 shadow-sm transition-colors"
            title="Delete"
            aria-label={`Delete ${item.name}`}
          >
            <TrashIcon size={11} />
          </button>
        </div>
      )}
    </div>
  );
}
