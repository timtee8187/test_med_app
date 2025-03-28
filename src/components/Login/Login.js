import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  // Verify API connection on component mount
  useEffect(() => {
    console.log("Using API URL:", API_URL);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      if (formData.email.indexOf('@') === -1) {
        newErrors.email = 'Email must contain an @ symbol';
      } else if (formData.email.indexOf('.') === -1) {
        newErrors.email = 'Email must contain a domain (e.g., .com, .org)';
      } else {
        newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Test API connection first
      const healthCheck = await fetch(`${API_URL}/health`);
      if (!healthCheck.ok) {
        throw new Error('API server is not responding');
      }

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // Handle non-JSON responses
      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Invalid server response');
      }

      const json = await response.json();
      
      if (!response.ok) {
        throw new Error(json.error || json.message || 'Login failed');
      }

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', formData.email);
        navigate('/');
      } else {
        throw new Error('Authentication token missing in response');
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError(error.message || 'An error occurred during login');
      
      // Special handling for CORS errors
      if (error.message.includes('Failed to fetch')) {
        setApiError('Cannot connect to server. Please check your connection or try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member? <span><Link to="/signup" style={{ color: '#2190FF' }}>Sign Up Here</Link></span>
        </div>
        
        {apiError && (
          <div className="alert alert-danger" style={{ margin: '15px 0' }}>
            <strong>Error:</strong> {apiError}
            <br />
            <small>Attempting to connect to: {API_URL}</small>
          </div>
        )}

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (errors.email) setErrors({...errors, email: ''});
                }}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({...formData, password: e.target.value});
                  if (errors.password) setErrors({...errors, password: ''});
                }}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="btn-group">
              <button 
                type="submit" 
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : 'Login'}
              </button>
              <button 
                type="button"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => {
                  setFormData({ email: '', password: '' });
                  setErrors({});
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;