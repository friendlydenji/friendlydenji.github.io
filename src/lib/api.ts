import { Book } from '../types/book';
import { BookCollection } from './constants';

export const calculateReadingTime = (book: Book): string => {
    const wordsPerMinute = 200;
    let totalText = book.summary || "";

    if (book.chapters) {
        book.chapters.forEach(ch => {
            totalText += ` ${ch.title || ""} ${ch.content || ""}`;
        });
    }

    const words = totalText.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return `${minutes} phút`;
};

export const bookApi = {
    getAllBooks: async (collection: BookCollection = 'normal_books'): Promise<Book[]> => {
        try {
            const response = await import(`../data/${collection}.json`);
            return (response.default as Book[]).map(b => ({ ...b, collection }));
        } catch (error) {
            console.error(`Failed to load collection: ${collection}`, error);
            return [];
        }
    },

    getBookById: async (id: string, collection: BookCollection = 'normal_books'): Promise<Book | undefined> => {
        try {
            // Load detail from individual file
            const detailResponse = await import(`../data/books/${id}.json`);
            const book = detailResponse.default as Book;
            return { ...book, collection };
        } catch (error) {
            console.warn(`Failed to load book detail for ${id}, falling back to collection list:`, error);
            try {
                const response = await import(`../data/${collection}.json`);
                const book = (response.default as Book[]).find((b: Book) => String(b.id) === String(id));
                return book ? { ...book, collection } : undefined;
            } catch {
                return undefined;
            }
        }
    },

    updateBook: async (book: Book, collection: BookCollection = 'normal_books'): Promise<boolean> => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/save-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Token': token || '',
                },
                body: JSON.stringify({ ...book, collection }),
            });
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Failed to update book:', error);
            return false;
        }
    }
};
