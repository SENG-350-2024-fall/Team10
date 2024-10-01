import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../styles/HomePage.css';
import Button from '@mui/material/Button';
import Logo from '../assets/sengLogo.jpg';

const HomePage = ({user}) => {
    
    return(
        <div className='landing-page'>
            <h1 style ={{justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '5em'}}> WELCOME TO MISTER ED
            </h1> 
            <img src={Logo}></img>
            <div className='action-selection'>
            <Button component={Link} to={`/Profile`} style={{color: 'white', justifyContent: 'center', background:'#597D35', border: '2px solid black', width: '10em', alignContent:'center', margin:'5px'}}>Profile</Button>
            <Button component={Link} to={`/Times`} style={{color: 'white', justifyContent: 'center', background:'#597D35', border: '2px solid black', width: '10em', alignContent:'center', margin:'5px'}}>ED Times</Button>
            <Button component={Link} to={`/Profile`} style={{color: 'white', justifyContent: 'center', background:'#990F02', border: '2px solid black', width: '10em', alignContent:'center', margin:'5px'}}>Notifications</Button>
            </div>
        </div>
    );
};

export default HomePage;