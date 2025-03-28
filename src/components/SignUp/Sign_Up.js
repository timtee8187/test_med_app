import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showerr, setShowerr] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validatePhone = (phoneNumber) => {
        if (!phoneNumber) {
            setPhoneError('Phone number is required');
            return false;
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            setPhoneError('Phone number must be 10 digits');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const register = async (e) => {
        e.preventDefault();
        setShowerr('');
        
        // Validate phone first
        if (!validatePhone(phone)) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                }),
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('text/html') !== -1) {
                const text = await response.text();
                throw new Error(`Server returned HTML: ${text.substring(0, 100)}...`);
            }

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || json.message || 'Registration failed');
            }

            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);
                navigate("/");
                window.location.reload();
            }
        } catch (error) {
            console.error('Registration error:', error);
            setShowerr(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        // Validate as user types (optional)
        if (value && !/^\d{0,10}$/.test(value)) {
            setPhoneError('Only numbers allowed');
        } else {
            setPhoneError('');
        }
    };

    return (
        <div className="container">
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Create Account</h1>
                    <div className="signup-text1">
                        <span>Already have an account? <Link to="/login">Login</Link></span>
                    </div>
                </div>
                
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                value={phone}
                                onChange={handlePhoneChange}
                                type="tel"
                                name="phone"
                                id="phone"
                                className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                                placeholder="Enter your 10-digit phone number"
                                required
                                maxLength="10"
                            />
                            {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                required
                                minLength="8"
                            />
                            <span 
                                className="password-visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </span>
                        </div>
                        
                        {showerr && (
                            <div className="alert alert-danger">
                                <strong>Error:</strong> {showerr}
                                <br/>
                                <small>Check your API_URL in config: {API_URL}</small>
                            </div>
                        )}
                        
                        <div className="btn-group">
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Signing Up...
                                    </>
                                ) : 'Sign Up'}
                            </button>
                            <button type="reset" className="btn btn-danger">Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;