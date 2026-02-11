import React, { useState, useEffect } from 'react';
import { useHover } from '../hooks/useHover';

const HoverOverlay: React.FC = () => {
    const { hoveredMedia } = useHover();
    const [shouldShow, setShouldShow] = useState(false);
    const [activeMedia, setActiveMedia] = useState(hoveredMedia);

    useEffect(() => {
        // Always trigger fade out immediately on any change (out or between books)
        setShouldShow(false);

        if (hoveredMedia) {
            const timer = setTimeout(() => {
                setActiveMedia(hoveredMedia);
                setShouldShow(true);
            }, 1000); // 1s debounce for showing
            return () => clearTimeout(timer);
        } else {
            // After fade out completes, clear the active media
            const timer = setTimeout(() => setActiveMedia(null), 500);
            return () => clearTimeout(timer);
        }
    }, [hoveredMedia]);

    return (
        <div
            className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-500 ease-in-out ${shouldShow ? 'opacity-20' : 'opacity-0'}`}
        >
            {activeMedia && (
                <div className="w-full h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 blur-3xl scale-110" />
                    {activeMedia.type === 'video' ? (
                        <video
                            key={activeMedia.url}
                            src={activeMedia.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover scale-105"
                        />
                    ) : (
                        <img
                            src={activeMedia.url}
                            alt="Ambient Background"
                            className="w-full h-full object-cover scale-105 blur-[2px]"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
                </div>
            )}
        </div>
    );
};

export default HoverOverlay;
