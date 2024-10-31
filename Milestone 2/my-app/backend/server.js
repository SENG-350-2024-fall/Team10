const express = require('express');
const bodyParser = require('body-parser');
const patientsRouter = require('./patientData.js');
const cors = require('cors');

const app = express();
const port = 4000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',  // Allow frontend to access the backend
}));
app.use('/uploads', express.static('uploads'));


// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json({ limit: '210mb' }));  // Increase JSON payload size limit
app.use(bodyParser.urlencoded({ extended: true, limit: '210mb' }));  // Increase URL-encoded payload size limit

// Use the patients router
app.use('/patient_data', patientsRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
