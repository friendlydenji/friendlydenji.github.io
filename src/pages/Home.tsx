import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Hand, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
    const [hovered, setHovered] = useState<'reading' | 'writing' | null>(null);

    // leftWidth defines the central split point (0-100)
    const leftWidth = hovered === 'reading' ? 65 : hovered === 'writing' ? 35 : 50;

    // Slant offset creates the tilt (approx 5% offset)
    const slant = 5;
    const splitTop = leftWidth - slant;
    const splitBottom = leftWidth + slant;

    const readingCategories = [
        { to: "/myreading/books", label: "Book" },
        { to: "/myreading/manga", label: "Manga & Manhwa" },
        { to: "/myreading/specialized", label: "Specialized" }
    ];

    const writingCategories = [
        { to: "/writing/rambling", label: "Rambling" }
    ];

    return (
        <div className="h-full w-full overflow-hidden relative select-none">
            {/* ═══ 1. TOTALLY TRANSPARENT INTERACTIVE PANELS ═══ */}
            {/* We no longer put background colors on these panels to ensure zero visible seams. */}
            {/* The single background color is provided by the parent container at the top Level. */}
            <div className="h-full w-full relative z-10">

                {/* --- READING PANEL (Purely Interactive Clipping) --- */}
                <div
                    className="absolute inset-0 h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                        clipPath: `polygon(0 0, ${splitTop}% 0, ${splitBottom}% 100%, 0 100%)`,
                        WebkitClipPath: `polygon(0 0, ${splitTop}% 0, ${splitBottom}% 100%, 0 100%)`
                    }}
                    onMouseEnter={() => setHovered('reading')}
                    onMouseLeave={() => setHovered(null)}
                >

                    <div
                        className="h-full flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        style={{ width: `${leftWidth}%` }}
                    >
                        {hovered === 'reading' ? (
                            <div className="h-full w-full flex flex-col">
                                {readingCategories.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={item.to}
                                        className="relative flex-1 flex items-center justify-center group/row transition-colors duration-300"
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-px bg-black/5 dark:bg-white/5" />
                                        <span className="text-lg md:text-2xl font-black italic uppercase tracking-[0.15em] text-gray-400 dark:text-white/40 group-hover/row:text-gray-900 dark:group-hover/row:text-white transition-colors duration-300">
                                            {item.label}
                                        </span>
                                        <ArrowRight className="absolute right-8 w-5 h-5 text-transparent group-hover/row:text-gray-900 dark:group-hover/row:text-white group-hover/row:translate-x-1 transition-all duration-300" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-8">
                                <div className="mb-6 p-5 rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-gray-400 dark:text-white/60">
                                    <Eye className="w-14 h-14" />
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase transition-colors">Reading</h2>
                                <p className="text-gray-400 dark:text-white/20 font-black uppercase tracking-[0.3em] text-[10px] mt-4">Exploring books and manga</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- WRITING PANEL (Purely Interactive Clipping) --- */}
                <div
                    className="absolute inset-0 h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                        clipPath: `polygon(${splitTop}% 0, 100% 0, 100% 100%, ${splitBottom}% 100%)`,
                        WebkitClipPath: `polygon(${splitTop}% 0, 100% 0, 100% 100%, ${splitBottom}% 100%)`
                    }}
                    onMouseEnter={() => setHovered('writing')}
                    onMouseLeave={() => setHovered(null)}
                >

                    <div
                        className="h-full flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ml-auto"
                        style={{ width: `${100 - leftWidth}%` }}
                    >
                        {hovered === 'writing' ? (
                            <div className="h-full w-full flex flex-col">
                                {writingCategories.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={item.to}
                                        className="relative flex-1 flex items-center justify-center group/row transition-colors duration-300"
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-px bg-black/5 dark:bg-white/5" />
                                        <span className="text-lg md:text-2xl font-black italic uppercase tracking-[0.15em] text-gray-400 dark:text-white/40 group-hover/row:text-gray-900 dark:group-hover/row:text-white transition-colors duration-300">
                                            {item.label}
                                        </span>
                                        <ArrowRight className="absolute right-8 w-5 h-5 text-transparent group-hover/row:text-gray-900 dark:group-hover/row:text-white group-hover/row:translate-x-1 transition-all duration-300" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-8">
                                <div className="mb-6 p-5 rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-gray-400 dark:text-white/60">
                                    <Hand className="w-14 h-14" />
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase transition-colors">Writing</h2>
                                <p className="text-gray-400 dark:text-white/20 font-black uppercase tracking-[0.3em] text-[10px] mt-4">Sharing thoughts and notes</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ═══ 2. DIAGONAL DIVIDER (The only visual line) ═══ */}
                <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" preserveAspectRatio="none">
                    <line
                        x1={`${splitTop}%`} y1="0" x2={`${splitBottom}%`} y2="100%"
                        className="transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        style={{
                            stroke: 'var(--divider)',
                            strokeWidth: '1.5',
                        }}
                    />
                </svg>
            </div>
        </div>
    );
};

export default Home;