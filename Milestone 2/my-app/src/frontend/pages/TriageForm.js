import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 

const TriageForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        symptoms: '',
        severity: 'mild',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Triage form submitted!');
        
        // Clear form after submission
        setFormData({
            name: '',
            symptoms: '',
            severity: 'mild',
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
                    Personal Medical Number:
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
                    Submit Triage Form
                </Button>
            </form>
        </div>
    );
};

export default TriageForm;
