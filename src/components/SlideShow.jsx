import React, { useState, useEffect } from 'react';

const SlideShow = ({ media, duration = 10000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % media.length);
        }, duration);

        return () => clearTimeout(timer);
    }, [currentIndex, media.length, duration]);

    const currentMedia = media[currentIndex];

    return (
        <div>
            <img src={currentMedia.image} alt={`Slide ${currentIndex}`} />
            <audio src={currentMedia.audio} autoPlay>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default SlideShow;
