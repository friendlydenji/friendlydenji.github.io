import React from 'react';
import { Link } from 'react-router-dom';
import { Info, ChevronDown, User, Globe } from 'lucide-react';

const AboutMenu: React.FC = () => {
    return (
        <div className="group h-full flex items-center px-4 relative cursor-pointer">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Info className="w-4 h-4" />
                <span>About</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </div>

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
    );
};

export default AboutMenu;
