import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '@mui/material/Button';
import mapMarker from '../assets/mapMarker.png';

// Custom red marker icon
const redIcon = new L.Icon({
    iconUrl: mapMarker,
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const WaitTimes = ({ user }) => {

    const locations = [
        { name: 'Royal Jubilee Hospital', position: [48.4327, -123.3276], waitTime: '30 minutes' },
        { name: 'Victoria General Hospital', position: [48.4668, -123.4326], waitTime: '45 minutes' },
        { name: 'Saanich Peninsula Hospital', position: [48.6005, -123.4167], waitTime: 'X minutes' },
    ];

    const position = locations[0].position;

    return (
        <div>
            <h1 style={{ justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '5em' }}>
                ED Wait Times Near You
            </h1>

            {/* Add a map with a Marker and Popup */}
            <div style={{ height: '500px', width: '100%', marginTop: '20px' }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location, index) => (
                    <Marker key={index} position={location.position} icon={redIcon}>
                        <Popup>
                            {location.name} <br /> Current Wait Time: {location.waitTime}.
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            </div>
        </div>
    );
};

export default WaitTimes;
