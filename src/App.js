import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VolunteerPage from './pages/VolunteerPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';

const isAuthenticated = () => {
    return localStorage.getItem('adminToken') ? true : false;
};

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/volunteer" element={<VolunteerPage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Login Page Route */}
                <Route path="/admin" element={isAuthenticated() ? <AdminPage /> : <Navigate to="/login" />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
