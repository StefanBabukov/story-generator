import React, { useState } from 'react';
import buildStoryScript from '../buildStoryScript';
import generateImage from '../generateImage';
import generateSound from '../generateSound';

function StoryInputForm(props) {
    const [theme, setTheme] = useState('');
    const [genres, setGenres] = useState('');
    // const [duration, setDuration] = useState('');
    // const [characters, setCharacters] = useState('');
    // const [setting, setSetting] = useState('');
    // const [events, setEvents] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault(); 

        // const storyData = {
        //     theme,
        //     genres,
        //     duration,
        //     characters,
        //     setting,
        //     events
        // };
        const script =await buildStoryScript({theme, genres})

        const imageRequests = []
        const soundRequests = []
        const storyCharacters = Object.keys(script.charactersDescription)
        script.frames.forEach((frame, indx)=>{

            const charactersInFrame = []
            storyCharacters.forEach((character)=>{
                if(frame.image.includes(character)){
                    charactersInFrame.push(character)
                }
            })
            let currentImagePrompt= '';
            console.log('charactersInFrame.length', charactersInFrame.length)
            if (charactersInFrame.length){
                const characterInfo = charactersInFrame.map((character)=> (`${character}: ${JSON.stringify(script.charactersDescription[character])}`))
                currentImagePrompt += `Here is how the mentioned characters look: ##${characterInfo} ##`
            }
            currentImagePrompt += `Generate an image based on this information:
            ##${frame.image}##
            `

            console.log('CURRENT PROMPT ', frame.sound)
            soundRequests.push(generateSound(frame.sound, indx))
            // imageRequests.push(generateImage(currentImagePrompt, indx))
        })
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
            <label>
                Duration:
                <input type="text" value={duration} onChange={e => setDuration(e.target.value)} />
            </label>
            <label>
                Main Characters:
                <input type="text" value={characters} onChange={e => setCharacters(e.target.value)} />
            </label>
            <label>
                Setting/Environment:
                <input type="text" value={setting} onChange={e => setSetting(e.target.value)} />
            </label>
            <label>
                Key Events or Twists:
                <textarea value={events} onChange={e => setEvents(e.target.value)} />
            </label>
            <button onClick={(e)=>handleSubmit(e)}>Submit</button>
            {/* {imageURL && <img src={imageURL} alt="prompt" />} */}
        </form>
    );
}

export default StoryInputForm;
