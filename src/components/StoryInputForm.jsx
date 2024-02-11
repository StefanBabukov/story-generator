import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const StoryInputForm = () => {
    const [theme, setTheme] = useState('');
    const [genres, setGenres] = useState('');

    const buildStory = async (e) => {
        e.preventDefault();
        const response = await axios.get("http://localhost:8080/build-story", {
            params: { description: theme, genres },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Story response is ', response);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Change to minHeight to allow content to expand
            minWidth: '100vw', // Change to minWidth to cover full viewport width
            padding: '20px',
            boxSizing: 'border-box',
            backgroundImage: 'linear-gradient(to right top, #63A088, #5A9188, #50827B, #456E6E, #3A5A61)',
            overflow:'hidden'
        }}>
            <Box sx={{ 
                p: 7,
                backgroundColor: '#56638A',
                borderRadius: 5,
                boxShadow: 9,
                maxWidth: 'calc(100% - 40px)', // Adjust width to prevent overflow due to padding
                boxSizing: 'border-box',
            }}>
                <Typography variant="h5" component="h2" sx={{ color: '#FFFFFF', mb: 2 }}>Submit Your Story Theme</Typography>
                <form>
                    <TextField 
                        fullWidth 
                        label="Story Theme/Subject" 
                        variant="filled" 
                        value={theme} 
                        onChange={e => setTheme(e.target.value)} 
                        margin="normal" 
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
                    />
                    <TextField 
                        fullWidth 
                        label="Genres" 
                        variant="filled" 
                        value={genres} 
                        onChange={e => setGenres(e.target.value)} 
                        margin="normal" 
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
                    />
                    <Button onClick={buildStory} variant="contained" sx={{ mt: 2, backgroundColor:'#56203D' }}>Submit</Button>
                </form>
            </Box>
        </Box>
    );
};

export default StoryInputForm;
