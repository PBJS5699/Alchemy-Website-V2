import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import './UserProfile.css';

interface UserData {
  name: string;
  email: string;
  university: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      try {
        setError(null);

        // Get current authenticated user
        const user = await getCurrentUser();
        
        // Get user info from signInDetails
        const signInDetails = user.signInDetails;
        const username = user.username;
        
        setUserData({
          name: username.split('@')[0] || 'Not specified',
          email: username || '',
          university: 'Not specified' // This will need to be set up in Cognito
        });
      } catch (err: any) {
        console.error('Profile error:', err);
        
        if (err.name === 'UserUnAuthenticatedException' || 
            err.name === 'NotAuthorizedException' || 
            err.name === 'UserNotFoundException') {
          navigate('/auth');
        } else {
          setError('Unable to load profile data. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchUser();

    // Listen for auth events
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signedOut') {
        navigate('/auth');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (isLoading) {
    return <div className="profile-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="profile-screen">
        <div className="profile-container">
          <div className="error-message">
            {error}
          </div>
          <button onClick={() => navigate('/auth')} className="sign-out">
            Sign In Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-screen">
        <div className="profile-container">
          <div className="error-message">
            Unable to load profile data. Please try signing in again.
          </div>
          <button onClick={() => navigate('/auth')} className="sign-out">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-screen">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Settings</h1>
          <p className="profile-subtitle">You can manage your account, billing, and team settings here.</p>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <h2>Basic Information</h2>
            <div className="avatar-placeholder">
              {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          </div>
          
          <div className="info-card-content">
            <div className="info-group">
              <label>Name</label>
              <p>{userData.name}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{userData.email}</p>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile">Edit Profile</button>
          <button className="change-password">Change Password</button>
          <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 