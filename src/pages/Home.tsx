import React, { useState } from 'react';
import { Book } from '../types/book';
import BookCard from '../components/BookCard';
import { useBooks } from '../hooks/useBooks';
import SectionHeader from '../components/ui/SectionHeader';
import FilterButton from '../components/ui/FilterButton';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'fiction' | 'non-fiction'>('all');
    const { books, loading } = useBooks('normal_books', activeFilter);

    if (loading) return <LoadingSpinner />;

    const readingBooks = books.filter(b => b.status === 'reading');
    const readBooks = books.filter(b => b.status === 'read');
    const wannaReadBooks = books.filter(b => b.status === 'wanna-read');

    // Group read books by year
    const readBooksByYear = readBooks.reduce((acc, book) => {
        const year = new Date(book.readAt || book.date).getFullYear().toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(book);
        return acc;
    }, {} as Record<string, Book[]>);

    const sortedYears = Object.keys(readBooksByYear).sort((a, b) => b.localeCompare(a));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-4">Books Recap</h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
                        Tracking all my reading books.
                        Trying to draw an image for each fiction book and recap information from non-fiction books.
                    </p>
                </div>
                <div className="flex gap-2">
                    <FilterButton type="all" label="All" activeFilter={activeFilter} onClick={setActiveFilter} />
                    <FilterButton type="non-fiction" label="Non-fiction" activeFilter={activeFilter} onClick={setActiveFilter} />
                    <FilterButton type="fiction" label="Fiction" activeFilter={activeFilter} onClick={setActiveFilter} />
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

            {books.length === 0 && (
                <div className="py-24 text-center">
                    <p className="text-[var(--text-secondary)]">No books found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
