export interface Chapter {
    id: string;
    title: string;
    content: string;
}

export interface AmbientMedia {
    url: string;
    type: 'image' | 'video' | 'gif';
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
    ambientMedia?: AmbientMedia;
}
