// src/components/Volunteer/VolunteerForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Define API Base URL at the Top
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

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

    const validateForm = () => {
        if (Object.values(formData).some(value => !value.trim())) {
            setError('Please fill out all fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token'); // Get auth token if needed

            // ✅ Ensure correct data structure for the Volunteer model
            const formattedData = {
                user: 1,  // Replace with actual user ID if required
                phone: formData.phone,
                role: formData.role,
                availability: formData.availability,
            };

            // Place API call inside handleSubmit
            const response = await axios.post(
                `${API_BASE_URL}/volunteers/`,  // Correct endpoint
                formattedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token ? `Token ${token}` : '', // Include token if required
                    }
                }
            );

            console.log('Submission Successful:', response.data);
            setSuccess('Thank you for registering as a volunteer!');

            // Clear form after successful submission
            setFormData({
                email: '',
                first_name: '',
                last_name: '',
                phone: '',
                role: '',
                availability: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            const errorMessage = error.response?.data?.error || 
                               'There was an error submitting your registration. Please try again.';
            setError(errorMessage);
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
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            className="form-control"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            className="form-control"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            pattern="[0-9]{8,}"
                            title="Please enter at least 8 digits"
                            required
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            id="role"
                            name="role"
                            className="form-select"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Volunteer">Volunteer</option>
                            <option value="Team Lead">Team Lead</option>
                            <option value="Coordinator">Coordinator</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="availability" className="form-label">Availability</label>
                        <input
                            type="text"
                            id="availability"
                            name="availability"
                            className="form-control"
                            placeholder="e.g., Weekends, Evenings"
                            value={formData.availability}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VolunteerForm;
