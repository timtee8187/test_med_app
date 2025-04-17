import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authtoken = sessionStorage.getItem('auth-token');
        const email = sessionStorage.getItem('email');

        if (!authtoken) {
          navigate('/login');
        } else {
          const response = await fetch(`${API_URL}/api/auth/user`, {
            headers: {
              'Authorization': `Bearer ${authtoken}`,
              'Email': email,
            },
          });

          if (response.ok) {
            const user = await response.json();
            setUserDetails(user);
            setUpdatedDetails(user);
          } else {
            throw new Error('Failed to fetch user profile');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email');

      if (!authtoken || !email) {
        navigate('/login');
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authtoken}`,
          'Content-Type': 'application/json',
          'Email': email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        sessionStorage.setItem('name', updatedDetails.name);
        sessionStorage.setItem('phone', updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert('Profile Updated Successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setUpdatedDetails(userDetails);
    setEditMode(false);
  };

  return (
    <div className="profile-card-container">
      {editMode ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedDetails.name || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={updatedDetails.phone || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedDetails.email || ''}
              disabled
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <h2>Profile Details</h2>
          
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{userDetails.name}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{userDetails.phone}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{userDetails.email}</span>
          </div>
          
          <button className="edit-btn" onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;