import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Enhanced email validation with specific error messages
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
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    if (fieldName === 'email') {
      if (!value) {
        newErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        if (value.indexOf('@') === -1) {
          newErrors.email = 'Email must contain an @ symbol';
        } else if (value.indexOf('.') === -1) {
          newErrors.email = 'Email must contain a domain (e.g., .com, .org)';
        } else {
          newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
        }
      } else {
        delete newErrors.email;
      }
    }
    
    if (fieldName === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        delete newErrors.password;
      }
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Form is valid - proceed with login
      console.log('Login form submitted:', formData);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Login successful!');
      }, 1000);
    }
  };

  const handleReset = () => {
    setFormData({
      email: '',
      password: ''
    });
    setErrors({});
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
        <br />
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Valid email address"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email (e.g., user@example.com)"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="btn-group">
              <button 
                type="submit" 
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <button 
                type="button"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
            <br />
            <div className="login-text">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;