const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { fetchAllPatients, fetchPatientByHealthNumber, createPatient, updatePatient, deletePatient } = require('./database.js');
const router = express.Router();

// Ensure upload directory exists
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
ensureDirectoryExistence(path.join(__dirname, '../uploads'));

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }  // 200MB limit
});

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await fetchAllPatients();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Get a patient by healthcare number
router.get('/:healthNumber', async (req, res) => {
  const { healthNumber } = req.params;
  if (!healthNumber) {
    return res.status(400).json({ error: 'Invalid healthcare number' });
  }

  try {
    const patient = await fetchPatientByHealthNumber(healthNumber);
    if (patient) {
      res.json({
        name: patient.name,
        age: patient.age,
        healthNumber: patient.healthcarenumber,
        phoneNumber: patient.phone_number,
        profileImage: patient.profile_image,
      });
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
});


// Create a new patient
router.post('/', upload.single('profilePicture'), async (req, res) => {
    try {
        console.log('Received body:', req.body);
        console.log('Received file:', req.file);

        const { healthNumber, name, age, phoneNumber } = req.body;  // Corrected field names
        const profile_image = req.file ? `/uploads/${req.file.filename}` : null;

        await createPatient(healthNumber, name, age, phoneNumber, profile_image);
        res.status(200).json({ message: 'Patient created successfully!' });
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  

// Update an existing patient
router.put('/:healthNumber', upload.single('profilePicture'), async (req, res) => {
  try {
    console.log('Received body:', req.body);
    console.log('Received file:', req.file);

    const { healthNumber } = req.params;
    const { name, age, phone_number } = req.body;
    const profile_image = req.file ? `/uploads/${req.file.filename}` : null;

    await updatePatient(healthNumber, name, age, phone_number, profile_image);
    res.status(200).json({ message: 'Patient updated successfully!' });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

// Delete a patient by healthcare number
router.delete('/:healthNumber', async (req, res) => {
  const { healthNumber } = req.params;
  try {
    await deletePatient(healthNumber);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

module.exports = router;
