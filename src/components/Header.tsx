import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    BookOpen,
    User,
    LogOut
} from 'lucide-react';

import LibraryMenu from './header/LibraryMenu';
import AboutMenu from './header/AboutMenu';
import SearchBar from './header/SearchBar';

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
                <div className="flex items-center gap-8 h-full">
                    <Link to="/myreading" className="flex items-center space-x-2 group shrink-0 py-4" title="Home">
                        <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                            <BookOpen className="w-6 h-6 text-white dark:text-black" />
                        </div>
                    </Link>

                    {/* Navigation items moved to the left group */}
                    <nav className="hidden md:flex items-center h-full">
                        <LibraryMenu />
                        <AboutMenu />
                    </nav>
                </div>

                {/* Right-aligned Search and Auth */}
                <div className="flex items-center h-full">
                    <div className="flex items-center">
                        {/* Search Bar remains on the right */}
                        <SearchBar />
                    </div>

                    {/* User Auth Section */}
                    <div className="flex items-center pl-6 border-l border-gray-100 dark:border-gray-800 shrink-0 h-full ml-2">
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
