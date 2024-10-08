import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//pages
import HomePage from './HomePage.js';
import Profile from './Profile.js';
import Notifications from './Notifications.js';
import Status from './Status.js';
import WaitTimes from './WaitTimes.js';
const App = () => {

    return (
        <Router>
            <Routes>
            <Route path="/"element={<HomePage />} />  {/* the landing home page*/}
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Notifications" element={<Profile />} />
            <Route path="/Status" element={<Profile />} />
            <Route path="/WaitTimes" element={<Profile />} />
            </Routes>
        </Router>
    );
};
export default App;