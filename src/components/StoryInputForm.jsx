import React, { useState } from 'react';
import buildStoryScript from '../buildStoryScript';
import generateImage from '../generateImage';
import generateSound from '../generateSound';

function StoryInputForm(props) {
    const [theme, setTheme] = useState('');
    const [genres, setGenres] = useState('');
    
    // function delay(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    const buildStory = async(e) => {
        e.preventDefault(); 
    
        const script = await buildStoryScript({theme, genres})
    
        const imageRequests = []
        const soundRequests = []
        const {style, title, folderTitle} = script;
        const storyCharacters = Object.keys(script.charactersDescription)
        console.log('SANITISED TITLE IS ', folderTitle)
        // Throttling control
        const enableThrottling = true; // Set to false to disable throttling
        const maxRequestsPerMinute = 7;
        const delayBetweenRequests = enableThrottling ? 60000 / maxRequestsPerMinute : 0;
    
        for (let indx = 0; indx < script.frames.length; indx++) {
            const frame = script.frames[indx];
    
            const charactersInFrame = []
            storyCharacters.forEach((character)=>{
                if(frame.image.includes(character)){
                    charactersInFrame.push(character)
                }
            })
            let currentImagePrompt= '';
            console.log('charactersInFrame.length', charactersInFrame.length)
            if (charactersInFrame.length){
                const characterInfo = charactersInFrame.map((character)=> (`${character}: ${JSON.stringify(script.charactersDescription[character].description)}`))
                currentImagePrompt += `Image style: ${style} Characters: #${characterInfo}#`
            }
            currentImagePrompt += `Generate an image based on this information:
            ##${frame.image}##
            `
    
            console.log('CURRENT PROMPT ', frame.sound)
            // getting the voice type from the character name
            const storyPath = `../public/story/${folderTitle}`
            const voiceType = script.charactersDescription[frame.sound.type]?.voiceType || 'nova';
            soundRequests.push(generateSound(frame.sound, `${storyPath}/frame-${indx}.mp3`, voiceType))
    
            // Throttling image requests
            if (enableThrottling && indx > 0) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
            }
            imageRequests.push(generateImage(currentImagePrompt, `${storyPath}/image-${indx}.png`))
        }
    
        const images = await Promise.all(imageRequests);
        const sounds = await Promise.all(soundRequests);
        console.log('SOUNDS ARE ', sounds);
    };

    return (
        <form>
            <label>
                Story Theme/Subject:
                <input type="text" value={theme} onChange={e => setTheme(e.target.value)} />
            </label>
            <label>
                Genres:
                <input type="text" value={genres} onChange={e => setGenres(e.target.value)} />
            </label>
            <button onClick={(e)=>buildStory(e)}>Submit</button>
            {/* {imageURL && <img src={imageURL} alt="prompt" />} */}
        </form>
    );
}

export default StoryInputForm;
