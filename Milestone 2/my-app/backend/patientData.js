const express = require('express');
const router = express.Router();
const db = require('./database');

// Get all patients
router.get('/patients', async (req, res) => {
    try {
        const patients = await db.query('SELECT * FROM Patients');
        res.json(patients);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get a patient by healthcare number
router.get('/patients/:healthcarenumber', async (req, res) => {
    try {
        const { healthcarenumber } = req.params;
        const patient = await db.query('SELECT * FROM Patients WHERE healthcarenumber = ?', [healthcarenumber]);
        if (patient.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create a new patient
router.post('/patients', async (req, res) => {
    try {
        const { healthcarenumber, name, age, phone_number, profile_image } = req.body;
        await db.query('INSERT INTO Patients (healthcarenumber, name, age, phone_number, profile_image) VALUES (?, ?, ?, ?, ?)', 
        [healthcarenumber, name, age, phone_number, profile_image]);
        res.status(201).json({ message: 'Patient created successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update patient details
router.put('/patients/:healthcarenumber', async (req, res) => {
    try {
        const { healthcarenumber } = req.params;
        const { name, age, phone_number, profile_image } = req.body;
        await db.query('UPDATE Patients SET name = ?, age = ?, phone_number = ?, profile_image = ? WHERE healthcarenumber = ?', 
        [name, age, phone_number, profile_image, healthcarenumber]);
        res.json({ message: 'Patient updated successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete a patient
router.delete('/patients/:healthcarenumber', async (req, res) => {
    try {
        const { healthcarenumber } = req.params;
        await db.query('DELETE FROM Patients WHERE healthcarenumber = ?', [healthcarenumber]);
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
