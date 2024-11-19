import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Logo from '../assets/sengLogo.jpg';

// pages
import HomePage from './HomePage.js';
import Profile from './Profile.js';
import Notifications from './Notifications.js';
import Status from './Status.js';
import WaitTimes from './WaitTimes.js';
import TriageForm from './TriageForm.js';


const Login = ({ onLogin }) => {
    const [userType, setUserType] = useState('patient'); // Toggle between 'patient' and 'clinician'
    const [healthNumber, setHealthNumber] = useState('');
    const [password, setPassword] = useState('');
    const [employerID, setEmployerID] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (userType === 'patient') {
            if (healthNumber === '123456' && password === 'catsRcool') {
                onLogin();
            } else {
                setError('Invalid Health Number or Password.');
            }
        } else if (userType === 'clinician') {
            if (employerID && password) {
                onLogin(); // Accepts any input for clinician login
            } else {
                setError('Invalid Employer ID or Password.');
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '2%' }}>
            <h1 style={{fontWeight: 'bold', fontSize: '3.5em', color: 'grey'}}>MISTER ED</h1>
            <img src={Logo} alt="Logo" style={{ width: '300px', marginBottom: '10px' }} />
            <h1 style={{fontWeight: 'bold', fontSize: '2em', color: 'grey'}}>LOGIN as:</h1>
            <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '1.2em', marginRight: '20px' }}>
                        <input
                            type="radio"
                            value="patient"
                            checked={userType === 'patient'}
                            onChange={() => setUserType('patient')}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginRight: '10px',
                                appearance: 'none', // Remove default styling
                                border: '2px solid grey',
                                borderRadius: '50%',
                                outline: 'none',
                                cursor: 'pointer',
                                backgroundColor: userType === 'patient' ? '#3cb043' : 'white', // Green when selected
                                transition: 'background-color 0.2s, border-color 0.2s',
                            }}
                        />
                        Patient
                    </label>
                    <label style={{ fontSize: '1.2em', marginLeft: '20px' }}>
                        <input
                            type="radio"
                            value="clinician"
                            checked={userType === 'clinician'}
                            onChange={() => setUserType('clinician')}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginRight: '10px',
                                appearance: 'none', // Remove default styling
                                border: '2px solid grey',
                                borderRadius: '50%',
                                outline: 'none',
                                cursor: 'pointer',
                                backgroundColor: userType === 'clinician' ? '#3cb043' : 'white', // Green when selected
                                transition: 'background-color 0.2s, border-color 0.2s',
                            }}
                        />
                        Clinician
                    </label>
                </div>

                {userType === 'patient' && (
                    <>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Health Number:</label><br />
                            <input
                                type="text"
                                value={healthNumber}
                                onChange={(e) => setHealthNumber(e.target.value)}
                                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Password:</label><br />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
                            />
                        </div>
                    </>
                )}

                {userType === 'clinician' && (
                    <>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Employer ID Number:</label><br />
                            <input
                                type="text"
                                value={employerID}
                                onChange={(e) => setEmployerID(e.target.value)}
                                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Password:</label><br />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
                            />
                        </div>
                    </>
                )}

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ padding: '10px 10px', background: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.5em' }}>
                    Login
                </button>
            </form>
        </div>
    );
};



const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            {isLoggedIn ? (
                <Routes>
                    <Route path="/" element={<HomePage />} /> {/* the landing home page */}
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Notifications" element={<Notifications />} />
                    <Route path="/Status" element={<Status />} />
                    <Route path="/WaitTimes" element={<WaitTimes />} />
                    <Route path="/TriageForm" element={<TriageForm />} />
                </Routes>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </Router>
    );
};

export default App;
