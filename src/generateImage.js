import React, { useState, useEffect } from 'react';

const Slideshow = ({ startIndex = 0, endIndex, duration = 10000 }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    useEffect(() => {
        if (currentIndex > endIndex) {
            setCurrentIndex(startIndex); // Reset to start
            return;
        }

        const timer = setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
        }, duration);

        return () => clearTimeout(timer);
    }, [currentIndex, endIndex, startIndex, duration]);

    const imagePath = `../story/image-${currentIndex}.jpg`;
    const audioPath = `../story/frame-${currentIndex}.mp3`;

    return (
        <div>
            <img src={imagePath} alt={`Slide ${currentIndex}`} />
            <audio src={audioPath} autoPlay>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default Slideshow;
