'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileSystemItem, ItemType, ModalState } from '@/types';
import { initialFileSystem } from '@/lib/initialData';
import { findItemById } from '@/lib/fileSystemUtils';

const STORAGE_KEY = 'mini-file-explorer-v1';

let _idSeed = 1000;
function generateId(): string {
  return `item-${++_idSeed}-${Date.now()}`;
}

export function useFileSystem() {
  const [fileSystem, setFileSystem] = useState<FileSystemItem>(initialFileSystem);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('root');
  const [openFileId, setOpenFileId] = useState<string | null>(null);
  const [expandedFolderIds, setExpandedFolderIds] = useState<string[]>(['root']);
  const [modal, setModal] = useState<ModalState>({ isOpen: false, mode: null });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFileSystem(JSON.parse(stored));
      } catch {
        // fall back to initialData
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fileSystem));
    }
  }, [fileSystem, hydrated]);

  const selectedFolder = findItemById(fileSystem, selectedFolderId);
  const openFile = openFileId ? findItemById(fileSystem, openFileId) : null;

  // ── CREATE ───────────────────────────────────────────────────────────────
  const createItem = useCallback(
    (parentId: string, name: string, type: ItemType) => {
      const newItem: FileSystemItem = {
        id: generateId(),
        name: name.trim(),
        type,
        ...(type === 'folder' ? { children: [] } : { content: '' }),
      };

      setFileSystem((prev) => {
        const addToParent = (item: FileSystemItem): FileSystemItem => {
          if (item.id === parentId) {
            return { ...item, children: [...(item.children ?? []), newItem] };
          }
          if (item.children) {
            return { ...item, children: item.children.map(addToParent) };
          }
          return item;
        };
        return addToParent(prev);
      });
    },
    []
  );

  // ── RENAME ───────────────────────────────────────────────────────────────
  const renameItem = useCallback((id: string, newName: string) => {
    setFileSystem((prev) => {
      const rename = (item: FileSystemItem): FileSystemItem => {
        if (item.id === id) return { ...item, name: newName.trim() };
        if (item.children)
          return { ...item, children: item.children.map(rename) };
        return item;
      };
      return rename(prev);
    });
  }, []);

  // ── DELETE ───────────────────────────────────────────────────────────────
  const deleteItem = useCallback((id: string) => {
    setFileSystem((prev) => {
      const remove = (item: FileSystemItem): FileSystemItem => {
        if (item.children) {
          return {
            ...item,
            children: item.children.filter((c) => c.id !== id).map(remove),
          };
        }
        return item;
      };
      return remove(prev);
    });
    setOpenFileId((prev) => (prev === id ? null : prev));
    setSelectedFolderId((prev) => (prev === id ? 'root' : prev));
    setExpandedFolderIds((prev) => prev.filter((fid) => fid !== id));
  }, []);

  // ── FILE CONTENT ─────────────────────────────────────────────────────────
  const updateFileContent = useCallback((id: string, content: string) => {
    setFileSystem((prev) => {
      const update = (item: FileSystemItem): FileSystemItem => {
        if (item.id === id) return { ...item, content };
        if (item.children)
          return { ...item, children: item.children.map(update) };
        return item;
      };
      return update(prev);
    });
  }, []);

  // ── NAVIGATION ───────────────────────────────────────────────────────────
  const toggleFolder = useCallback((id: string) => {
    setExpandedFolderIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }, []);

  const selectFolder = useCallback((id: string) => {
    setSelectedFolderId(id);
    setOpenFileId(null);
    setExpandedFolderIds((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  }, []);

  const openFileFn = useCallback((id: string) => {
    setOpenFileId(id);
  }, []);

  const closeFile = useCallback(() => {
    setOpenFileId(null);
  }, []);

  // ── MODAL ────────────────────────────────────────────────────────────────
  const openModal = useCallback(
    (
      mode: ModalState['mode'],
      targetId?: string,
      initialValue?: string
    ) => {
      setModal({ isOpen: true, mode, targetId, initialValue });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, mode: null });
  }, []);

  return {
    fileSystem,
    selectedFolderId,
    openFileId,
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
  };
}
