import React from 'react';
import './App.css';
import StoryInputForm from './components/StoryInputForm';
import ImageGeneration from './components/ImageGeneration';
function App() {
    // const handleStoryData = (data) => {
    //     // For demonstration purposes, just setting the state. You'd typically send this to a server or to GPT.
    //     setStoryData(data);
    // };

    return (
        <div className="App">
            <h1>Story Generator</h1>
            <StoryInputForm/>
            {/* <ImageGeneration/> */}
        </div>
    );
}

export default App;