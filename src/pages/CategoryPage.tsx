import React, { useEffect, useState } from 'react';
import { bookApi, Book } from '../lib/api';
import BookCard from '../components/BookCard';

interface CategoryPageProps {
    title: string;
    collection: 'manga' | 'specialized';
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, collection }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        bookApi.getAllBooks(collection).then((data) => {
            // Sort books by readAt or date descending
            const sorted = [...data].sort((a, b) => {
                const dateA = new Date(a.readAt || a.date).getTime();
                const dateB = new Date(b.readAt || b.date).getTime();
                return dateB - dateA;
            });
            setBooks(sorted);
            setLoading(false);
        });
    }, [collection]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const SectionHeader = ({ sectionTitle, count }: { sectionTitle: string, count: number }) => (
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--test-primary)]">{sectionTitle}</h2>
            <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
            <span className="text-[10px] font-medium text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">{count} {count > 1 ? 'items' : 'item'}</span>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tight mb-4 italic underline decoration-blue-600 decoration-4 underline-offset-4 inline-block">{title}</h1>
                <p className="text-xl text-[var(--test-secondary)] max-w-2xl mt-4">
                    Exploring my collection.
                </p>
            </div>

            {books.length > 0 ? (
                <section>
                    <SectionHeader sectionTitle="Collection" count={books.length} />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </section>
            ) : (
                <div className="py-24 text-center">
                    <p className="text-[var(--text-secondary)]">No items found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
