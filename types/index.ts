export type ItemType = 'folder' | 'text';

export interface FileSystemItem {
  id: string;
  name: string;
  type: ItemType;
  children?: FileSystemItem[];
  content?: string;
}

export interface ModalState {
  isOpen: boolean;
  mode: 'create-folder' | 'create-file' | 'rename' | 'delete' | null;
  targetId?: string;
  initialValue?: string;
}
