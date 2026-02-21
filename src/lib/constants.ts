export const BOOK_COLLECTIONS = ['normal_books', 'manga', 'specialized'] as const;

export type BookCollection = (typeof BOOK_COLLECTIONS)[number];

export const DETAIL_FIELDS = ['summary', 'chapters', 'authorBio'] as const;

export const COLLECTION_FILE_MAP: Record<BookCollection, string> = {
    'normal_books': 'normal_books.json',
    'manga': 'manga.json',
    'specialized': 'specialized.json'
};
