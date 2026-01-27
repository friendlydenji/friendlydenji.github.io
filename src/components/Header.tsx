import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    BookOpen,
    User,
    LogOut,
    ChevronDown,
    Library,
    Info,
    Trophy,
    Book,
    Gamepad2,
    BrainCircuit,
    Globe
} from 'lucide-react';

const Header: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const name = localStorage.getItem('user_name');
        setUserName(name);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_role');
        window.location.reload();
    };

    return (
        <header className="border-b border-gray-100 dark:border-white/10 bg-white dark:bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/myreading" className="flex items-center space-x-2 group shrink-0 py-4">
                    <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <BookOpen className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <span className="font-bold text-xl tracking-tight uppercase italic underline decoration-blue-600 decoration-4 underline-offset-4">Mike reading</span>
                </Link>

                {/* Right-aligned Navigation and Auth */}
                <div className="flex items-center h-full">
                    {/* Navigation Section */}
                    <nav className="hidden md:flex items-center h-full mr-4">
                        {/* My Library Mega Menu */}
                        <div className="group h-full flex items-center px-4 relative cursor-pointer">
                            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                                <Library className="w-4 h-4" />
                                <span>Mike library</span>
                                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                            </div>

                            {/* Mega Menu Dropdown */}
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

                        {/* About Mega Menu */}
                        <div className="group h-full flex items-center px-4 relative cursor-pointer">
                            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                                <Info className="w-4 h-4" />
                                <span>About</span>
                                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                            </div>

                            {/* Dropdown content inspired by screenshot */}
                            <div className="absolute top-full right-0 w-[400px] bg-white dark:bg-gray-900 border border-t-0 border-gray-100 dark:border-gray-800 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 rounded-b-2xl overflow-hidden grid grid-cols-2">
                                <div className="p-6 border-r border-gray-100 dark:border-gray-800">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Discover</h3>
                                    <div className="space-y-4">
                                        <Link to="/myreading/about/me" className="flex items-center gap-3 group/sub">
                                            <User className="w-4 h-4 text-gray-400 group-hover/sub:text-blue-600" />
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Me</span>
                                        </Link>
                                        <Link to="/myreading/about/site" className="flex items-center gap-3 group/sub">
                                            <Globe className="w-4 h-4 text-gray-400 group-hover/sub:text-blue-600" />
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">This Site</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50/50 dark:bg-gray-800/20">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Connect</h3>
                                    <div className="space-y-4">
                                        <a href="https://www.goodreads.com/friendlydenji" target="_blank" rel="noreferrer" className="flex items-center gap-3 group/soc">
                                            <div className="w-4 h-4 flex items-center justify-center text-gray-400 group-hover/soc:text-[#372213] font-black text-[10px]">G</div>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Goodreads</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* User Auth Section */}
                    <div className="flex items-center pl-6 border-l border-gray-100 dark:border-gray-800 shrink-0 h-full">
                        {userName ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800">
                                    <User className="w-3.5 h-3.5 text-blue-600" />
                                    <span className="text-xs font-black uppercase tracking-widest text-blue-600">{userName}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/myreading/login"
                                className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-80 transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
                            >
                                <User className="w-3.5 h-3.5" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
