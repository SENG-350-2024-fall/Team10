import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Profile = ({ user }) => {
    // Assuming user object contains `name`, `email`, `healthNumber`, and `profilePicture` properties
    const initialUserData = user || {
        name: 'John Doe',
        email: 'johndoe@example.com',
        healthNumber: '1234567890',
        profilePicture: null,
        age: '', // Default age
    };
    

    const [isEditing, setIsEditing] = useState(false); // Toggle between edit and view modes
    const [profileData, setProfileData] = useState(initialUserData); // Store profile data
    const [formData, setFormData] = useState(initialUserData); // Store form input
    const [imagePreview, setImagePreview] = useState(initialUserData.profilePicture); // Store image preview

    // Handle input change for text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle profile picture change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePicture: file }); // Store file
            setImagePreview(URL.createObjectURL(file)); // Preview the image
        }
    };

    // Handle form submission to save changes
    const handleSave = (e) => {
        e.preventDefault();
        setProfileData(formData); // Save form data to profileData
        setIsEditing(false); // Switch back to view mode
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'grey', fontWeight: 'bold', fontSize: '3em' }}>Your Profile</h1>

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
                                name="healthNumber"
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
                    <p><strong>Health Number:</strong> {profileData.healthNumber}</p>
                    <p><strong>Age:</strong> {profileData.age}</p>


                    <Button
                        onClick={() => setIsEditing(true)} // Switch to edit mode
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
