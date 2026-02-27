import React from 'react';

interface SectionHeaderProps {
    title: string;
    count: number;
    color?: string;
    isSubHeader?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    count,
    color = "text-[var(--text-primary)]",
    isSubHeader = false
}) => (
    <div className={`flex items-center gap-4 ${isSubHeader ? 'mb-6 mt-12 first:mt-0' : 'mb-8'}`}>
        <h2 className={`${isSubHeader ? 'text-lg font-bold' : 'text-2xl font-bold uppercase tracking-widest'} ${color}`}>
            {title}
        </h2>
        <div className="h-px flex-1 bg-[var(--divider)]"></div>
        <span className="text-[10px] font-medium text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">
            {count} {count > 1 ? 'books' : 'book'}
        </span>
    </div>
);

export default SectionHeader;
