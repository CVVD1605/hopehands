import React, { useEffect, useState } from 'react';
import { getVolunteers, updateVolunteerStatus } from '../api/volunteers';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const data = await getVolunteers();
                setVolunteers(data || []);
            } catch (err) {
                console.error('Error fetching volunteers:', err);
                setError('Failed to load volunteers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchVolunteers();
    }, []);

    const handleAction = async (id, action) => {
        const confirmation = window.confirm(
            `Are you sure you want to ${action.toLowerCase()} this volunteer?`
        );
        if (!confirmation) return;

        try {
            await updateVolunteerStatus(id, action);
            setVolunteers((prevVolunteers) =>
                prevVolunteers.map((volunteer) =>
                    volunteer.id === id ? { ...volunteer, status: action } : volunteer
                )
            );
        } catch (err) {
            console.error(`Error ${action.toLowerCase()}ing volunteer:`, err);
            alert(`Failed to ${action.toLowerCase()} the volunteer. Please try again.`);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <p className="text-center text-muted">
                Manage volunteers, review applications, and oversee operations.
            </p>
            {loading && <p className="text-center">Loading volunteers...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {!loading && !error && (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteers.length > 0 ? (
                                volunteers.map((volunteer) => (
                                    <tr key={volunteer.id}>
                                        <td>{volunteer.first_name} {volunteer.last_name}</td>
                                        <td>{volunteer.email}</td>
                                        <td>{volunteer.phone}</td>
                                        <td>{volunteer.status}</td>
                                        <td>
                                            <button className="btn btn-success me-2" onClick={() => handleAction(volunteer.id, 'Approved')}>
                                                Approve
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleAction(volunteer.id, 'Rejected')}>
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No volunteers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
