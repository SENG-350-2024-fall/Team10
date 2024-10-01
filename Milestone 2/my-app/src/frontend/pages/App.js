import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//pages
import HomePage from './HomePage.js';

const App = () => {

    return (
        <Router>
            <Routes>
            <Route path="/"element={<HomePage />} />  {/* the landing home page*/}
            </Routes>
        </Router>
    );
};
export default App;