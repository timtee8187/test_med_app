import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>Welcome, {user.name}</h2>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member Since:</strong> {user.joinDate}</p>
          {/* Add more user details as needed */}
        </div>
        <div className="profile-actions">
          <button className="logout-btn">Logout</button>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;