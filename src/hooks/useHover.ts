import { useContext } from 'react';
import { HoverContext } from '../context/HoverContextDefinition';

export const useHover = () => {
    const context = useContext(HoverContext);
    if (context === undefined) {
        throw new Error('useHover must be used within a HoverProvider');
    }
    return context;
};
