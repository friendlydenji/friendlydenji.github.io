import React, { useEffect, useState } from 'react';
import { bookApi, Book } from '../lib/api';
import BookCard from '../components/BookCard';

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<'all' | 'fiction' | 'non-fiction'>('all');

    useEffect(() => {
        bookApi.getAllBooks('normal_books').then((data) => {
            // Sort books by readAt or date descending
            const sorted = [...data].sort((a, b) => {
                const dateA = new Date(a.readAt || a.date).getTime();
                const dateB = new Date(b.readAt || b.date).getTime();
                return dateB - dateA;
            });
            setBooks(sorted);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const filteredBooks = books.filter(b =>
        activeFilter === 'all' || b.type === activeFilter
    );

    const readingBooks = filteredBooks.filter(b => b.status === 'reading');
    const readBooks = filteredBooks.filter(b => b.status === 'read');
    const wannaReadBooks = filteredBooks.filter(b => b.status === 'wanna-read');

    // Group read books by year
    const readBooksByYear = readBooks.reduce((acc, book) => {
        const year = new Date(book.readAt || book.date).getFullYear().toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(book);
        return acc;
    }, {} as Record<string, Book[]>);

    // Sort years descending
    const sortedYears = Object.keys(readBooksByYear).sort((a, b) => b.localeCompare(a));

    const FilterButton = ({ type, label }: { type: typeof activeFilter, label: string }) => (
        <button
            onClick={() => setActiveFilter(type)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeFilter === type
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
        >
            {label}
        </button>
    );

    const SectionHeader = ({ title, count, color = "text-[var(--text-primary)]", isSubHeader = false }: { title: string, count: number, color?: string, isSubHeader?: boolean }) => (
        <div className={`flex items-center gap-4 ${isSubHeader ? 'mb-6 mt-12 first:mt-0' : 'mb-8'}`}>
            <h2 className={`${isSubHeader ? 'text-lg font-bold' : 'text-2xl font-bold uppercase tracking-widest'} ${color}`}>{title}</h2>
            <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
            <span className="text-[10px] font-medium text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">{count} {count > 1 ? 'books' : 'book'}</span>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-4">Books Recap</h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
                        Tracking all my reading books and recap information from non-fiction books.
                    </p>
                </div>
                <div className="flex gap-2">
                    <FilterButton type="all" label="All" />
                    <FilterButton type="non-fiction" label="Non-fiction" />
                    <FilterButton type="fiction" label="Fiction" />
                </div>
            </div>

            {readingBooks.length > 0 && (
                <section className="mb-24">
                    <SectionHeader title="Currently Reading" count={readingBooks.length} color="text-blue-600" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
                        {readingBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </section>
            )}

            {readBooks.length > 0 && (
                <section className="mb-24">
                    <SectionHeader title="Read" count={readBooks.length} color="text-purple-600" />

                    {sortedYears.map(year => (
                        <div key={year} className="mb-20 last:mb-0">
                            <SectionHeader title={year} count={readBooksByYear[year].length} isSubHeader={true} />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
                                {readBooksByYear[year].map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {wannaReadBooks.length > 0 && (
                <section className="mb-24">
                    <SectionHeader title="Wanna Read" count={wannaReadBooks.length} color="text-green-600" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
                        {wannaReadBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </section>
            )}

            {filteredBooks.length === 0 && (
                <div className="py-24 text-center">
                    <p className="text-[var(--text-secondary)]">No books found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
