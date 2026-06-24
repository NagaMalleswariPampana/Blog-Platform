import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            alert('Signup Success! Please login');
            navigate('/login');
        } catch (err) {
            alert('Signup Failed');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Create Account</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Sign Up</button>
                </form>
                <p className="auth-link">
                    Already have account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;