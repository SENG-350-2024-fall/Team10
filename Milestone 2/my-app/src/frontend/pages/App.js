import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//pages
import HomePage from './HomePage.js';
import Profile from './Profile.js';
const App = () => {

    return (
        <Router>
            <Routes>
            <Route path="/"element={<HomePage />} />  {/* the landing home page*/}
            <Route path="/Profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};
export default App;