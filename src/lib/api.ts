import { Book } from '../types/book';

export const calculateReadingTime = (book: Book): string => {
    const wordsPerMinute = 200;
    let totalText = book.summary || "";

    if (book.chapters) {
        book.chapters.forEach(ch => {
            totalText += " " + (ch.title || "") + " " + (ch.content || "");
        });
    }

    // Clean text and count words
    const words = totalText.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return `${minutes} phút`;
};

// This is the bridge. 
export const bookApi = {
    getAllBooks: async (collection: string = 'normal_books'): Promise<Book[]> => {
        try {
            const response = await import(`../data/${collection}.json`);
            return (response.default as Book[]).map(b => ({ ...b, collection: collection as 'normal_books' | 'manga' | 'specialized' }));
        } catch (error) {
            console.error(`Failed to load collection: ${collection}`, error);
            return [];
        }
    },

    getBookById: async (id: string, collection: string = 'normal_books'): Promise<Book | undefined> => {
        try {
            const response = await import(`../data/${collection}.json`);
            const book = (response.default as Book[]).find((book: Book) => String(book.id) === String(id));
            return book ? { ...book, collection: collection as 'normal_books' | 'manga' | 'specialized' } : undefined;
        } catch {
            return undefined;
        }
    },

    updateBook: async (book: Book, collection: string = 'normal_books'): Promise<boolean> => {
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
