import React from 'react';
import { User, ExternalLink, Info, Clock, Star } from 'lucide-react';
import { Book } from '../../types/book';
import { calculateReadingTime } from '../../lib/api';

interface BookMetadataProps {
    book: Book;
    isEditing: boolean;
    editData: Book;
    onUpdateEditData: (newData: Partial<Book>) => void;
    progressRef: React.RefObject<HTMLDivElement>;
}

const BookMetadata: React.FC<BookMetadataProps> = ({
    book,
    isEditing,
    editData,
    onUpdateEditData,
    progressRef
}) => {
    const currentBook = isEditing ? editData : book;

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                {book.year && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded">
                        {book.year}
                    </span>
                )}
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">My Rating:</span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < (book.userRating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-px h-3 bg-gray-200 dark:border-gray-800"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Goodreads:</span>
                        <span className="text-gray-900 dark:text-gray-100 flex items-center gap-1">
                            {book.averageRating || "N/A"}
                            <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                        </span>
                    </div>
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-gray-900 dark:text-gray-100 italic leading-tight">
                {book.title}
            </h1>

            <div className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900 dark:text-gray-100">{book.author}</span>
                </div>
                <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    {isEditing ? (
                        <select
                            value={editData.status}
                            onChange={(e) => onUpdateEditData({ status: e.target.value as 'read' | 'reading' | 'wanna-read' | 'end' | 'following' })}
                            className="bg-gray-50 dark:bg-gray-800 border-none outline-none font-bold text-gray-900 dark:text-gray-100 rounded px-1 focus:ring-1 focus:ring-blue-500"
                        >
                            {book.collection === 'manga' ? (
                                <>
                                    <option value="following">Following</option>
                                    <option value="end">End</option>
                                    <option value="wanna-read">Wanna Read</option>
                                </>
                            ) : (
                                <>
                                    <option value="reading">Reading</option>
                                    <option value="read">Read</option>
                                    <option value="wanna-read">Wanna Read</option>
                                </>
                            )}
                        </select>
                    ) : (
                        <span className="text-gray-900 dark:text-gray-100 italic capitalize">{book.status}</span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <a href={`https://www.goodreads.com/book/show/${book.id}`} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Goodreads</a>
                </div>
                <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span>{book.tags.slice(0, 2).join(', ')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{calculateReadingTime(currentBook)}</span>
                </div>
                {(currentBook.status === 'reading' || currentBook.status === 'following') && (
                    <div
                        ref={progressRef}
                        className="pt-2"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Reading Progress</span>
                            {isEditing ? (
                                <div className="flex items-center gap-1">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={editData.progress || 0}
                                        onChange={(e) => onUpdateEditData({ progress: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                                        className="w-12 bg-gray-50 dark:bg-gray-800 border-none outline-none text-right font-bold text-gray-900 dark:text-gray-100 rounded px-1 focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-400 font-bold">%</span>
                                </div>
                            ) : (
                                <span className="text-gray-900 dark:text-gray-100 font-bold">{book.progress || 0}%</span>
                            )}
                        </div>
                        {isEditing ? (
                            <div className="group/progress relative">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={editData.progress || 0}
                                    onChange={(e) => onUpdateEditData({ progress: parseInt(e.target.value) })}
                                    className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    Scroll to adjust
                                </div>
                            </div>
                        ) : (
                            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${book.progress || 0}%` }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookMetadata;
