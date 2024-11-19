import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Status = ({ user }) => {
    const [progress, setProgress] = useState(0);

    const stages = [
        { label: 'Waiting for Triage', start: 0, end: 33, color: '#f44336' }, // Red
        { label: 'In Triage', start: 33, end: 66, color: '#ffa726' },         // Orange
        { label: 'Recommendation Posted', start: 66, end: 100, color: '#4caf50' } // Green
    ];

    // Simulate progress update for demonstration purposes
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return Math.min(oldProgress + 1, 100); // Increment by 1% for smooth filling
            });
        }, 100); // Update every 100ms for a smoother animation

        return () => {
            clearInterval(timer);
        };
    }, []);

    // Function to calculate the fill width for each stage based on progress
    const getFillWidth = (start, end) => {
        if (progress < start) return '0%'; // Not filled if progress is before this stage
        if (progress >= end) return '100%'; // Fully filled if progress is past this stage
        return `${((progress - start) / (end - start)) * 100}%`; // Partially filled
    };

    return (
        <div style={{ textAlign: 'center', padding: '2em' }}>
            <h1 style={{ color: 'grey', fontWeight: 'bold', fontSize: '3em' }}>Your Status</h1>
            <Typography variant="h6" color="textSecondary">
                Form Processing Status
            </Typography>
            <Box width="80%" mt={4} mx="auto">
                <Box
                    display="flex"
                    position="relative"
                    height={30}
                    borderRadius={5}
                    overflow="hidden"
                    bgcolor="#e0e0e0"
                >
                    {stages.map((stage, index) => (
                        <Box
                            key={index}
                            flexGrow={1}
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-start" // Start fill from the left side
                            color="white"
                            position="relative"
                            style={{
                                backgroundColor: '#e0e0e0', // Default grey for each section
                                borderRight: index < stages.length - 1 ? '1px solid #fff' : 'none',
                            }}
                        >
                            {/* Inner box for the actual filling color, based on progress */}
                            <Box
                                width={getFillWidth(stage.start, stage.end)}
                                height="100%"
                                bgcolor={stage.color}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                style={{
                                    transition: 'width 0.3s ease',
                                    color: 'white',
                                    borderRadius: index === 0 ? '5px 0 0 5px' : index === stages.length - 1 ? '0 5px 5px 0' : '0'
                                }}
                            >
                                {/* Display label only for the active section */}
                                {progress >= stage.start && progress < stage.end && stage.label}
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Typography variant="body1" color="textSecondary" mt={2}>
                    {Math.round(progress)}%
                </Typography>
                {progress === 100 && (
                    <Typography
                        variant="h6"
                        color="primary"
                        style={{ marginTop: '1em', fontWeight: 'bold', fontSize: '1.8em' }}
                    >
                        Your triage is complete. Check the Notifications tab for further instructions.
                    </Typography>
                )}
            </Box>
        </div>
    );
};

export default Status;
