import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';
import Button from '@mui/material/Button';
import Logo from '../assets/sengLogo.jpg';

const HomePage = () => {
  const [patientName, setPatientName] = useState('patient');

  useEffect(() => {
    const fetchPatientName = async () => {
      try {
        const response = await axios.get('http://localhost:4000/patient_data/123456');
        if (response.data && response.data.name) {
          setPatientName(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching patient name:', error);
      }
    };

    fetchPatientName();
  }, []);

  return (
    <div className='landing-page'>
      <div className='left-section'>
        <h1 style={{
          justifyContent: 'center',
          color: 'grey',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '2em'
        }}> HELLO {patientName}, </h1>  {/* Display patient name if available */}
        
        <h1 style={{
          justifyContent: 'center',
          color: 'grey',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '5em'
        }}> WELCOME TO MISTER ED </h1>
        
        <img src={Logo} alt="Logo"></img>
      </div>
      
      <div className='action-selection'>
        <Button component={Link} to={`/Profile`} style={{ color: 'white', justifyContent: 'center', background: '#597D35', width: '20em', height: '5em', alignContent: 'center', margin: '5px' }}>Profile</Button>
        <Button component={Link} to={`/WaitTimes`} style={{ color: 'white', justifyContent: 'center', background: '#597D35', width: '20em', alignContent: 'center', height: '5em', margin: '5px' }}>ED Wait Times</Button>
        <Button component={Link} to={`/Status`} style={{ color: 'white', justifyContent: 'center', background: '#0096C7', width: '20em', alignContent: 'center', height: '5em', margin: '5px' }}>My Status</Button>
        <Button component={Link} to={`/Notifications`} style={{ color: 'white', justifyContent: 'center', background: '#990F02', width: '20em', alignContent: 'center', height: '5em', margin: '5px' }}>Notifications</Button>
      </div>
    </div>
  );
};

export default HomePage;
