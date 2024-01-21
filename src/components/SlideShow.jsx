import React, { useState, useEffect } from 'react';
const Slideshow = ({ startIndex = 0, endIndex, duration = 10000 }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [hasMoreSlides, setHasMoreSlides] = useState(true);

    // useEffect(() => {
    //     if (currentIndex > endIndex) {
    //         setHasMoreSlides(false);
    //         return;
    //     }

    //     const timer = setTimeout(() => {
    //         setCurrentIndex(currentIndex + 1);
    //     }, duration);

    //     return () => clearTimeout(timer);
    // }, [currentIndex, endIndex, duration]);

    const goToNextSlide = () => {
        setCurrentIndex(currentIndex+1)
    };

    const goToPreviousSlide = () => {
        if (currentIndex > startIndex) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const imagePath = `/story/image-${currentIndex}.png`;
    const audioPath = `/story/frame-${currentIndex}.mp3`;

    return (
        <div>
            <img src={imagePath} alt={`Slide ${currentIndex}`} />
            <audio src={audioPath} autoPlay>
                Your browser does not support the audio element.
            </audio>
            <div>
                <button onClick={goToPreviousSlide} disabled={currentIndex === startIndex}>
                    Previous
                </button>
                <button onClick={goToNextSlide}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Slideshow;