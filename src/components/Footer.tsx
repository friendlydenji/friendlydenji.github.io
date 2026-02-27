import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 border-t border-gray-100 dark:border-gray-800 text-center text-[var(--text-secondary)] text-sm">
            &copy; {currentYear} Mike Library (Inspired by <a href="https://minh.la/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--text-primary)] transition-colors">minh.la</a>).
        </footer>
    );
};

export default Footer;
