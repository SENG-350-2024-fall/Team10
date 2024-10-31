import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const Profile = ({ user }) => {
    const initialUserData = user || {
        name: '',
        healthNumber: '', 
        phoneNumber: '',
        profilePicture: null,
        age: '',
    };

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialUserData);
    const [imagePreview, setImagePreview] = useState(initialUserData.profilePicture);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/patient_data/123456');
                if (response.data) {
                    setFormData({
                        name: response.data.name,
                        healthNumber: response.data.healthNumber,
                        phoneNumber: response.data.phoneNumber,
                        profilePicture: `http://localhost:4000${response.data.profileImage}`,
                        age: response.data.age,
                    });
                    if (response.data.profileImage) {
                        setImagePreview(`http://localhost:4000${response.data.profileImage}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('An error occurred while fetching your profile.');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (formData.profilePicture && typeof formData.profilePicture !== 'string') {
            setImagePreview(URL.createObjectURL(formData.profilePicture));
        } else {
            setImagePreview(formData.profilePicture);
        }
    }, [formData.profilePicture]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePicture: file });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
    
        const nameRegex = /^[A-Za-z\s-]+$/;
        if (!nameRegex.test(formData.name)) {
            setError('Name can only contain letters.');
            return;
        }
    
        try {
            const formDataToSend = new FormData();
    
            if (formData.name !== initialUserData.name) {
                formDataToSend.append('name', formData.name);
            }
            if (formData.healthNumber !== initialUserData.healthNumber) {
                formDataToSend.append('healthNumber', formData.healthNumber);
            }
            if (formData.phoneNumber !== initialUserData.phoneNumber) {
                formDataToSend.append('phoneNumber', formData.phoneNumber);
            }
            if (formData.age !== initialUserData.age) {
                formDataToSend.append('age', formData.age);
            }
            if (formData.profilePicture !== initialUserData.profilePicture) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }
    
            // Log form data to verify phone number
            console.log('Submitting form data:', Object.fromEntries(formDataToSend.entries()));
    
            await axios.put(`http://localhost:4000/patient_data/${formData.healthNumber}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            setIsEditing(false);
            setError(null);
        } catch (error) {
            console.error('Error saving profile:', error);
            setError('An error occurred while saving your profile: ' + (error.response ? error.response.data.error : error.message));
        }
    };
    
    

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'grey', fontWeight: 'bold', fontSize: '3em' }}>Your Profile</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {isEditing ? (
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
                            <strong>Phone Number:</strong>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
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
                    <Button
                        type="submit"
                        style={{ marginTop: '20px', backgroundColor: '#597D35', color: 'white', padding: '10px 20px' }}
                    >
                        Save
                    </Button>
                </form>
            ) : (
                <div style={{ marginTop: '20px', fontSize: '1.5em' }}>
                    {formData.profilePicture && (
                        <div style={{ marginBottom: '20px' }}>
                            <img
                                src={imagePreview}
                                alt="Profile"
                                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                            />
                        </div>
                    )}
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                    <p><strong>Health Number:</strong> {formData.healthNumber}</p>
                    <p><strong>Age:</strong> {formData.age}</p>

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
