import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, ChevronDown, User, Globe, ChevronRight, MessageCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AboutMenu: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'discover' | 'connect'>('discover');
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="group h-full flex items-center px-4 py-6 cursor-pointer">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Info className="w-4 h-4" />
                <span>About</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </div>

            {/* Mega Menu Container */}
            <div className="absolute top-full left-0 w-full bg-[var(--bg-primary)] border border-gray-100 dark:border-white/10 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 rounded-b-2xl overflow-hidden min-h-[350px] flex z-50">
                <div className="absolute top-0 left-0 w-full h-2 -translate-y-full bg-transparent" /> {/* Precise hover bridge */}

                {/* Sidebar */}
                <div className="w-64 bg-gray-50/50 dark:bg-black/20 border-r border-gray-100 dark:border-white/5 p-4 flex flex-col gap-2">
                    <button
                        onMouseEnter={() => setActiveTab('discover')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'discover' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-100/50 dark:hover:bg-white/5'}`}
                    >
                        <div className="flex items-center gap-3">
                            <Info className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-tight">Discover</span>
                        </div>
                        {activeTab === 'discover' && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <button
                        onMouseEnter={() => setActiveTab('connect')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'connect' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-100/50 dark:hover:bg-white/5'}`}
                    >
                        <div className="flex items-center gap-3">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-tight">Connect</span>
                        </div>
                        {activeTab === 'connect' && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                        <button
                            onClick={toggleTheme}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-100/50 dark:hover:bg-white/5"
                        >
                            <div className="flex items-center gap-3">
                                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                <span className="text-sm font-bold tracking-tight">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    {activeTab === 'discover' && (
                        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Discover the Project</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <Link to="/myreading/about/me" className="group/item flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
                                        <User className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <span className="text-base font-bold text-gray-900 dark:text-white block group-hover/item:text-blue-600">Me</span>
                                        <p className="text-xs text-gray-500 mt-1">Background and interests</p>
                                    </div>
                                </Link>

                                <Link to="/myreading/about/site" className="group/item flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <span className="text-base font-bold text-gray-900 dark:text-white block group-hover/item:text-blue-600">This Site</span>
                                        <p className="text-xs text-gray-500 mt-1">How it was built with AI</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}

                    {activeTab === 'connect' && (
                        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Connect with Me</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <a href="https://www.goodreads.com/friendlydenji" target="_blank" rel="noreferrer" className="group/soc flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-[#372213]/30 hover:bg-[#372213]/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-[#372213]/10 flex items-center justify-center font-black text-xl text-[#372213]">G</div>
                                    <div>
                                        <span className="text-base font-bold text-gray-900 dark:text-white block">Goodreads</span>
                                        <p className="text-xs text-gray-500 mt-1">See my reading activity</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutMenu;
