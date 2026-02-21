import React, { useRef } from 'react';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    value,
    onChange,
    placeholder,
    className
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const wrapSelection = (prefix: string, suffix: string = prefix) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        const beforeText = value.substring(0, start);
        const afterText = value.substring(end);

        const newText = beforeText + prefix + selectedText + suffix + afterText;
        onChange(newText);

        // Restore selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + prefix.length,
                end + prefix.length
            );
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    wrapSelection('**');
                    break;
                case 'i':
                    e.preventDefault();
                    wrapSelection('*');
                    break;
                case 'u':
                    e.preventDefault();
                    wrapSelection('<u>', '</u>');
                    break;
                case 'h':
                    e.preventDefault();
                    const textarea = textareaRef.current;
                    if (textarea) {
                        const start = textarea.selectionStart;
                        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                        const newText = value.substring(0, lineStart) + '### ' + value.substring(lineStart);
                        onChange(newText);
                        setTimeout(() => {
                            textarea.focus();
                            textarea.setSelectionRange(start + 4, start + 4);
                        }, 0);
                    }
                    break;
                case 'q':
                    e.preventDefault();
                    wrapSelection('!!: ', ' !!');
                    break;
            }
        } else if (e.key === 'Enter') {
            const textarea = textareaRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart;
            const textBeforeCursor = value.substring(0, start);
            const lines = textBeforeCursor.split('\n');
            const currentLine = lines[lines.length - 1];

            // Match bullets like "- ", "* ", "1. ", or blockquotes "> "
            const bulletMatch = currentLine.match(/^(\s*([-*]|\d+\.|>))\s*/);
            if (bulletMatch) {
                const prefix = bulletMatch[1].trim() === '>' ? '> ' : (bulletMatch[1] + ' ');

                // If the line is just the bullet/quote, clear it (standard behavior when pressing Enter on empty item)
                if (currentLine.trim() === bulletMatch[1].trim()) {
                    e.preventDefault();
                    const newText = value.substring(0, start - currentLine.length) + '\n' + value.substring(start);
                    onChange(newText);
                } else {
                    e.preventDefault();
                    const newText = value.substring(0, start) + '\n' + prefix + value.substring(start);
                    onChange(newText);

                    setTimeout(() => {
                        textarea.focus();
                        textarea.setSelectionRange(start + 1 + prefix.length, start + 1 + prefix.length);
                    }, 0);
                }
            }
        }
    };

    return (
        <textarea
            ref={textareaRef}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
};

export default MarkdownEditor;
