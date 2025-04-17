import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './ProfileCard.css';

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [updatedDetails, setUpdatedDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email');

      if (!authtoken) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          'Authorization': `Bearer ${authtoken}`,
          'Email': email,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const user = await response.json();
      setUserDetails(user);
      setUpdatedDetails(user);
      setError(null);
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setUpdatedDetails(userDetails);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email');

      if (!authtoken || !email) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authtoken}`,
          'Content-Type': 'application/json',
          'Email': email,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUserDetails(updatedUser);
      sessionStorage.setItem('name', updatedUser.name);
      sessionStorage.setItem('phone', updatedUser.phone);
      setEditMode(false);
      setError(null);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={fetchUserProfile}>Retry</button>
      </div>
    );
  }

  return (
    <div className="profile-card">
      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Edit Profile</h2>
          
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
              required
              minLength="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              title="10-digit phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={userDetails.email}
              disabled
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-view">
          <h2>Welcome, {userDetails.name}</h2>
          
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{userDetails.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{userDetails.phone}</span>
            </div>
          </div>

          <button 
            onClick={handleEdit} 
            className="btn-primary edit-btn"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;