import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StoriesList = () => {
  const [stories, setStories] = useState([]);
  const [displayedStory, setDisplayedStory] = useState(null);

  useEffect(() => {
      const fetchFolders = async () => {
          const response = await axios.get("http://localhost:8080/stories");
          if (response.status === 200) {
              setStories(response.data);
          } else {
              console.error('Failed to fetch stories');
          }
      };
    
      fetchFolders();
  }, []);

  const renderCurrentStories = () => {
      return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              {stories.map((story, index) => (
                  <Card key={index} sx={{ maxWidth: 345, minWidth: 275 }}>
                      <CardContent>
                          <p gutterBottomcomponent="div">
                              {story}
                          </p>
                          {/* <Typography variant="body2" color="text.secondary">
                              {story.description}
                          </Typography> */}
                      </CardContent>
                      <CardActions>
                          <Button size="small" onClick={() => setDisplayedStory(story)}>
                              View Story
                          </Button>
                      </CardActions>
                  </Card>
              ))}
          </div>
      );
  };

  if (!displayedStory) {
      return renderCurrentStories();
  }
  return (<Story folder={displayedStory} />);
};

const Story = ({ folder }) => {
  const [subtitle, setSubtitle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStoryScript = async () => {
      try {
        const response = await fetch(`/story/${folder}/script.json`);
        if (!response.ok) throw new Error('Network response was not ok');
        const script = await response.json();
        const sound = script.frames[currentIndex].sound;
        setSubtitle(`${sound.type && sound.type !== 'Narrator' ? `${sound.type}: ` : ''}${sound.content}`);
      } catch (error) {
        console.error("Failed to fetch story script:", error);
      }
    };

    fetchStoryScript();
  }, [folder, currentIndex]);

  const imagePath = `/story/${folder}/image-${currentIndex}.png`;
  const audioPath = `/story/${folder}/frame-${currentIndex}.mp3`;

  const goToNextSlide = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const goToPreviousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slide-container" style={{overflow: 'hidden'}}>
      <div className="image-container" style={{ position: 'relative' }}>
        <img src={imagePath} alt={`Slide ${currentIndex}`}  />
        <div className="subtitle" style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          color: '#FFF', // White text color
          width: '100%',
          textAlign: 'center',
          padding: '10px', // Adjust padding as needed
        }}>
          {subtitle}
        </div>
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
};


export default StoriesList;