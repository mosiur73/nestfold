'use client';

import { FileSystemItem } from '@/types';
import TreeNode from './TreeNode';
import { FolderIcon } from './Icons';

interface SidebarProps {
  fileSystem: FileSystemItem;
  selectedFolderId: string;
  expandedFolderIds: string[];
  onSelectFolder: (id: string) => void;
  onToggleFolder: (id: string) => void;
  isOpen: boolean;
}

export default function Sidebar({
  fileSystem,
  selectedFolderId,
  expandedFolderIds,
  onSelectFolder,
  onToggleFolder,
  isOpen,
}: SidebarProps) {
  return (
    <>
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          flex flex-col w-64 bg-slate-900 border-r border-slate-700/60
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-slate-700/60">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center flex-shrink-0">
            <FolderIcon size={13} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-100 tracking-widest uppercase">
              Explorer
            </p>
          </div>
        </div>

        {/* Tree */}
        <div className="flex-1 overflow-y-auto py-2 px-1.5 space-y-0.5">
          <TreeNode
            item={fileSystem}
            selectedFolderId={selectedFolderId}
            expandedFolderIds={expandedFolderIds}
            onSelectFolder={onSelectFolder}
            onToggleFolder={onToggleFolder}
            depth={0}
          />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-700/60">
          <p className="text-[10px] text-slate-500 font-medium tracking-wide">
            Mini File Explorer
          </p>
          <p className="text-[10px] text-slate-600">Webbly Media</p>
        </div>
      </aside>
    </>
  );
}
