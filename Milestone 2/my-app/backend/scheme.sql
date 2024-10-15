
CREATE DATABASE ED;
USE ED;

CREATE TABLE Patients (
    healthcarenumber VARCHAR(20) PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,                
    age INT NOT NULL,                          
    phone_number VARCHAR(15),                  
    profile_image VARCHAR(255)
);
