
CREATE DATABASE ED;
USE ED;

CREATE TABLE Patients (
    healthcarenumber VARCHAR(20) PRIMARY KEY,  -- Primary Key: healthcare number
    name VARCHAR(100) NOT NULL,                -- Name of the patient
    age INT NOT NULL,                          -- Age of the patient
    phone_number VARCHAR(15),                   -- Phone number of the patient
    profile_image VARCHAR(255),
);
