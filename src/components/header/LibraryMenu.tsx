import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Library,
    ChevronDown,
    Trophy,
    BookOpen,
    Book,
    Gamepad2,
    BrainCircuit,
    PenTool,
    ChevronRight,
    ExternalLink
} from 'lucide-react';

const LibraryMenu: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'challenges' | 'reading' | 'writing'>('reading');

    return (
        <div className="group h-full flex items-center px-4 py-6 cursor-pointer">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Library className="w-4 h-4" />
                <span>Mike library</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </div>

            {/* Mega Menu Container */}
            <div className="absolute top-full left-0 w-full bg-[var(--bg-primary)] border border-gray-100 dark:border-white/10 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 rounded-b-2xl overflow-hidden min-h-[450px] flex z-50">
                <div className="absolute top-0 left-0 w-full h-2 -translate-y-full bg-transparent" /> {/* Precise hover bridge */}

                {/* Sidebar */}
                <div className="w-64 bg-gray-50/50 dark:bg-black/20 border-r border-gray-100 dark:border-white/5 p-4 flex flex-col gap-2">
                    <button
                        onMouseEnter={() => setActiveTab('challenges')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'challenges' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-100/50 dark:hover:bg-white/5'}`}
                    >
                        <div className="flex items-center gap-3">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-tight">Challenges</span>
                        </div>
                        {activeTab === 'challenges' && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <button
                        onMouseEnter={() => setActiveTab('reading')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'reading' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-100/50 dark:hover:bg-white/5'}`}
                    >
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-tight">Reading</span>
                        </div>
                        {activeTab === 'reading' && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <button
                        onMouseEnter={() => setActiveTab('writing')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'writing' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-100/50 dark:hover:bg-white/5'}`}
                    >
                        <div className="flex items-center gap-3">
                            <PenTool className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-tight">Writing</span>
                        </div>
                        {activeTab === 'writing' && <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    {activeTab === 'challenges' && (
                        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Goodreads Challenges</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <a href="https://www.goodreads.com/challenges/11680-2026-reading-challenge" target="_blank" rel="noreferrer" className="group/link p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <Trophy className="w-5 h-5 text-blue-600" />
                                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover/link:text-blue-600" />
                                    </div>
                                    <span className="text-base font-bold text-gray-900 dark:text-white block">2026 Reading Challenge</span>
                                    <p className="text-xs text-gray-500 mt-1">Track my progress for the current year</p>
                                </a>
                                <div className="space-y-4 pt-2">
                                    <a href="https://www.goodreads.com/user/year_in_books/2025/183266525" target="_blank" rel="noreferrer" className="flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                                        <span>2025 Year In Books</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                    <a href="https://www.goodreads.com/user/year_in_books/2024/183266525" target="_blank" rel="noreferrer" className="flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                                        <span>2024 Year In Books</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reading' && (
                        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Explore My Library</h3>
                            <div className="grid grid-cols-3 gap-6">
                                <Link to="/myreading/books" className="group/item flex flex-col gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                        <Book className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <span className="text-base font-bold text-gray-900 dark:text-white block">Normal books</span>
                                        <p className="text-xs text-gray-500 mt-1">Fiction and non-fiction collection</p>
                                    </div>
                                </Link>

                                <Link to="/myreading/manga" className="group/item flex flex-col gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
                                        <Gamepad2 className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <span className="text-base font-bold text-gray-900 dark:text-white block">Manga/Manhwa</span>
                                        <p className="text-xs text-gray-500 mt-1">Japanese and Korean comics</p>
                                    </div>
                                </Link>

                                <Link to="/myreading/specialized" className="group/item flex flex-col gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                                        <BrainCircuit className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="text-base font-bold text-gray-900 dark:text-white block">Specialized Books</span>
                                        <p className="text-xs text-gray-500 mt-1">Technical and niche knowledge</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}

                    {activeTab === 'writing' && (
                        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Thoughts & Notes</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <Link to="/writing/rambling" className="group/item flex items-center gap-6 p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                                        <PenTool className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">Rambling</span>
                                            <ChevronRight className="w-4 h-4 text-gray-300" />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1 text-pretty">Expressing unfiltered thoughts on everything and anything.</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LibraryMenu;
