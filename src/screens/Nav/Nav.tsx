import './Nav.css';
import logo from '../../assets/logo/logo.png';
import appleLogo from '../../assets/os-icons/apple-logo.png';
import windowsLogo from '../../assets/os-icons/windows-logo.png';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from '@aws-amplify/auth';

// Person icon SVG component
const PersonIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width="24" 
    height="24"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

function Nav() {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        const heroHeight = heroSection.getBoundingClientRect().height;
        const heroTop = heroSection.getBoundingClientRect().top;
        // Show shadow when we've scrolled past 1/3 of the hero section
        setShowShadow(heroTop < -(heroHeight / 4));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userOS = useMemo(() => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('mac')) return 'mac';
    if (platform.includes('win')) return 'windows';
    return 'other';
  }, []);

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const getDownloadButton = () => {
    switch (userOS) {
      case 'mac':
        return (
          <button className="nav-download-btn">
            <img src={appleLogo} alt="Apple logo" className="nav-os-icon" />
            Download
          </button>
        );
      case 'windows':
        return (
          <button className="nav-download-btn">
            <img src={windowsLogo} alt="Windows logo" className="nav-os-icon" />
            Download
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`nav-container ${showShadow ? 'nav-shadow' : ''}`}>
      <div className="nav-content">
        <div className="nav-left">
          <img 
            src={logo} 
            alt="Alchemy Logo" 
            className="nav-logo" 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="nav-right">
          {authStatus === 'authenticated' ? (
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <button 
                className="nav-profile-btn"
                onClick={handleProfileClick}
                title="Profile"
              >
                <PersonIcon />
              </button>
              {showDropdown && (
                <div className="profile-dropdown">
                  <button onClick={() => {
                    navigate('/profile');
                    setShowDropdown(false);
                  }}>
                    Account Settings
                  </button>
                  <button onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="nav-signin-btn"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}
          {getDownloadButton()}
        </div>
      </div>
    </div>
  );
}

export default Nav; 