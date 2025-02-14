import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export const volunteerAPI = {
    // Get all volunteers
    getVolunteers: async () => {
        const response = await api.get('/volunteers/');
        return response.data;
    },

    // Create new volunteer
    createVolunteer: async (volunteerData) => {
        const response = await api.post('/hubspot/contact/', volunteerData);
        return response.data;
    },

    // Update volunteer status
    updateVolunteerStatus: async (id, status) => {
        const response = await api.patch(`/volunteers/${id}/`, { status });
        return response.data;
    }
};