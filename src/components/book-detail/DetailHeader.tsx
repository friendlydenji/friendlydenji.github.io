import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Edit3, X, Save } from 'lucide-react';
import { Book } from '../../types/book';

interface DetailHeaderProps {
    book: Book;
    isAdmin: boolean;
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
    book,
    isAdmin,
    isEditing,
    onEdit,
    onCancel,
    onSave
}) => {
    return (
        <nav className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">
                <Link to="/mylibrary" className="hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                    <ArrowLeft className="w-2.5 h-2.5" />
                    Mike library
                </Link>
                <ChevronRight className="w-3 h-3 opacity-30" />
                <span className="text-gray-900 dark:text-gray-100 uppercase">{book.title}</span>
            </div>

            <div className="flex gap-2">
                {isAdmin && (
                    isEditing ? (
                        <>
                            <button
                                onClick={onCancel}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase rounded-lg hover:bg-gray-200"
                            >
                                <X className="w-4 h-4" /> Cancel
                            </button>
                            <button
                                onClick={onSave}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                            >
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold uppercase rounded-lg hover:opacity-80 transition-opacity"
                        >
                            <Edit3 className="w-4 h-4" /> Edit Recap
                        </button>
                    )
                )}
            </div>
        </nav>
    );
};

export default DetailHeader;
