import React from 'react';
import BookCard from '../components/BookCard';
import { useBooks } from '../hooks/useBooks';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface CategoryPageProps {
    title: string;
    collection: 'manga' | 'specialized';
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, collection }) => {
    const { books, loading } = useBooks(collection);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tight mb-4 italic underline decoration-blue-600 decoration-4 underline-offset-4 inline-block">{title}</h1>
                <p className="text-xl text-[var(--text-secondary)] max-w-2xl mt-4">
                    Exploring my collection.
                </p>
            </div>

            {books.length > 0 ? (
                <section>
                    <SectionHeader title="Collection" count={books.length} />
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
