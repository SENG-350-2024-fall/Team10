import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../styles/HomePage.css';
import Button from '@mui/material/Button';
import Logo from '../assets/sengLogo.jpg';

const HomePage = ({user}) => {
    
    return(
        <div className='landing-page'>
            <div className='left-section'>
                <h1 style ={{justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '2em'}}> HELLO patient, </h1> 
                <h1 style ={{justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '5em'}}> WELCOME TO MISTER ED
                </h1> 
                <img src={Logo}></img>
            </div>
            <div className='action-selection'>
            <Button component={Link} to={`/Profile`} style={{color: 'white', justifyContent: 'center', background:'#597D35', width: '11em', height:'5em', alignContent:'center', margin:'5px'}}>Profile</Button>
            <Button component={Link} to={`/WaitTimes`} style={{color: 'white', justifyContent: 'center', background:'#597D35', width: '11em', alignContent:'center', height:'5em', margin:'5px'}}>ED Wait Times</Button>
            <Button component={Link} to={`/Status`} style={{color: 'white', justifyContent: 'center', background:'#0096C7', width: '11em', alignContent:'center',height:'5em', margin:'5px'}}>My Status</Button>
            <Button component={Link} to={`/Notifications`} style={{color: 'white', justifyContent: 'center', background:'#990F02', width: '11em', alignContent:'center',height:'5em', margin:'5px'}}>Notifications</Button>
            </div>
        </div>
    );
};

export default HomePage;