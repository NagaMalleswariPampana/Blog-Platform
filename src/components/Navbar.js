import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Blogify</Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/create">Write</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <span style={{ color: '#718096' }}>Hi, {user.name}</span>
                        <button onClick={handleLogout} className="btn-nav">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup" className="btn-nav">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;