import React, { useState } from 'react';
import buildStoryScript from '../buildStoryScript';
import generateImage from '../generateImage';
import generateSound from '../generateSound';

function StoryInputForm(props) {
    const [theme, setTheme] = useState('');
    const [genres, setGenres] = useState('');
    const generateImageWithExponentialBackoff = async (prompt, imagePath, attempt = 0) => {
        try {
            // Attempt to generate the image
            return await generateImage(prompt, imagePath);
        } catch (error) {
            if (error.status === 429) { // Rate limit exceeded error
                const maxAttempts = 5;
                if (attempt < maxAttempts) {
                    // Calculate wait time with exponential backoff
                    // Here, we start with a base delay of 2 seconds and double it with each retry
                    const waitTime = Math.pow(2, attempt) * 2000; // 2, 4, 8, 16, 32 seconds...
                    console.log(`Rate limit exceeded, retrying in ${waitTime / 1000} seconds...`);
                    // Wait for the calculated time before retrying
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    // Retry with increased attempt count
                    return generateImageWithExponentialBackoff(prompt, imagePath, attempt + 1);
                } else {
                    // Max attempts reached, throw error
                    throw new Error('Max retry attempts reached for generating image.');
                }
            } else {
                // For other errors, rethrow them
                throw error;
            }
        }
    };
    const buildStory = async(e) => {    
        e.preventDefault();
        const script = await buildStoryScript({ theme, genres });
    
        const imageRequests = [];
        const soundRequests = [];
    
        const { style, folderTitle } = script;
        const storyCharacters = Object.keys(script.charactersDescription);
        const storyPath = `../public/story/${folderTitle}`;
    
        const MAX_IMAGES_PER_MINUTE = 7;
        const THROTTLE_ENABLED = true;
        // Calculate delay between requests for throttling
        // const delayBetweenRequests = THROTTLE_ENABLED ? 60000 / MAX_IMAGES_PER_MINUTE : 0;
        let previousScenes = [];
           
        // Now, process sound requests
        script.frames.forEach((frame, indx) => {
            console.log('CURRENT PROMPT ', frame.sound)
            // getting the voice type from the character name
            const voiceType = script.charactersDescription[frame.sound.type]?.voiceType || 'nova';
            soundRequests.push(generateSound(frame.sound, `${storyPath}/frame-${indx}.mp3`, voiceType))
        });
    
        // Wait for all sound requests to complete
        await Promise.all(soundRequests);

        for (let indx = 0; indx < script.frames.length; indx++) {
            const frame = script.frames[indx];
            console.log('GENERATING IMAGE FOR SCENE ', frame)
            const charactersInFrame = [];
            storyCharacters.forEach((character) => {
                if (frame.image.includes(character)) {
                    charactersInFrame.push(character);
                }
            });
    
            let currentImagePrompt = '';
            console.log('charactersInFrame.length', charactersInFrame.length);
    
            if (charactersInFrame.length) {
                const characterInfo = charactersInFrame.map((character) => (`${character}: ${JSON.stringify(script.charactersDescription[character].description)}`));
                currentImagePrompt += `Comic ${script.title}:
                Image style: ${style} Characters: #${characterInfo}#`;
            }
    
            currentImagePrompt += `
                ##${frame.image}## 
                ${previousScenes.length ? `Previous scenes were: ${previousScenes }.`: ''} 
                Don't add text in the image.
            `;
            previousScenes.push(frame.image);
            // Function to generate image with delay
    
            imageRequests.push(generateImageWithExponentialBackoff(currentImagePrompt, `${storyPath}/image-${indx}.png`));
        }
    
        // Wait for all image requests to complete
        await Promise.all(imageRequests);
        console.log('STORY GENERATION DONE!')
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
            <button onClick={async (e)=>await buildStory(e)}>Submit</button>
            {/* {imageURL && <img src={imageURL} alt="prompt" />} */}
        </form>
    );
}

export default StoryInputForm;
