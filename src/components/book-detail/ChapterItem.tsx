import React from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';
import { Chapter } from '../../types/book';

interface ChapterItemProps {
    chapter: Chapter;
    isEditing: boolean;
    isExpanded: boolean;
    onToggle: (id: string) => void;
    onUpdate: (id: string, field: 'title' | 'content', value: string) => void;
    onRemove: (id: string) => void;
}

const ChapterItem: React.FC<ChapterItemProps> = ({
    chapter,
    isEditing,
    isExpanded,
    onToggle,
    onUpdate,
    onRemove
}) => {
    return (
        <div
            id={chapter.id}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900 shadow-sm"
        >
            <div className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <div className="flex-1 flex items-center gap-4">
                    {isEditing ? (
                        <>
                            <input
                                className="flex-1 bg-transparent font-black text-sm uppercase tracking-wider outline-none focus:text-blue-600"
                                value={chapter.title}
                                onChange={(e) => onUpdate(chapter.id, 'title', e.target.value)}
                            />
                            <button
                                onClick={() => onRemove(chapter.id)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => onToggle(chapter.id)}
                            className="flex-1 text-left flex items-center justify-between"
                        >
                            <span className="font-black text-sm uppercase tracking-wider">{chapter.title}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    )}
                </div>
            </div>
            <div className={`transition-all duration-300 ease-in-out ${isEditing || isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-8 prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {isEditing ? (
                        <textarea
                            className="w-full bg-transparent p-0 outline-none focus:ring-0 resize-y min-h-[200px] font-medium leading-relaxed"
                            value={chapter.content}
                            onChange={(e) => onUpdate(chapter.id, 'content', e.target.value)}
                        />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChapterItem;
