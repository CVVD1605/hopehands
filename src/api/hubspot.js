// src/api/hubspot.js
import axios from 'axios';

const DJANGO_API_URL = process.env.REACT_APP_DJANGO_API_URL || 'http://localhost:8000/api';

export const submitVolunteerForm = async (formData) => {
    try {
        const response = await axios.post(`${DJANGO_API_URL}/volunteers/register/`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// src/components/Volunteer/VolunteerForm.js
import React, { useState } from 'react';
import { submitVolunteerForm } from '../../api/hubspot';
import 'bootstrap/dist/css/bootstrap.min.css';

const VolunteerForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: '',
        availability: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (Object.values(formData).some(value => !value.trim())) {
            setError('Please fill out all fields.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await submitVolunteerForm(formData);
            setSuccess('Thank you for registering as a volunteer!');
            setFormData({
                email: '',
                first_name: '',
                last_name: '',
                phone: '',
                role: '',
                availability: '',
            });
        } catch (error) {
            setError(error.message || 'There was an error submitting your registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3 text-center">Volunteer Registration</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                {/* Form fields remain the same as your original code */}
                {/* ... */}
            </form>
        </div>
    );
};

export default VolunteerForm;