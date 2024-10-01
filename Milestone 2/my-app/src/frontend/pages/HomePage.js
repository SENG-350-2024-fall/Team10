import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const HomePage = ({user}) => {
    
    return(
        <div className='landing-page'>
            <h1 style ={{justifyContent: 'center', color: 'blue', textAlign: 'center', fontWeight: 'bold'}}> WELCOME TO MISTER ED
            </h1>
        </div>
    );
};

export default HomePage;