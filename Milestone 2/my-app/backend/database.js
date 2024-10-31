const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Database Config:', {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    DB_PASSWORD: process.env.DB_PASSWORD, // Be careful not to expose this in a public log
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PORT: process.env.MYSQL_PORT,
});


async function connect() {
    const maxRetries = 2;  // Define max number of retries
    let connection;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}: Connecting to MySQL...`);
            
            connection = await mysql.createConnection({
                host: process.env.MYSQL_HOST || 'localhost',
                user: process.env.MYSQL_USER || 'root',
                password: process.env.DB_PASSWORD,
                database: process.env.MYSQL_DATABASE || 'ED',
                port: process.env.MYSQL_PORT || 3306
            });
            
            console.log('Successfully connected to MySQL');
            return connection; // Exit if successful

        } catch (error) {
            console.error(`Error on attempt ${attempt}:`, error.message);

            // If it's the last attempt, throw an error with a custom message
            if (attempt < maxRetries) {
                // Add a delay before the second attempt
                await new Promise(resolve => setTimeout(resolve, 10));
            } else {
                // If it's the last attempt, throw an error with a custom message
                throw new Error("Tried connecting to db twice - unsuccessful");
            }
        }
    }
}

const maxRetries = 2; 
retryDelay = 10;

// Retry function with delay
async function retryWithDelay(operation, maxRetries, delay) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt < maxRetries) {
                console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                console.error('Max retries reached. Operation failed.');
                throw error;
            }
        }
    }
}

// Fetch all patients
async function fetchAllPatients() {
    return retryWithDelay(async () => {
        const connection = await connect();
        const [patients] = await connection.execute('SELECT * FROM Patients');
        await connection.end();
        return patients;
    }, maxRetries, retryDelay);
}

// Fetch a patient by healthcare number
async function fetchPatientByHealthNumber(healthNumber) {
    return retryWithDelay(async () => {
        const connection = await connect();
        const [results] = await connection.execute('SELECT * FROM Patients WHERE healthcarenumber = ?', [healthNumber]);
        await connection.end();
        return results.length > 0 ? results[0] : null;
    }, maxRetries, retryDelay);
}

// Create a new patient record
async function createPatient(healthNumber, name, age, phoneNumber, profile_image) {
    return retryWithDelay(async () => {
        const connection = await connect();
        const query = 'INSERT INTO Patients (healthcarenumber, name, age, phone_number, profile_image) VALUES (?, ?, ?, ?, ?)';
        await connection.execute(query, [healthNumber, name, age, phoneNumber, profile_image]);
        await connection.end();
        return { message: 'Patient created successfully' };
    }, maxRetries, retryDelay);
}

// Update an existing patient record
async function updatePatient(healthNumber, name, age, phoneNumber, profile_image) {
    return retryWithDelay(async () => {
        const connection = await connect();
        const fieldsToUpdate = [];
        const values = [];

        if (name !== undefined) {
            fieldsToUpdate.push("name = ?");
            values.push(name);
        }
        if (age !== undefined) {
            fieldsToUpdate.push("age = ?");
            values.push(age);
        }
        if (phoneNumber !== undefined) {
            fieldsToUpdate.push("phone_number = ?");
            values.push(phoneNumber);
        }
        if (profile_image !== undefined) {
            fieldsToUpdate.push("profile_image = ?");
            values.push(profile_image);
        }

        values.push(healthNumber);

        const query = `UPDATE Patients SET ${fieldsToUpdate.join(", ")} WHERE healthcarenumber = ?`;
        const [result] = await connection.execute(query, values);
        await connection.end();

        if (result.affectedRows === 0) {
            throw new Error('Patient not found');
        }
        return { message: 'Patient updated successfully' };
    }, maxRetries, retryDelay);
}

// Delete a patient by healthcare number
async function deletePatient(healthNumber) {
    return retryWithDelay(async () => {
        const connection = await connect();
        const query = 'DELETE FROM Patients WHERE healthcarenumber = ?';
        const [result] = await connection.execute(query, [healthNumber]);
        await connection.end();
        if (result.affectedRows === 0) {
            throw new Error('Patient not found');
        }
        return { message: 'Patient deleted successfully' };
    }, maxRetries, retryDelay);
}

module.exports = {
    fetchAllPatients,
    fetchPatientByHealthNumber,
    createPatient,
    updatePatient,
    deletePatient,
};
