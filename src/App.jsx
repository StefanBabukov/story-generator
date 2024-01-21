import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import StoryInputForm from './components/StoryInputForm';
import Slideshow from './components/Slideshow';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <h1>
                            <Link to="/">Generate Story</Link>
                        </h1>
                        <h1>
                            <Link to="/watch-story">Watch Your Story</Link>
                        </h1>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<StoryInputForm />} />
                    <Route path="/watch-story" element={<Slideshow />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;