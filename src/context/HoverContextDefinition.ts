import { createContext } from 'react';
import { AmbientMedia } from '../types/book';

export interface HoverContextType {
    hoveredImage: string | null;
    setHoveredImage: (image: string | null) => void;
    hoveredMedia: AmbientMedia | null;
    setHoveredMedia: (media: AmbientMedia | null) => void;
}

export const HoverContext = createContext<HoverContextType | undefined>(undefined);
