export interface Chapter {
    id: string;
    title: string;
    content: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    authorBio?: string;
    coverImage: string;
    category: string;
    status: 'read' | 'reading' | 'wanna-read' | 'end' | 'following';
    type: 'fiction' | 'non-fiction';
    tags: string[];
    userRating?: number;
    averageRating?: number;
    readingTime?: string;
    progress?: number;
    summary: string;
    chapters?: Chapter[];
    date: string;
    readAt?: string;
    year?: string;
    collection?: 'normal_books' | 'manga' | 'specialized';
}

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
            return (response.default as Book[]).map(b => ({ ...b, collection: collection as any }));
        } catch (error) {
            console.error(`Failed to load collection: ${collection}`, error);
            return [];
        }
    },

    getBookById: async (id: string, collection: string = 'normal_books'): Promise<Book | undefined> => {
        try {
            const response = await import(`../data/${collection}.json`);
            const book = (response.default as Book[]).find((book: Book) => String(book.id) === String(id));
            return book ? { ...book, collection: collection as any } : undefined;
        } catch (error) {
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
