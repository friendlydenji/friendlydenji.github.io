import { useState, useEffect } from 'react';
import { bookApi } from '../lib/api';
import { Book } from '../types/book';
import { BookCollection } from '../lib/constants';

export const useBookDetail = (id: string | undefined, collection: BookCollection = 'normal_books') => {
    const [book, setBook] = useState<Book | null>(null);
    const [editData, setEditData] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        bookApi.getBookById(id, collection)
            .then((data) => {
                if (data) {
                    setBook(data);
                    setEditData(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(`Failed to fetch book ${id}:`, err);
                setLoading(false);
            });
    }, [id, collection]);

    const updateEditData = (newData: Partial<Book>) => {
        if (editData) {
            setEditData({ ...editData, ...newData });
        }
    };

    const saveChanges = async () => {
        if (!editData) return false;
        const success = await bookApi.updateBook(editData, collection);
        if (success) {
            setBook(editData);
            return true;
        }
        return false;
    };

    const resetEditData = () => {
        setEditData(book);
    };

    return {
        book,
        editData,
        loading,
        updateEditData,
        saveChanges,
        resetEditData,
        setEditData // Exposed for direct manipulation if needed
    };
};
