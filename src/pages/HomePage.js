import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    return (
        <div className="container text-center mt-5">
            <div className="card p-5 shadow-lg bg-light">
                <h1 className="display-4">Welcome to HopeHands</h1>
                <p className="lead">Improving lives through volunteer-driven initiatives.</p>
                <hr className="my-4" />
                <p className="mb-4">Join us in making a difference by becoming a volunteer or managing volunteer activities as an admin.</p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/volunteer" className="btn btn-primary btn-lg">Become a Volunteer</Link>
                    <Link to="/admin" className="btn btn-secondary btn-lg">Admin Dashboard</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
