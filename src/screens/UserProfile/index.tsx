import React from 'react';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  return (
    <div className="profile-screen">
      <div className="profile-container">
        <div className="profile-header">
          <h1>User Profile</h1>
          <div className="profile-avatar">
            {/* Placeholder for user avatar */}
            <div className="avatar-placeholder">JP</div>
          </div>
        </div>
        
        <div className="profile-info">
          <div className="info-group">
            <label>Name</label>
            <p>John Doe</p>
          </div>
          <div className="info-group">
            <label>Email</label>
            <p>john.doe@example.com</p>
          </div>
          <div className="info-group">
            <label>Member Since</label>
            <p>January 2024</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile">Edit Profile</button>
          <button className="change-password">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 