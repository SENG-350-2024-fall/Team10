import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Notifications = ({user}) => {
    
    return(
        <div className='landing-page'>
            <h1 style ={{justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '5em'}}> Notifications
            </h1>
        </div>
    );
};

export default Notifications;