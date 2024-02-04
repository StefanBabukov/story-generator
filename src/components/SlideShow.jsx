import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/Slideshow.css'; // Import the CSS file here

const StoriesList = () => {
    const [hasMoreSlides, setHasMoreSlides] = useState(true);
    const [stories, setStories] = useState([])
    const [displayedStory, setDisplayedStory] = useState(null)

    useEffect(() => {
        const fetchFolders = async () => {
          const response = await axios.get("http://localhost:8080/stories");
          console.log('RESPONSE IS ', response)
          if (response.status===200) {
            const folders = response.data;
            console.log('FOLDERS HERE ', folders)
            setStories(folders)
            console.log(folders); // Use the folders data as needed
          } else {
            console.error('Failed to fetch folder names');
          }
        };
      
        fetchFolders();
    }, []);
    console.log('FOLDERS ARE ', stories)

    const renderCurrentStories = ()=>{
        return (
            <div className="story-list">
              {stories.map((story, index) => (
                <button key={index} className="story-button" onClick={() => setDisplayedStory(story)}>
                  {story}
                </button>
              ))}
            </div>
        );
    }

    if(!displayedStory){
        return renderCurrentStories();
    }
    return(<Story folder={displayedStory}/>)
};

const Story = ({folder})=>{
  const [subtitle, setSubtitle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStoryScript = async () => {
      try {
        // Assuming your server is set up to serve the files statically from the public directory
        const response = await fetch(`/story/${folder}/script.json`);
        if (!response.ok) throw new Error('Network response was not ok');
        const script = await response.json();
        const sound = script.frames[currentIndex].sound;
        setSubtitle(`${sound.name? `${sound.name}: `: ''} ${sound.content}`);
      } catch (error) {
        console.error("Failed to fetch story script:", error);
      }
    };

    fetchStoryScript();
  }, [folder, currentIndex]);
  
  const imagePath = `/story/${folder}/image-${currentIndex}.png`;
  const audioPath = `/story/${folder}/frame-${currentIndex}.mp3`;

  const goToNextSlide = () => {
      setCurrentIndex(currentIndex+1)
  };

  const goToPreviousSlide = () => {
      if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
      }
  };
  return (
    <div className="slide-container">
        <div className="image-container">
            <img src={imagePath} alt={`Slide ${currentIndex}`} />
            <div className="subtitle">{subtitle}</div>
        </div>
        <audio src={audioPath} autoPlay>
            Your browser does not support the audio element.
        </audio>
        <div>
            <button onClick={goToPreviousSlide} disabled={currentIndex === 0}>
                Previous
            </button>
            <button onClick={goToNextSlide}>
                Next
            </button>
        </div>
    </div>
);
}

export default StoriesList;