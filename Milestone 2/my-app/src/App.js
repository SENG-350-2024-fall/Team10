import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {

    return (
        <Router>
            <Routes>
            <Route path="/" />  {/* the landing home page*/}
            </Routes>
        </Router>
    );
};
export default App;