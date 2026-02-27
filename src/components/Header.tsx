import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
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
        <header className="border-b border-gray-100 dark:border-white/10 bg-[var(--bg-primary)] backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Top Row: Logo & Search/Auth */}
                <div className="flex items-stretch justify-between relative">
                    {/* Left Section: Navigation items */}
                    <div className="w-1/3 flex">
                        <nav className="flex items-stretch gap-1 md:gap-4">
                            <LibraryMenu />
                            <AboutMenu />
                        </nav>
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-6">
                        <Link
                            to="/mylibrary"
                            className="flex items-center group no-underline"
                        >
                            <span className="flex items-center font-['Playfair_Display'] text-3xl md:text-5xl tracking-tighter leading-none transition-transform duration-300 group-hover:scale-[1.02]">
                                <span className="text-black dark:text-white font-bold">Mike</span>
                                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">library</span>
                                <span className="ml-1 w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-500 shadow-sm self-end mb-1 md:mb-1.5"></span>
                            </span>
                        </Link>
                    </div>

                    <div className="w-1/3 flex items-center justify-end gap-2 md:gap-4 py-6">
                        <SearchBar />
                        <div className="flex items-center pl-4 border-l border-gray-100 dark:border-gray-800 shrink-0 h-8 ml-2">
                            {userName ? (
                                <div className="flex items-center gap-4">
                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800">
                                        <User className="w-3 h-3 text-blue-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{userName}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/myreading/login"
                                    className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black uppercase tracking-widest rounded-lg hover:opacity-80 transition-all shadow-lg"
                                >
                                    <User className="w-3 h-3" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
