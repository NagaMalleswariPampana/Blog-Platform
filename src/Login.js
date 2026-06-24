import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.user, res.data.token);
            alert('Login Success!');
            navigate('/');
        } catch (err) {
            alert('Login Failed');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="btn-submit">Login</button>
                </form>
                <p className="auth-link">
                    Don't have account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;