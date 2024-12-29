import './Nav.css';
import logo from '../../assets/logo/logo.png';
import appleLogo from '../../assets/os-icons/apple-logo.png';
import windowsLogo from '../../assets/os-icons/windows-logo.png';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Nav() {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator();

  const userOS = useMemo(() => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('mac')) return 'mac';
    if (platform.includes('win')) return 'windows';
    return 'other';
  }, []);

  const handleSignIn = () => {
    navigate('/auth');
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
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-left">
          <img src={logo} alt="Alchemy Logo" className="nav-logo" />
        </div>
        <div className="nav-right">
          <button 
            className="nav-signin-btn"
            onClick={handleSignIn}
          >
            {authStatus === 'authenticated' ? 'Profile' : 'Sign In'}
          </button>
          {getDownloadButton()}
        </div>
      </div>
    </nav>
  );
}

export default Nav; 