import React, { useState, ReactNode } from 'react';
import { HoverContext } from './HoverContextDefinition';
import { AmbientMedia } from '../types/book';

export const HoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [hoveredMedia, setHoveredMedia] = useState<AmbientMedia | null>(null);

    return (
        <HoverContext.Provider value={{
            hoveredImage,
            setHoveredImage,
            hoveredMedia,
            setHoveredMedia
        }}>
            {children}
        </HoverContext.Provider>
    );
};
