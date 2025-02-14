import React from 'react';
import VolunteerForm from '../components/Volunteer/VolunteerForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const VolunteerPage = () => {
    return (
        <div className="container mt-4">
            <h4 className="mb-3 text-center">Join us to make a difference in underserved communities</h4>
       
            <VolunteerForm />
        </div>
    );
};

export default VolunteerPage;
