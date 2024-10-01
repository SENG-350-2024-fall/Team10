import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../styles/HomePage.css';
import Button from '@mui/material/Button';

const HomePage = ({user}) => {
    
    return(
        <div className='landing-page'>
            <h1 style ={{justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '5em'}}> WELCOME TO MISTER ED
            </h1>
            <div className='action-selection'>
            <Button component={Link} to={`/Profile`} style={{color: 'white', justifyContent: 'center', background:'#597D35', border: '2px solid black', width: '10em', alignContent:'center'}}>Check Profile</Button>
            </div>
        </div>
    );
};

export default HomePage;