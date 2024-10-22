const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Database Config:', {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    DB_PASSWORD: process.env.DB_PASSWORD, // Be careful not to expose this in a public log
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PORT: process.env.MYSQL_PORT,
});

// Connect to the database
    async function connect() {
        try {
            console.log('Connecting to MySQL with settings:', {
                host: process.env.MYSQL_HOST || 'localhost',
                user: process.env.MYSQL_USER || 'root',
                password: process.env.DB_PASSWORD,
                database: process.env.MYSQL_DATABASE || 'ED',
                port: process.env.MYSQL_PORT || 3306 
            });
    
            const connection = await mysql.createConnection({
                host: process.env.MYSQL_HOST || 'localhost',
                user: process.env.MYSQL_USER || 'root',
                password: process.env.DB_PASSWORD, // Make sure this is referenced correctly
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
async function createPatient(healthNumber, name, age, phoneNumber, profile_image) {
    try {
        const connection = await connect();
        
        const query = 'INSERT INTO Patients (healthcarenumber, name, age, phone_number, profile_image) VALUES (?, ?, ?, ?, ?)';
        await connection.execute(query, [healthNumber, name, age, phoneNumber, profile_image]);
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

        // Prepare values, replacing undefined with null
        const values = [
            name !== undefined ? name : null,
            age !== undefined ? age : null,
            phone_number !== undefined ? phone_number : null,
            profile_image !== undefined ? profile_image : null,
            healthNumber
        ];

        const [result] = await connection.execute(query, values);
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
