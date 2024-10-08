import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

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
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/Status" element={<Status />} />
            <Route path="/WaitTimes" element={<WaitTimes />} />
            </Routes>
        </Router>
    );
};
export default App;