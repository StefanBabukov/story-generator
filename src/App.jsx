import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
                            <a href="/">Generate Story</a>
                        </h1>
                        <h1>
                            <a href="/stories">Your stories</a>
                        </h1>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<StoryInputForm />} />
                    <Route path="/stories" element={<Slideshow />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
