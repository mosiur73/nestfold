import { FileSystemItem } from '@/types';

export function findItemById(
  root: FileSystemItem,
  id: string
): FileSystemItem | null {
  if (root.id === id) return root;
  if (root.children) {
    for (const child of root.children) {
      const found = findItemById(child, id);
      if (found) return found;
    }
  }
  return null;
}

export function getItemPath(
  root: FileSystemItem,
  targetId: string
): FileSystemItem[] {
  function search(
    item: FileSystemItem,
    path: FileSystemItem[]
  ): FileSystemItem[] | null {
    const newPath = [...path, item];
    if (item.id === targetId) return newPath;
    if (item.children) {
      for (const child of item.children) {
        const result = search(child, newPath);
        if (result) return result;
      }
    }
    return null;
  }
  return search(root, []) ?? [root];
}
