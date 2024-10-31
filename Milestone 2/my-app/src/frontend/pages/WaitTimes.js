import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';
import mapMarker from '../assets/mapMarker.png';

const redIcon = new L.Icon({
    iconUrl: mapMarker,
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const WaitTimes = ({ user }) => {
    const [isMapView, setIsMapView] = useState(true);
    const [mapError, setMapError] = useState(false);

    const locations = [
        { name: 'Royal Jubilee Hospital', position: [48.4327, -123.3276], waitTime: '30 minutes' },
        { name: 'Victoria General Hospital', position: [48.4668, -123.4326], waitTime: '45 minutes' },
        { name: 'Saanich Peninsula Hospital', position: [48.6005, -123.4167], waitTime: 'X minutes' },
        { name: 'Lady Minto / Gulf Islands Hospital', position: [48.8546, -123.5007], waitTime: 'X minutes' },
        { name: 'Cowichan District Hospital', position: [48.7829, -123.7079], waitTime: 'X minutes' },
        { name: 'Ladysmith Emergency Department', position: [48.9939, -123.8160], waitTime: 'X minutes' },
    ];

    const position = locations[0].position;

    useEffect(() => {
        // Check if map library is available by attempting to render MapContainer
        try {
            const testMap = <MapContainer center={position} zoom={13} style={{ display: 'none' }} />;
            setMapError(false);
        } catch (error) {
            console.error("Map library is unavailable:", error);
            setMapError(true);
            setIsMapView(false);
        }
    }, []);

    return (
        <div>
            <h1 style={{ justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '4em' }}>
                Emergency Departments Near You
            </h1>
            <h1 style={{ justifyContent: 'center', color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: '1em' }}>
                {mapError ? "Map view is currently unavailable - under maintenance" : isMapView ? "Click on a pin to view wait times" : "List of Nearby Emergency Departments"}
            </h1>

            {/* Toggle Switch for Map/List View */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                <span style={{ fontSize: '1.2em', marginRight: '10px' }}>List View</span>
                <Switch
                    checked={isMapView}
                    onChange={() => setIsMapView(!isMapView)}
                    color="primary"
                    inputProps={{ 'aria-label': 'toggle between map and list view' }}
                    disabled={mapError} // Disable switch if map is unavailable
                />
                <span style={{ fontSize: '1.2em', marginLeft: '10px' }}>Map View</span>
            </div>

            {/* Conditional Rendering: Map View or List View */}
            {isMapView ? (
                // Map View
                <div style={{ height: '500px', width: '100%', marginTop: '10px' }}>
                    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {locations.map((location, index) => (
                            <Marker key={index} position={location.position} icon={redIcon}>
                                <Popup>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                        <span style={{fontWeight: 'bold', fontSize: '1.5em'}}>{location.name}</span>
                                        <span style={{fontSize:'1.2em'}}>Current Wait Time: <span style={{fontWeight:'bold'}}>{location.waitTime}</span></span>
                                        <Button component={Link} to={`/TriageForm`} style={{color: 'white', justifyContent: 'center', background:'green', width: '12em', height:'4em', marginTop:'10px'}}>
                                            Medical Triage
                                        </Button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            ) : (
                // List View
                <div style={{ padding: '20px', backgroundColor: '#eeeeee', borderRadius: '30px', margin:'15px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '10px', fontSize: '1.2em' }}>ED Name</th>
                                <th style={{ textAlign: 'left', padding: '10px', fontSize: '1.2em' }}>Current Wait Time</th>
                                <th style={{ textAlign: 'center', padding: '10px', fontSize: '1.2em' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', fontSize: '1.2em' }}>{location.name}</td>
                                    <td style={{ padding: '10px', fontSize: '1.2em' }}>{location.waitTime}</td>
                                    <td style={{ textAlign: 'center', padding: '10px' }}>
                                        <Button 
                                            component={Link} 
                                            to={`/TriageForm`} 
                                            style={{color: 'white', background:'green', width: '12em', height:'3em'}}>
                                            Medical Triage
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WaitTimes;
