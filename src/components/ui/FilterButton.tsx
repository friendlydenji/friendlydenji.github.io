import React from 'react';

interface FilterButtonProps {
    type: string;
    label: string;
    activeFilter: string;
    onClick: (type: 'all' | 'fiction' | 'non-fiction') => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ type, label, activeFilter, onClick }) => (
    <button
        onClick={() => onClick(type as 'all' | 'fiction' | 'non-fiction')}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeFilter === type
            ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-md'
            : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
    >
        {label}
    </button>
);

export default FilterButton;
