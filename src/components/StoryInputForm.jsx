import React, { useState } from 'react';
import axios from 'axios'

const StoryInputForm = (props) =>{
    const [theme, setTheme] = useState('');
    const [genres, setGenres] = useState('');

    const buildStory = async(e)=>{
        e.preventDefault()
        const response = await axios.get("http://localhost:8080/build-story", {
            params: {description: theme, genres},
            headers: {
              'Content-Type': 'application/json'
          }
            });
          console.log('REDSPONSE IS ', response)
    }

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
