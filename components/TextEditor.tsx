'use client';

import { useState, useEffect, useCallback } from 'react';
import { FileSystemItem } from '@/types';
import { ArrowLeftIcon, SaveIcon, FileTextIcon, CheckIcon } from './Icons';

interface TextEditorProps {
  file: FileSystemItem;
  onSave: (content: string) => void;
  onClose: () => void;
}

export default function TextEditor({ file, onSave, onClose }: TextEditorProps) {
  const [content, setContent] = useState(file.content ?? '');
  const [saved, setSaved] = useState(true);
  const [justSaved, setJustSaved] = useState(false);

  // Sync when file changes
  useEffect(() => {
    setContent(file.content ?? '');
    setSaved(true);
  }, [file.id, file.content]);

  const handleChange = (value: string) => {
    setContent(value);
    setSaved(false);
  };

  const handleSave = useCallback(() => {
    onSave(content);
    setSaved(true);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }, [content, onSave]);

  // Ctrl+S shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSave]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const lineCount = content ? content.split('\n').length : 1;
  const charCount = content.length;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-50">
      {/* Editor toolbar */}
      <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-slate-200 flex-shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          title="Back to folder"
        >
          <ArrowLeftIcon size={15} />
          <span className="hidden sm:inline text-xs font-medium">Back</span>
        </button>

        <div className="h-4 w-px bg-slate-200" />

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FileTextIcon size={15} className="text-indigo-400 flex-shrink-0" />
          <span className="text-sm font-semibold text-slate-800 truncate">{file.name}</span>
          {!saved && (
            <span className="text-[10px] font-medium text-amber-500 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 flex-shrink-0">
              Unsaved
            </span>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saved}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            justSaved
              ? 'bg-green-500 text-white'
              : saved
              ? 'bg-slate-100 text-slate-400 cursor-default'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
          }`}
          title="Save (Ctrl+S)"
        >
          {justSaved ? (
            <>
              <CheckIcon size={13} />
              <span className="hidden sm:inline">Saved!</span>
            </>
          ) : (
            <>
              <SaveIcon size={13} />
              <span className="hidden sm:inline">Save</span>
            </>
          )}
        </button>
      </div>

      {/* Textarea */}
      <div className="flex-1 flex flex-col min-h-0 p-5">
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Start typing..."
            spellCheck={false}
            className="flex-1 w-full resize-none p-5 text-sm font-mono text-slate-800 placeholder-slate-300
              focus:outline-none leading-relaxed bg-transparent"
            style={{ minHeight: '200px' }}
            aria-label={`Edit ${file.name}`}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-5 px-5 py-2 bg-white border-t border-slate-200 flex-shrink-0">
        <span className="text-[11px] text-slate-400">
          {lineCount} line{lineCount !== 1 ? 's' : ''}
        </span>
        <span className="text-[11px] text-slate-400">
          {wordCount} word{wordCount !== 1 ? 's' : ''}
        </span>
        <span className="text-[11px] text-slate-400">
          {charCount} char{charCount !== 1 ? 's' : ''}
        </span>
        <span className="ml-auto text-[11px] text-slate-400">
          {saved ? 'All changes saved' : 'Unsaved changes — press Ctrl+S to save'}
        </span>
      </div>
    </div>
  );
}
