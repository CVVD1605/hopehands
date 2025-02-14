import React, { useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.email || !credentials.password) {
            setError('Both fields are required.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Replace with actual API call
            const response = await api.post('login/', credentials);
            localStorage.setItem('token', response.data.token);
            alert('Login Successful!');
            // Redirect to admin dashboard or other pages
        } catch (err) {
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: '50vh' }}>
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Admin Login</h1>
                <p className="text-muted text-center mb-3">
                    Please log in with your admin credentials to access the dashboard.
                </p>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <p className="text-muted text-center mt-4">
                    Don’t have admin credentials? Please contact your system administrator.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
