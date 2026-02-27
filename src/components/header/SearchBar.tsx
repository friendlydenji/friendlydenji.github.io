import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book } from '../../types/book';
import { bookApi } from '../../lib/api';
import { BOOK_COLLECTIONS } from '../../lib/constants';

const SearchBar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [filteredResults, setFilteredResults] = useState<Book[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch all books from all collections on mount
    useEffect(() => {
        const loadAllBooks = async () => {
            try {
                const allFetchedBooks = await Promise.all(
                    BOOK_COLLECTIONS.map(col => bookApi.getAllBooks(col))
                );
                setAllBooks(allFetchedBooks.flat());
            } catch (error) {
                console.error('Failed to load books for search:', error);
            }
        };
        loadAllBooks();
    }, []);

    const normalizeString = (str: string) => {
        return str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d");
    };

    useEffect(() => {
        if (!searchValue.trim()) {
            setFilteredResults([]);
            return;
        }

        const query = normalizeString(searchValue);
        const filtered = allBooks.filter(book => {
            const titleMatch = normalizeString(book.title).includes(query);
            const authorMatch = normalizeString(book.author).includes(query);

            return titleMatch || authorMatch;
        });

        setFilteredResults(filtered.slice(0, 5)); // Limit to 5 results
    }, [searchValue, allBooks]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            setTimeout(() => inputRef.current?.focus(), 200);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        inputRef.current?.focus();
    };

    const getBookLink = (book: Book) => {
        if (book.collection === 'manga') return `/myreading/manga/summary/${book.id}`;
        if (book.collection === 'specialized') return `/myreading/specialized/summary/${book.id}`;
        return `/myreading/books/summary/${book.id}`;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isExpanded && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded]);

    return (
        <div ref={containerRef} className="flex items-center h-full px-2 mr-2 relative">
            <div
                className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full ${isExpanded
                    ? 'w-64 bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3'
                    : 'w-10'
                    } h-10`}
            >
                <button
                    onClick={toggleExpand}
                    className={`flex items-center justify-center transition-colors shrink-0 ${isExpanded
                        ? 'text-blue-600 w-6'
                        : 'text-gray-400 hover:text-black dark:hover:text-white w-10 h-10 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl'
                        }`}
                >
                    <Search className={`transition-all duration-300 ${isExpanded ? 'w-4 h-4' : 'w-5 h-5'}`} />
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search books..."
                    className={`bg-transparent border-none focus:ring-0 text-[11px] font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 placeholder-gray-400 transition-all duration-500 ${isExpanded ? 'opacity-100 w-full ml-2' : 'opacity-0 w-0'
                        }`}
                />

                {isExpanded && searchValue && (
                    <button
                        onClick={handleClear}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {isExpanded && searchValue && (
                <div className="absolute top-14 right-2 w-72 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-2xl overflow-hidden z-[60] py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    {filteredResults.length > 0 ? (
                        <div className="flex flex-col">
                            {filteredResults.map(book => (
                                <Link
                                    key={`${book.collection}-${book.id}`}
                                    to={getBookLink(book)}
                                    onClick={() => setIsExpanded(false)}
                                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 flex items-start gap-3 group transition-colors"
                                >
                                    <div className="w-10 h-14 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <h4 className="text-[11px] font-black uppercase tracking-wide text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {book.title}
                                        </h4>
                                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                                            {book.author}
                                        </span>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full ${book.collection === 'manga'
                                                ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20'
                                                : book.collection === 'specialized'
                                                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20'
                                                    : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                                                }`}>
                                                {book.collection === 'manga' ? 'Manga' : book.collection === 'specialized' ? 'Spec' : 'Book'}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-3">
                                <Search className="w-6 h-6 text-red-500" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-1">
                                I have never read it
                            </span>
                            <p className="text-[10px] font-bold text-gray-400 max-w-[200px]">
                                Try searching for another title or author
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
