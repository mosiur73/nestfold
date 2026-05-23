'use client';

import { FileSystemItem } from '@/types';
import { getItemPath } from '@/lib/fileSystemUtils';
import FileGridItem from './FileGridItem';
import {
  PlusIcon,
  FolderIcon,
  FileTextIcon,
  HomeIcon,
  ChevronRightIcon,
} from './Icons';

interface MainPanelProps {
  fileSystem: FileSystemItem;
  selectedFolder: FileSystemItem | null;
  selectedFolderId: string;
  onSelectFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
  onCreateFolder: () => void;
  onCreateFile: () => void;
  onRename: (item: FileSystemItem) => void;
  onDelete: (item: FileSystemItem) => void;
}

export default function MainPanel({
  fileSystem,
  selectedFolder,
  selectedFolderId,
  onSelectFolder,
  onOpenFile,
  onCreateFolder,
  onCreateFile,
  onRename,
  onDelete,
}: MainPanelProps) {
  const breadcrumb = getItemPath(fileSystem, selectedFolderId);
  const items = selectedFolder?.children ?? [];

  const folders = items.filter((i) => i.type === 'folder');
  const files = items.filter((i) => i.type === 'text');

  function handleOpen(item: FileSystemItem) {
    if (item.type === 'folder') {
      onSelectFolder(item.id);
    } else {
      onOpenFile(item.id);
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-50">
      {/* Top toolbar */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 bg-white border-b border-slate-200 flex-shrink-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm min-w-0 flex-1" aria-label="Breadcrumb">
          <button
            onClick={() => onSelectFolder('root')}
            className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors flex-shrink-0"
            title="Home"
          >
            <HomeIcon size={14} />
          </button>
          {breadcrumb.slice(1).map((segment, i) => (
            <span key={segment.id} className="flex items-center gap-1 min-w-0">
              <ChevronRightIcon size={12} className="text-slate-300 flex-shrink-0" />
              {i === breadcrumb.length - 2 ? (
                <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                  {segment.name}
                </span>
              ) : (
                <button
                  onClick={() => onSelectFolder(segment.id)}
                  className="text-slate-500 hover:text-blue-600 transition-colors truncate max-w-[120px]"
                >
                  {segment.name}
                </button>
              )}
            </span>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onCreateFolder}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="New Folder"
          >
            <PlusIcon size={13} />
            <FolderIcon size={13} className="text-amber-500" />
            <span className="hidden sm:inline">New Folder</span>
          </button>
          <button
            onClick={onCreateFile}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            title="New File"
          >
            <PlusIcon size={13} />
            <FileTextIcon size={13} />
            <span className="hidden sm:inline">New File</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-5">
        {items.length === 0 ? (
          <EmptyState onCreateFolder={onCreateFolder} onCreateFile={onCreateFile} />
        ) : (
          <div className="space-y-6">
            {/* Folders section */}
            {folders.length > 0 && (
              <section>
                <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Folders ({folders.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {folders.map((item) => (
                    <FileGridItem
                      key={item.id}
                      item={item}
                      onOpen={() => handleOpen(item)}
                      onRename={() => onRename(item)}
                      onDelete={() => onDelete(item)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Files section */}
            {files.length > 0 && (
              <section>
                <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Files ({files.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {files.map((item) => (
                    <FileGridItem
                      key={item.id}
                      item={item}
                      onOpen={() => handleOpen(item)}
                      onRename={() => onRename(item)}
                      onDelete={() => onDelete(item)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 px-5 py-2 bg-white border-t border-slate-200 flex-shrink-0">
        <span className="text-[11px] text-slate-400">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </span>
        {folders.length > 0 && (
          <span className="text-[11px] text-slate-400">
            {folders.length} folder{folders.length !== 1 ? 's' : ''}
          </span>
        )}
        {files.length > 0 && (
          <span className="text-[11px] text-slate-400">
            {files.length} file{files.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}

function EmptyState({
  onCreateFolder,
  onCreateFile,
}: {
  onCreateFolder: () => void;
  onCreateFile: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <FolderIcon size={32} className="text-slate-300" />
      </div>
      <h3 className="text-sm font-semibold text-slate-500 mb-1">This folder is empty</h3>
      <p className="text-xs text-slate-400 mb-5">Create a folder or file to get started.</p>
      <div className="flex gap-2">
        <button
          onClick={onCreateFolder}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <PlusIcon size={12} />
          New Folder
        </button>
        <button
          onClick={onCreateFile}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <PlusIcon size={12} />
          New File
        </button>
      </div>
    </div>
  );
}
