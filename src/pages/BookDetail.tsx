import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookApi, Book, calculateReadingTime } from '../lib/api';
import {
    ArrowLeft,
    User,
    ExternalLink,
    ChevronRight,
    Star,
    Clock,
    Info,
    List,
    ChevronDown,
    Edit3,
    Save,
    X,
    Plus,
    Trash2
} from 'lucide-react';

interface BookDetailProps {
    collection?: 'normal_books' | 'manga' | 'specialized';
}

const BookDetail: React.FC<BookDetailProps> = ({ collection = 'normal_books' }) => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Book | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleNativeWheel = (e: WheelEvent) => {
            if (!isEditing || !progressRef.current?.contains(e.target as Node)) return;

            // Strictly prevent page scroll
            e.preventDefault();
            const delta = e.deltaY > 0 ? -1 : 1;
            setEditData(prev => {
                if (!prev) return prev;
                const newProgress = Math.min(100, Math.max(0, (prev.progress || 0) + delta));
                return { ...prev, progress: newProgress };
            });
        };

        window.addEventListener('wheel', handleNativeWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleNativeWheel);
    }, [isEditing]);

    useEffect(() => {
        // Simple auth check
        const role = localStorage.getItem('user_role');
        setIsAdmin(role === 'admin');

        if (id) {
            window.scrollTo(0, 0);
            bookApi.getBookById(id, collection).then((data) => {
                setBook(data || null);
                setEditData(data || null);
                setLoading(false);
                if (data?.chapters?.[0]) {
                    setExpandedChapters({ [data.chapters[0].id]: true });
                }
            });
        }
    }, [id, collection]);

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev => ({
            ...prev,
            [chapterId]: !prev[chapterId]
        }));
    };

    const scrollToChapter = (chapterId: string) => {
        const element = document.getElementById(chapterId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setExpandedChapters(prev => ({ ...prev, [chapterId]: true }));
        }
    };

    const handleSave = async () => {
        if (editData) {
            const success = await bookApi.updateBook(editData, collection);
            if (success) {
                setBook(editData);
                setIsEditing(false);
                // Trigger a small reload message or just update local state
            } else {
                alert('Lưu thất bại! Hãy chắc chắn bạn đang chạy npm run dev.');
            }
        }
    };

    const addChapter = () => {
        if (editData) {
            const newChapter = {
                id: `ch-${Date.now()}`,
                title: 'New Chapter',
                content: ''
            };
            setEditData({
                ...editData,
                chapters: [...(editData.chapters || []), newChapter]
            });
        }
    };

    const removeChapter = (chapterId: string) => {
        if (editData) {
            setEditData({
                ...editData,
                chapters: editData.chapters?.filter(c => c.id !== chapterId)
            });
        }
    };

    const updateChapter = (chapterId: string, field: 'title' | 'content', value: string) => {
        if (editData) {
            setEditData({
                ...editData,
                chapters: editData.chapters?.map(c =>
                    c.id === chapterId ? { ...c, [field]: value } : c
                )
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
        );
    }

    if (!book || !editData) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold mb-4 italic text-gray-400">Summary not found.</h2>
                <Link to="/myreading" className="text-blue-600 hover:underline font-bold">Click to go back</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pb-32">
            <header className="relative pt-8 pb-12 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-6">
                    <nav className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">
                            <Link to="/myreading" className="hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                                <ArrowLeft className="w-2.5 h-2.5" />
                                Mike library
                            </Link>
                            <ChevronRight className="w-3 h-3 opacity-30" />
                            <span className="text-gray-900 dark:text-gray-100 uppercase">{book.title}</span>
                        </div>

                        <div className="flex gap-2">
                            {isAdmin && (
                                isEditing ? (
                                    <>
                                        <button
                                            onClick={() => { setIsEditing(false); setEditData(book); }}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase rounded-lg hover:bg-gray-200"
                                        >
                                            <X className="w-4 h-4" /> Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                                        >
                                            <Save className="w-4 h-4" /> Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold uppercase rounded-lg hover:opacity-80 transition-opacity"
                                    >
                                        <Edit3 className="w-4 h-4" /> Edit Recap
                                    </button>
                                )
                            )}
                        </div>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_300px] gap-12 items-start">
                        <div className="relative group">
                            <div className="relative shadow-2xl rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                                <img src={book.coverImage} alt={book.title} className="w-full h-auto" />
                            </div>
                        </div>

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
                                            onChange={(e) => setEditData({ ...editData, status: e.target.value as any })}
                                            className="bg-gray-50 dark:bg-gray-800 border-none outline-none font-bold text-gray-900 dark:text-gray-100 rounded px-1 focus:ring-1 focus:ring-blue-500"
                                        >
                                            {collection === 'manga' ? (
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
                                    <span>{calculateReadingTime(isEditing ? editData : book)}</span>
                                </div>
                                {((isEditing ? editData.status : book.status) === 'reading' || (isEditing ? editData.status : book.status) === 'following') && (
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
                                                        onChange={(e) => setEditData({ ...editData, progress: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
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
                                                    onChange={(e) => setEditData({ ...editData, progress: parseInt(e.target.value) })}
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

                        <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic border-l border-gray-100 dark:border-gray-800 pl-8">
                            {isEditing ? (
                                <textarea
                                    className="w-full bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 outline-none focus:border-blue-500 min-h-[150px] text-sm not-italic"
                                    placeholder="Author bio..."
                                    value={editData.authorBio || ''}
                                    onChange={(e) => setEditData({ ...editData, authorBio: e.target.value })}
                                />
                            ) : (
                                book.authorBio
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
                    <div className="space-y-12">
                        <section>
                            <div className="bg-blue-600 text-white px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-t-lg">
                                About
                            </div>
                            <div className="p-8 border-2 border-blue-600 border-t-0 rounded-b-lg font-medium leading-relaxed dark:text-gray-200">
                                {isEditing ? (
                                    <textarea
                                        className="w-full bg-transparent p-0 outline-none focus:ring-0 resize-none min-h-[120px]"
                                        value={editData.summary}
                                        onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
                                    />
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: book.summary }} />
                                )}
                            </div>
                        </section>

                        <div className="space-y-6">
                            {(isEditing ? editData.chapters : book.chapters)?.map((chapter) => (
                                <div
                                    key={chapter.id}
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
                                                        onChange={(e) => updateChapter(chapter.id, 'title', e.target.value)}
                                                    />
                                                    <button
                                                        onClick={() => removeChapter(chapter.id)}
                                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => toggleChapter(chapter.id)}
                                                        className="flex-1 text-left flex items-center justify-between"
                                                    >
                                                        <span className="font-black text-sm uppercase tracking-wider">{chapter.title}</span>
                                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedChapters[chapter.id] ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`transition-all duration-300 ease-in-out ${isEditing || expandedChapters[chapter.id] ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                        <div className="p-8 prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                                            {isEditing ? (
                                                <textarea
                                                    className="w-full bg-transparent p-0 outline-none focus:ring-0 resize-y min-h-[200px] font-medium leading-relaxed"
                                                    value={chapter.content}
                                                    onChange={(e) => updateChapter(chapter.id, 'content', e.target.value)}
                                                />
                                            ) : (
                                                <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isEditing && (
                                <button
                                    onClick={addChapter}
                                    className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all flex items-center justify-center gap-2 font-bold uppercase text-xs"
                                >
                                    <Plus className="w-4 h-4" /> Add Chapter
                                </button>
                            )}
                        </div>
                    </div>

                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-8 z-40">
                            <div className="p-1 border border-gray-200 dark:border-gray-800 rounded shadow-sm overflow-hidden bg-[var(--bg-primary)]">
                                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
                                    <List className="w-4 h-4 text-blue-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-gray-100">Mục Lục</span>
                                </div>
                                <div className="py-2">
                                    {(isEditing ? editData.chapters : book.chapters)?.map((chapter, index) => (
                                        <button
                                            key={chapter.id}
                                            onClick={() => scrollToChapter(chapter.id)}
                                            className="w-full text-left px-4 py-1.5 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors flex gap-3 text-gray-700 dark:text-gray-300"
                                        >
                                            <span className="opacity-50 w-4">{index + 1}</span>
                                            <span className="truncate">{chapter.title.includes('.') ? chapter.title.split('.').slice(1).join('.').trim() : chapter.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default BookDetail;
