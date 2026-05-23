'use client';

import { FileSystemItem } from '@/types';
import { ChevronRightIcon, ChevronDownIcon, FolderIcon, FolderOpenIcon } from './Icons';

interface TreeNodeProps {
  item: FileSystemItem;
  selectedFolderId: string;
  expandedFolderIds: string[];
  onSelectFolder: (id: string) => void;
  onToggleFolder: (id: string) => void;
  depth: number;
}

export default function TreeNode({
  item,
  selectedFolderId,
  expandedFolderIds,
  onSelectFolder,
  onToggleFolder,
  depth,
}: TreeNodeProps) {
  if (item.type !== 'folder') return null;

  const isExpanded = expandedFolderIds.includes(item.id);
  const isSelected = selectedFolderId === item.id;
  const hasSubFolders = item.children?.some((c) => c.type === 'folder') ?? false;

  function handleClick() {
    onSelectFolder(item.id);
    if (hasSubFolders) {
      onToggleFolder(item.id);
    }
  }

  function handleChevronClick(e: React.MouseEvent) {
    e.stopPropagation();
    onToggleFolder(item.id);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        title={item.name}
        className={`group w-full flex items-center gap-1.5 py-1.5 pr-2 rounded-lg text-sm transition-all duration-100 ${
          isSelected
            ? 'bg-blue-600 text-white'
            : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
        }`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        {/* Chevron toggle */}
        <span
          onClick={hasSubFolders ? handleChevronClick : undefined}
          className={`flex-shrink-0 w-4 h-4 flex items-center justify-center rounded transition-colors ${
            hasSubFolders
              ? isSelected
                ? 'hover:bg-blue-500'
                : 'hover:bg-slate-600'
              : ''
          }`}
        >
          {hasSubFolders ? (
            isExpanded ? (
              <ChevronDownIcon size={12} />
            ) : (
              <ChevronRightIcon size={12} />
            )
          ) : (
            <span className="w-3" />
          )}
        </span>

        {/* Folder icon */}
        {isExpanded ? (
          <FolderOpenIcon
            size={15}
            className={isSelected ? 'text-amber-300' : 'text-amber-400'}
          />
        ) : (
          <FolderIcon
            size={15}
            className={isSelected ? 'text-amber-300' : 'text-amber-500'}
          />
        )}

        {/* Name */}
        <span className="truncate leading-none">{item.name}</span>
      </button>

      {/* Children (only folders shown in sidebar) */}
      {isExpanded && item.children && (
        <div>
          {item.children
            .filter((c) => c.type === 'folder')
            .map((child) => (
              <TreeNode
                key={child.id}
                item={child}
                selectedFolderId={selectedFolderId}
                expandedFolderIds={expandedFolderIds}
                onSelectFolder={onSelectFolder}
                onToggleFolder={onToggleFolder}
                depth={depth + 1}
              />
            ))}
        </div>
      )}
    </div>
  );
}
