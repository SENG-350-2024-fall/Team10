import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 

const TriageForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        medicalNumber: '',
        symptoms: '',
        severity: 'mild',
        duration: '',
        description: ''
    });

    const [isReviewing, setIsReviewing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleReview = (e) => {
        e.preventDefault();
        setIsReviewing(true);
    };

    const handleEdit = () => {
        setIsReviewing(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Triage form submitted!');
        
        // Clear form after submission
        setFormData({
            name: '',
            age: '',
            medicalNumber: '',
            symptoms: '',
            severity: 'mild',
            duration: '',
            description: ''
        });

        // Navigate to home page
        navigate('/');
    };

    return (
        <div style={{ margin: '0 auto', maxWidth: '600px' }}>
            <h1 style={{ justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '3em' }}>
                Medical Triage Form
            </h1>
            
            {isReviewing ? (
                <div>
                    <h2>Review Your Information:</h2>
                    <p>
                        Patient, <strong>{formData.name}</strong>, is <strong>{formData.age}</strong> years old. 
                        <strong> {formData.name}</strong> has been suffering from <strong>{formData.symptoms}</strong> for 
                        <strong> {formData.duration}</strong> and says the severity is <strong>{formData.severity}</strong>.
                    </p>
                    <p><strong>Description:</strong> {formData.description}</p>

                    <Button onClick={handleEdit} style={{ marginRight: '10px', backgroundColor: '#0096C7', color: 'white' }}>
                        Edit
                    </Button>
                    <Button onClick={handleSubmit} style={{ backgroundColor: '#597D35', color: 'white' }}>
                        Confirm and Submit
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleReview} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label style={{ fontSize: '1.2em' }}>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '10px', margin: '5px 0', fontSize: '1em' }}
                        />
                    </label>

                    <label style={{ fontSize: '1.2em' }}>
                        Age:
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '10px', margin: '5px 0', fontSize: '1em' }}
                        />
                    </label>

                    <label style={{ fontSize: '1.2em' }}>
                        Medical Number:
                        <input
                            type="text"
                            name="medicalNumber"
                            value={formData.medicalNumber}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '10px', margin: '5px 0', fontSize: '1em' }}
                        />
                    </label>

                    <label style={{ fontSize: '1.2em' }}>
                        Symptoms:
                        <input
                            type="text"
                            name="symptoms"
                            value={formData.symptoms}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '10px', margin: '5px 0', fontSize: '1em' }}
                        />
                    </label>

                    <label style={{ fontSize: '1.2em' }}>
                        Severity:
                        <select
                            name="severity"
                            value={formData.severity}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '10px', margin: '5px 0', fontSize: '1em' }}
                        >
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                    </label>

                    <label style={{ fontSize: '1.2em' }}>
                        How long has the problem persisted?
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '10px', margin: '5px 0', fontSize: '1em' }}
                        />
                    </label>

                    <label style={{ fontSize: '1.2em' }}>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            style={{ width: '100%', padding: '10px', margin: '5px 0', fontSize: '1em' }}
                        />
                    </label>

                    <Button type="submit" style={{ backgroundColor: '#597D35', color: 'white', padding: '10px', fontSize: '1.2em' }}>
                        Review Form
                    </Button>
                </form>
            )}
        </div>
    );
};

export default TriageForm;
