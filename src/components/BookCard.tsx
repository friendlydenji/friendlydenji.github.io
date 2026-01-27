import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../lib/api';
import { Star } from 'lucide-react';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const isNonFiction = book.type === 'non-fiction';
    const isWannaRead = book.status === 'wanna-read';

    const Content = (
        <div className="relative h-full flex flex-col">
            <div className="aspect-[2/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${!isNonFiction ? 'grayscale group-hover:grayscale-0' : 'group-hover:scale-110'}`}
                />
                {isNonFiction && !isWannaRead && (
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-md shadow-sm border border-white/20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">
                        <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 uppercase">RECAP</span>
                    </div>
                )}
                {!isNonFiction && !isWannaRead && (
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-md shadow-sm border border-white/20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">
                        <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 uppercase">GOODREADS</span>
                    </div>
                )}
            </div>

            <div className="mt-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full border ${book.type === 'fiction'
                        ? 'border-yellow-200 text-yellow-700 bg-yellow-50 dark:border-yellow-900/30 dark:bg-yellow-900/20'
                        : 'border-red-200 text-red-600 bg-red-50 dark:border-red-900/30 dark:bg-red-900/20'
                        }`}>
                        {book.type}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">
                        {book.category}
                    </span>
                </div>

                <h3 className={`text-lg font-black leading-tight mb-1 transition-colors duration-300 ${book.status === 'reading' || book.status === 'following'
                    ? 'group-hover:text-blue-600'
                    : book.status === 'read' || book.status === 'end'
                        ? 'group-hover:text-purple-600'
                        : 'group-hover:text-green-500'
                    } text-gray-900 dark:text-gray-100`}>
                    {book.title}
                </h3>

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {book.author}
                </p>

                {(book.status === 'reading' || book.status === 'following') && (
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">Progress</span>
                            <span className="text-[9px] font-black italic text-gray-400">{book.progress || 0}%</span>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                                style={{ width: `${book.progress || 0}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mt-auto">
                    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-gray-800">
                        <Star className={`w-2.5 h-2.5 ${book.userRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        <span>{book.userRating || '-'}</span>
                    </div>
                    <span className="opacity-30">/</span>
                    <div className="flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 text-gray-400 opacity-50" />
                        <span>{book.averageRating || '-'}</span>
                    </div>
                </div>

                {book.tags && book.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        {book.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] font-medium text-gray-400 dark:text-gray-600 italic">
                                #{tag.toLowerCase().replace(/ /g, '')}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );


    if (isWannaRead) {
        return (
            <a
                href={`https://www.goodreads.com/book/show/${book.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
                {Content}
            </a>
        );
    }

    if (isNonFiction) {
        const basePath = "/myreading";
        const path = book.collection === 'manga' ? `${basePath}/manga/summary/${book.id}`
            : book.collection === 'specialized' ? `${basePath}/specialized/summary/${book.id}`
                : `${basePath}/summary/${book.id}`;
        return (
            <Link to={path} className="group block h-full">
                {Content}
            </Link>
        );
    }

    return (
        <a
            href={`https://www.goodreads.com/book/show/${book.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full opacity-90 hover:opacity-100 transition-all"
        >
            {Content}
        </a>
    );
};

export default BookCard;
