import { FileSystemItem } from '@/types';

export const initialFileSystem: FileSystemItem = {
  id: 'root',
  name: 'My Files',
  type: 'folder',
  children: [
    {
      id: 'f1',
      name: 'Documents',
      type: 'folder',
      children: [
        {
          id: 'f1-1',
          name: 'Work',
          type: 'folder',
          children: [
            {
              id: 't1-1-1',
              name: 'project-brief.txt',
              type: 'text',
              content:
                'Project Brief — Mini File Explorer\n\nClient: Webbly Media (Sweden)\n\nObjective:\nBuild a fully functional Mini File Explorer web app that allows users to manage folders and files in a hierarchical tree structure.\n\nTech Stack:\n- Next.js (React)\n- TypeScript\n- Tailwind CSS\n\nDeadline: 23 May 2026',
            },
          ],
        },
        {
          id: 't1-1',
          name: 'readme.txt',
          type: 'text',
          content:
            'Getting Started\n===============\n\nWelcome to Mini File Explorer!\n\nHow to use:\n• Click any folder in the sidebar to view its contents\n• Use the toolbar buttons to create new folders or files\n• Hover over any item to see rename and delete options\n• Click a text file to open and edit it\n• Changes are saved automatically to localStorage',
        },
        {
          id: 't1-2',
          name: 'meeting-notes.txt',
          type: 'text',
          content:
            'Meeting Notes — May 2026\n\nAttendees: Dev team, Design team\n\nAgenda:\n1. Review project requirements\n2. Agree on tech stack\n3. Set milestones\n\nDecisions:\n• Framework: Next.js with TypeScript\n• Styling: Tailwind CSS\n• State: React hooks + localStorage\n• Deadline: 23 May 5:00 PM',
        },
      ],
    },
    {
      id: 'f2',
      name: 'Projects',
      type: 'folder',
      children: [
        {
          id: 'f2-1',
          name: 'file-explorer',
          type: 'folder',
          children: [
            {
              id: 't2-1-1',
              name: 'todo.txt',
              type: 'text',
              content:
                'Development Checklist\n\n[x] Initialize Next.js project\n[x] Configure TypeScript\n[x] Set up Tailwind CSS\n[x] Define data types\n[x] Create initial mock data\n[x] Build useFileSystem hook\n[x] Implement sidebar tree view\n[x] Implement main panel grid\n[x] Add CRUD operations\n[x] Build text editor\n[x] Add localStorage persistence\n[ ] Write unit tests',
            },
          ],
        },
        {
          id: 't2-1',
          name: 'ideas.txt',
          type: 'text',
          content:
            'Future Project Ideas\n\n1. Task Manager\n   — Kanban board layout\n   — Priority levels and due dates\n   — Team collaboration\n\n2. Note App\n   — Rich text editor\n   — Tags and search\n   — Export to PDF\n\n3. Calendar\n   — Event scheduling\n   — Recurring events\n   — Reminder notifications',
        },
      ],
    },
    {
      id: 'f3',
      name: 'Personal',
      type: 'folder',
      children: [
        {
          id: 't3-1',
          name: 'journal.txt',
          type: 'text',
          content:
            'Journal — May 2026\n\nMay 23, 2026\nStarted working on the file explorer task today. The requirements are clear: build a functional, clean UI with React, TypeScript, and Tailwind.\n\nFocusing on getting the tree structure and state management right first, then polishing the UI.',
        },
      ],
    },
    {
      id: 't-root-1',
      name: 'welcome.txt',
      type: 'text',
      content:
        'Hello, welcome to Mini File Explorer!\n\nThis app lets you:\n• Browse a folder hierarchy in the left sidebar\n• View folder contents in the main panel\n• Create, rename, and delete folders and files\n• Open and edit text files inline\n• All data persists in your browser via localStorage\n\nBuilt with Next.js + TypeScript + Tailwind CSS.',
    },
  ],
};
