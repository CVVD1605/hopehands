import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../api/admin';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            {loading && <p className="text-center">Loading dashboard...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {!loading && !error && stats && (
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm p-3 mb-4">
                            <h5>Total Volunteers</h5>
                            <p className="display-6">{stats.totalVolunteers}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm p-3 mb-4">
                            <h5>Pending Approvals</h5>
                            <p className="display-6">{stats.pendingApprovals}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm p-3 mb-4">
                            <h5>Approved Volunteers</h5>
                            <p className="display-6">{stats.approvedVolunteers}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
