import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useBookDetail } from '../hooks/useBookDetail';
import DetailHeader from '../components/book-detail/DetailHeader';
import BookMetadata from '../components/book-detail/BookMetadata';
import ChapterItem from '../components/book-detail/ChapterItem';
import TableOfContents from '../components/book-detail/TableOfContents';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface BookDetailProps {
    collection?: 'normal_books' | 'manga' | 'specialized';
}

const BookDetail: React.FC<BookDetailProps> = ({ collection = 'normal_books' }) => {
    const { id } = useParams<{ id: string }>();
    const {
        book,
        editData,
        loading,
        updateEditData,
        saveChanges,
        resetEditData
    } = useBookDetail(id, collection);

    const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleNativeWheel = (e: WheelEvent) => {
            if (!isEditing || !progressRef.current?.contains(e.target as Node)) return;
            e.preventDefault();
            const delta = e.deltaY > 0 ? -1 : 1;
            const currentProgress = editData?.progress || 0;
            updateEditData({ progress: Math.min(100, Math.max(0, currentProgress + delta)) });
        };

        window.addEventListener('wheel', handleNativeWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleNativeWheel);
    }, [isEditing, editData, updateEditData]);

    useEffect(() => {
        setIsAdmin(localStorage.getItem('user_role') === 'admin');
        if (id) window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (book?.chapters?.[0] && Object.keys(expandedChapters).length === 0) {
            setExpandedChapters({ [book.chapters[0].id]: true });
        }
    }, [book, expandedChapters]);

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
    };

    const scrollToChapter = (chapterId: string) => {
        const element = document.getElementById(chapterId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setExpandedChapters(prev => ({ ...prev, [chapterId]: true }));
        }
    };

    const handleSave = async () => {
        const success = await saveChanges();
        if (success) {
            setIsEditing(false);
        } else {
            alert('Lưu thất bại! Hãy chắc chắn bạn đang chạy npm run dev.');
        }
    };

    const addChapter = () => {
        if (editData) {
            const newChapter = { id: `ch-${Date.now()}`, title: 'New Chapter', content: '' };
            updateEditData({ chapters: [...(editData.chapters || []), newChapter] });
        }
    };

    const removeChapter = (chapterId: string) => {
        if (editData) {
            updateEditData({ chapters: editData.chapters?.filter(c => c.id !== chapterId) });
        }
    };

    const updateChapter = (chapterId: string, field: 'title' | 'content', value: string) => {
        if (editData) {
            const updatedChapters = editData.chapters?.map(c =>
                c.id === chapterId ? { ...c, [field]: value } : c
            );
            updateEditData({ chapters: updatedChapters });
        }
    };

    if (loading) return <LoadingSpinner />;
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
                    <DetailHeader
                        book={book}
                        isAdmin={isAdmin}
                        isEditing={isEditing}
                        onEdit={() => setIsEditing(true)}
                        onCancel={() => { setIsEditing(false); resetEditData(); }}
                        onSave={handleSave}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_300px] gap-12 items-start">
                        <div className="relative group">
                            <div className="relative shadow-2xl rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                                <img src={book.coverImage} alt={book.title} className="w-full h-auto" />
                            </div>
                        </div>

                        <BookMetadata
                            book={book}
                            isEditing={isEditing}
                            editData={editData}
                            onUpdateEditData={updateEditData}
                            progressRef={progressRef}
                        />

                        <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic border-l border-gray-100 dark:border-gray-800 pl-8">
                            {isEditing ? (
                                <textarea
                                    className="w-full bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 outline-none focus:border-blue-500 min-h-[150px] text-sm not-italic"
                                    placeholder="Author bio..."
                                    value={editData.authorBio || ''}
                                    onChange={(e) => updateEditData({ authorBio: e.target.value })}
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
                                        onChange={(e) => updateEditData({ summary: e.target.value })}
                                    />
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: book.summary }} />
                                )}
                            </div>
                        </section>

                        <div className="space-y-6">
                            {(isEditing ? editData.chapters : book.chapters)?.map((chapter) => (
                                <ChapterItem
                                    key={chapter.id}
                                    chapter={chapter}
                                    isEditing={isEditing}
                                    isExpanded={expandedChapters[chapter.id]}
                                    onToggle={toggleChapter}
                                    onUpdate={updateChapter}
                                    onRemove={removeChapter}
                                />
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
                        <TableOfContents
                            chapters={isEditing ? editData.chapters || [] : book.chapters || []}
                            onScrollTo={scrollToChapter}
                        />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default BookDetail;
