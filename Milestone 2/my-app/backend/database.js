const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// Connect to the database
async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.MYSQL_DATABASE || 'ED',
            port: process.env.MYSQL_PORT || 3306 
        });

        console.log('Successfully connected to MySQL');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }
}

// Fetch all patients
async function fetchAllPatients() {
    try {
        const connection = await connect();
        const [patients] = await connection.execute('SELECT * FROM Patients');
        await connection.end();
        return patients;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}

// Fetch a patient by healthcare number
async function fetchPatientByHealthNumber(healthNumber) {
    try {
        const connection = await connect();
        const [results] = await connection.execute('SELECT * FROM Patients WHERE healthcarenumber = ?', [healthNumber]);
        await connection.end();
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error('Error fetching patient:', error);
        throw error;
    }
}

// Create a new patient record
async function createPatient(healthNumber, name, age, phone_number, profile_image) {
    try {
        const connection = await connect();
        
        // Log the data being inserted
        console.log('Database Insertion:', { healthNumber, name, age, phone_number, profile_image });

        const query = 'INSERT INTO Patients (healthcarenumber, name, age, phone_number, profile_image) VALUES (?, ?, ?, ?, ?)';
        await connection.execute(query, [healthNumber, name, age, phone_number, profile_image]);
        await connection.end();
        return { message: 'Patient created successfully' };
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
}

// Update an existing patient record
async function updatePatient(healthNumber, name, age, phone_number, profile_image) {
    try {
        const connection = await connect();
        const query = 'UPDATE Patients SET name = ?, age = ?, phone_number = ?, profile_image = ? WHERE healthcarenumber = ?';
        const [result] = await connection.execute(query, [name, age, phone_number, profile_image, healthNumber]);
        await connection.end();
        if (result.affectedRows === 0) {
            throw new Error('Patient not found');
        }
        return { message: 'Patient updated successfully' };
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
}

// Delete a patient by healthcare number
async function deletePatient(healthNumber) {
    try {
        const connection = await connect();
        const query = 'DELETE FROM Patients WHERE healthcarenumber = ?';
        const [result] = await connection.execute(query, [healthNumber]);
        await connection.end();
        if (result.affectedRows === 0) {
            throw new Error('Patient not found');
        }
        return { message: 'Patient deleted successfully' };
    } catch (error) {
        console.error('Error deleting patient:', error);
        throw error;
    }
}

module.exports = {
    fetchAllPatients,
    fetchPatientByHealthNumber,
    createPatient,
    updatePatient,
    deletePatient
};
