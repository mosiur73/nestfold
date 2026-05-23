'use client';

import { useState } from 'react';
import { useFileSystem } from '@/hooks/useFileSystem';
import Sidebar from '@/components/Sidebar';
import MainPanel from '@/components/MainPanel';
import TextEditor from '@/components/TextEditor';
import Modal from '@/components/Modal';
import { MenuIcon, XIcon } from '@/components/Icons';
import { FileSystemItem } from '@/types';

export default function FileExplorerPage() {
  const {
    fileSystem,
    selectedFolderId,
    expandedFolderIds,
    selectedFolder,
    openFile,
    modal,
    createItem,
    renameItem,
    deleteItem,
    updateFileContent,
    toggleFolder,
    selectFolder,
    openFileFn,
    closeFile,
    openModal,
    closeModal,
  } = useFileSystem();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── MODAL CONFIRM ────────────────────────────────────────────────────────
  function handleModalConfirm(value: string) {
    const { mode, targetId } = modal;
    if (mode === 'create-folder' && targetId) {
      createItem(targetId, value || 'Untitled Folder', 'folder');
    } else if (mode === 'create-file' && targetId) {
      const name = value.endsWith('.txt') ? value : `${value}.txt`;
      createItem(targetId, name, 'text');
    } else if (mode === 'rename' && targetId) {
      renameItem(targetId, value);
    } else if (mode === 'delete' && targetId) {
      deleteItem(targetId);
    }
  }

  // ── TRIGGER MODALS ───────────────────────────────────────────────────────
  function handleCreateFolder() {
    openModal('create-folder', selectedFolderId);
  }
  function handleCreateFile() {
    openModal('create-file', selectedFolderId);
  }
  function handleRename(item: FileSystemItem) {
    openModal('rename', item.id, item.name);
  }
  function handleDelete(item: FileSystemItem) {
    openModal('delete', item.id, item.name);
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* App Header */}
      <header className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 border-b border-slate-700 flex-shrink-0 z-40">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
        </button>

        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm font-semibold text-slate-200 tracking-wide">
            Mini File Explorer
          </span>
        </div>

        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline select-none">
          Webbly Media
        </span>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0 relative">
        <Sidebar
          fileSystem={fileSystem}
          selectedFolderId={selectedFolderId}
          expandedFolderIds={expandedFolderIds}
          onSelectFolder={(id) => {
            selectFolder(id);
            setSidebarOpen(false);
          }}
          onToggleFolder={toggleFolder}
          isOpen={sidebarOpen}
        />

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <main className="flex-1 flex flex-col min-h-0 min-w-0">
          {openFile ? (
            <TextEditor
              file={openFile}
              onSave={(content) => updateFileContent(openFile.id, content)}
              onClose={closeFile}
            />
          ) : (
            <MainPanel
              fileSystem={fileSystem}
              selectedFolder={selectedFolder}
              selectedFolderId={selectedFolderId}
              onSelectFolder={selectFolder}
              onOpenFile={openFileFn}
              onCreateFolder={handleCreateFolder}
              onCreateFile={handleCreateFile}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>

      {/* Modal */}
      <Modal modal={modal} onClose={closeModal} onConfirm={handleModalConfirm} />
    </div>
  );
}
