import React, { useState } from 'react';
import './Sign_Up.css';
import { Link } from 'react-router-dom';

const Sign_up = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Phone validation - must be exactly 10 digits
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter exactly 10 digits (no spaces or special characters)';
    }
    
    // Email validation with more detailed error messages
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
    
    if (fieldName === 'name') {
      if (!value.trim()) {
        newErrors.name = 'Name is required';
      } else if (value.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      } else {
        delete newErrors.name;
      }
    }
    
    if (fieldName === 'phone') {
      if (!value) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(value)) {
        newErrors.phone = 'Please enter exactly 10 digits (no spaces or special characters)';
      } else {
        delete newErrors.phone;
      }
    }
    
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
    
    // For phone field, only allow numbers and limit to 10 digits
    if (name === 'phone') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 10) {
        setFormData({
          ...formData,
          [name]: numbersOnly
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
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
      // Form is valid - proceed with submission
      console.log('Form submitted:', formData);
      // Add your signup logic here (API call, etc.)
      alert('Form submitted successfully!');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      password: ''
    });
    setErrors({});
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? <span><Link to="/login" style={{ color: '#2190FF' }}> Login</Link></span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                pattern="\d{10}"
                title="10-digit phone number"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="10"
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>

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
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                Submit
              </button>
              <button 
                type="button" 
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={handleReset}
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

export default Sign_up;