import React from 'react';
import { List } from 'lucide-react';
import { Chapter } from '../../types/book';

interface TableOfContentsProps {
    chapters: Chapter[];
    onScrollTo: (id: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ chapters, onScrollTo }) => {
    if (!chapters || chapters.length === 0) return null;

    return (
        <div className="sticky top-24 space-y-8 z-40">
            <div className="p-1 border border-gray-200 dark:border-gray-800 rounded shadow-sm overflow-hidden bg-[var(--bg-primary)]">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
                    <List className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-gray-100">Mục Lục</span>
                </div>
                <div className="py-2">
                    {chapters.map((chapter, index) => (
                        <button
                            key={chapter.id}
                            onClick={() => onScrollTo(chapter.id)}
                            className="w-full text-left px-4 py-1.5 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors flex gap-3 text-gray-700 dark:text-gray-300"
                        >
                            <span className="opacity-50 w-4">{index + 1}</span>
                            <span className="truncate">
                                {chapter.title.includes('.')
                                    ? chapter.title.split('.').slice(1).join('.').trim()
                                    : chapter.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableOfContents;
