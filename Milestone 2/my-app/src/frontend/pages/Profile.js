import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';  // Import axios for API requests

const Profile = ({ user }) => {
    const initialUserData = user || {
        name: '',
        email: '',
        healthNumber: '',  // Corrected from 'healthcarenumber'
        profilePicture: null,
        age: '',
    };

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(initialUserData);
    const [formData, setFormData] = useState(initialUserData);
    const [imagePreview, setImagePreview] = useState(initialUserData.profilePicture);
    const [error, setError] = useState(null);  // State for error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePicture: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission to save changes to database
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData(); // Use FormData for handling files
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('healthNumber', formData.healthNumber);  // Correct field name
            formDataToSend.append('age', formData.age);
            if (formData.profilePicture) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }
    
            // Check if updating or creating a new patient
            if (profileData.healthNumber) {
                // Send PUT request to update patient data in the database (update case)
                await axios.put(`http://localhost:4000/patient_data/${formData.healthNumber}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                // Send POST request to create new patient data in the database (create case)
                await axios.post('http://localhost:4000/patient_data', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
    
            setProfileData(formData);  // Update profile data locally
            setIsEditing(false);  // Switch back to view mode
            setError(null);  // Clear any errors
        } catch (error) {
            console.error('Error saving profile:', error);
            setError('An error occurred while saving your profile.');  // Set error message
        }
    };
    

    const handleEdit = () => {
        setFormData({ ...profileData });
        setIsEditing(true);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'grey', fontWeight: 'bold', fontSize: '3em' }}>Your Profile</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}

            {isEditing ? (
                // Edit mode: Show form inputs and image upload
                <form onSubmit={handleSave} style={{ marginTop: '20px', fontSize: '1.2em' }}>
                    <div>
                        <label>
                            <strong>Name:</strong>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <strong>Email:</strong>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <strong>Health Number:</strong>
                            <input
                                type="text"
                                name="healthNumber"  // Correct field name
                                value={formData.healthNumber}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <strong>Profile Picture:</strong>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'block', marginTop: '10px' }}
                            />
                        </label>
                        {imagePreview && (
                            <div style={{ marginTop: '10px' }}>
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <label>
                            <strong>Age:</strong>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
                            />
                        </label>
                    </div>

                    <Button
                        type="submit"
                        style={{ marginTop: '20px', backgroundColor: '#597D35', color: 'white', padding: '10px 20px' }}
                    >
                        Save
                    </Button>
                </form>
            ) : (
                // View mode: Show profile data and profile picture
                <div style={{ marginTop: '20px', fontSize: '1.5em' }}>
                    {profileData.profilePicture && (
                        <div style={{ marginBottom: '20px' }}>
                            <img
                                src={imagePreview}
                                alt="Profile"
                                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                            />
                        </div>
                    )}
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Health Number:</strong> {profileData.healthNumber}</p>  {/* Correct field */}
                    <p><strong>Age:</strong> {profileData.age}</p>

                    <Button
                        onClick={handleEdit}
                        style={{ marginTop: '20px', backgroundColor: '#597D35', color: 'white', padding: '10px 20px' }}
                    >
                        Edit Profile
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Profile;
