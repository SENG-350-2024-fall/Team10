const express = require('express');
const bodyParser = require('body-parser');
const patientsRouter = require('./patientData.js');
const cors = require('cors');


const app = express();
const port = 4000;  // Or another port
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Use the patients router
app.use('/patient_data', patientsRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
