import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Import Box for flexible styling
import './App.css';
import StoryInputForm from './components/StoryInputForm';
import Slideshow from './components/Slideshow';

function App() {
    const navButtonStyle = {
        color: '#fff', // Ensures text color is white
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Lighter shade on hover
        },
    }
    return(
        <Router>
            <div className="App">
                <AppBar position="static" sx={{ backgroundColor: '#56203D' }}> {/* Change AppBar color */}
                    <Toolbar sx={{ justifyContent: 'center' }}> {/* Center the content */}
                        <Box sx={{ textAlign: 'center', '& > *': { margin: '0 10px' } }}>
                            {/* Wrap navigation links for better control */}
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'inline' }}>
                                <Link to="/" style={{...navButtonStyle, textDecoration: 'none', color: 'inherit', marginRight: '20px'}}>Generate Story</Link>
                            </Typography>
                            {/* Customize Button color on hover */}
                            <Button 
                                color="inherit" 
                                component={Link} 
                                to="/stories"
                                sx={navButtonStyle}
                            >
                                Your Stories
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Routes>
                    <Route exact path="/" element={<StoryInputForm />} />
                    <Route path="/stories" element={<Slideshow />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
