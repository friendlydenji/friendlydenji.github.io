import { useState, useEffect, useMemo } from 'react';
import { bookApi } from '../lib/api';
import { Book } from '../types/book';
import { BookCollection } from '../lib/constants';

export const useBooks = (collection: BookCollection = 'normal_books', filter: 'all' | 'fiction' | 'non-fiction' = 'all') => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        bookApi.getAllBooks(collection)
            .then((data) => {
                const sorted = [...data].sort((a, b) => {
                    const dateA = new Date(a.readAt || a.date).getTime();
                    const dateB = new Date(b.readAt || b.date).getTime();
                    return dateB - dateA;
                });
                setBooks(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(`Failed to fetch books from ${collection}:`, err);
                setLoading(false);
            });
    }, [collection]);

    const filteredBooks = useMemo(() => {
        return books.filter(b => filter === 'all' || b.type === filter);
    }, [books, filter]);

    return { books: filteredBooks, allBooks: books, loading };
};
