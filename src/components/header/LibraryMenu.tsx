import React from 'react';
import { Link } from 'react-router-dom';
import { Library, ChevronDown, Trophy, BookOpen, Book, Gamepad2, BrainCircuit } from 'lucide-react';

const LibraryMenu: React.FC = () => {
    return (
        <div className="group h-full flex items-center px-4 relative cursor-pointer">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Library className="w-4 h-4" />
                <span>Mike library</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white dark:bg-gray-900 border border-t-0 border-gray-100 dark:border-gray-800 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 rounded-b-2xl overflow-hidden grid grid-cols-2">
                <div className="p-6 border-r border-gray-100 dark:border-gray-800">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4 flex items-center gap-2">
                        <Trophy className="w-3 h-3" /> Goodreads Challenges
                    </h3>
                    <div className="space-y-3">
                        <a href="https://www.goodreads.com/challenges/11680-2026-reading-challenge" target="_blank" rel="noreferrer" className="block text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">2026 Reading Challenge</a>
                        <a href="https://www.goodreads.com/user/year_in_books/2025/183266525" target="_blank" rel="noreferrer" className="block text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">2025 Year In Books</a>
                        <a href="https://www.goodreads.com/user/year_in_books/2024/183266525" target="_blank" rel="noreferrer" className="block text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">2024 Year In Books</a>
                    </div>
                </div>
                <div className="p-6 bg-gray-50/50 dark:bg-gray-800/20">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4 flex items-center gap-2">
                        <BookOpen className="w-3 h-3" /> Categories
                    </h3>
                    <div className="space-y-4">
                        <Link to="/myreading" className="flex items-center gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover/item:border-blue-600 transition-colors">
                                <Book className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600" />
                            </div>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Normal books</span>
                        </Link>
                        <Link to="/myreading/manga" className="flex items-center gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover/item:border-blue-600 transition-colors">
                                <Gamepad2 className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600" />
                            </div>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Manga/Manhwa</span>
                        </Link>
                        <Link to="/myreading/specialized" className="flex items-center gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover/item:border-blue-600 transition-colors">
                                <BrainCircuit className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600" />
                            </div>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Specialized Books</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryMenu;
