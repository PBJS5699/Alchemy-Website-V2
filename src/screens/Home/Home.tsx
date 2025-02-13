import './Home.css';
import Nav from '../Nav/Nav';
import nodeBasedImg from '../../assets/screenshots/node-based.png';
import automaticTrainingImg from '../../assets/screenshots/automatic-training.png';
import fullyReproducibleImg from '../../assets/screenshots/fully-reproducible.png';
import appleLogo from '../../assets/os-icons/apple-logo.png';
import windowsLogo from '../../assets/os-icons/windows-logo.png';
import heroScreenshot from '../../assets/background/cropped-screenshot.png';
import demoVideo from '../../assets/videos/alchemy-demo-v1.mp4';
import { Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';

const VideoIcon = () => (
  <svg className="watch-demo-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 10.5V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z" fill="currentColor"/>
  </svg>
);

const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={e => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>×</button>
        {error && (
          <div className="video-error">
            <p>{error}</p>
            <button onClick={onClose} className="error-close-btn">Close</button>
          </div>
        )}
        <video 
          controls 
          autoPlay 
          className="demo-video"
          src={demoVideo}
          onError={(e) => {
            setIsLoading(false);
            setError('Unable to play the video. Please try again later.');
            console.error('Video Error:', e);
          }}
          onLoadedData={() => {
            setIsLoading(false);
            setError(null);
          }}
          style={{ display: error ? 'none' : 'block' }}
        >
          Your browser does not support the video tag.
        </video>
        {isLoading && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <p>Loading video...</p>
          </div>
        )}
      </div>
    </div>
  );
};

function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const userOS = useMemo(() => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('mac')) return 'mac';
    if (platform.includes('win')) return 'windows';
    return 'other';
  }, []);

  const getDownloadButton = () => {
    switch (userOS) {
      case 'mac':
        return (
          <button className="download-btn">
            <img src={appleLogo} alt="Apple logo" className="os-icon" />
            Download for Mac
          </button>
        );
      case 'windows':
        return (
          <button className="download-btn">
            <img src={windowsLogo} alt="Windows logo" className="os-icon" />
            Download for Windows
          </button>
        );
      default:
        return (
          <div className="download-buttons">
            <button className="download-btn">
              <img src={appleLogo} alt="Apple logo" className="os-icon" />
              Download for Mac
            </button>
            <button className="download-btn">
              <img src={windowsLogo} alt="Windows logo" className="os-icon" />
              Download for Windows
            </button>
          </div>
        );
    }
  };

  return (
    <>
      <Nav />
      <div className="home-container">
        <section className="hero">
          <div className="hero-content">
            <h1 className="home-title">
              The AI Research Assistant
            </h1>
            <p className="hero-subtitle">
              No more repetitive, time-consuming data analysis. <br /> With Alchemy AI, turn your images into publication-ready results - <br />all without writing a single line of code.
            </p>
            <div className="download-section">
              <div className="buttons-container">
                {getDownloadButton()}
                <button className="watch-demo-btn" onClick={() => setIsVideoModalOpen(true)}>
                  <VideoIcon />
                  Watch Demo
                </button>
              </div>
              <p className="download-message">
                Our downloadable app and demo video are coming soon, but if you have a usecase for your research, please reachout to our CEO at{' '}
                <a href="mailto:phillip@alchemyai.dev" className="email-link">
                  phillip@alchemyai.dev
                </a>
                {' '}and we'll respond within an hour!!
              </p>
            </div>
            <div className="hero-screenshot-container">
              <img src={heroScreenshot} alt="Alchemy AI Interface" className="hero-screenshot" />
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <h2>1. Node-Based Workflows</h2>
            <p>
              Design custom analysis pipelines without coding. Our intuitive node system lets you 
              fine-tune every parameter. Not sure where to start? Let our AI suggest an optimal 
              workflow, then adjust it to your needs.
            </p>
            <img src={nodeBasedImg} alt="Node-based workflow interface" className="feature-image" />
          </div>

          <div className="feature">
            <h2>2. Automatic AI Training</h2>
            <p>
              Eliminate repetitive manual work. Our AI learns from your manual processes and 
              recommends the same application for subsequent images. Focus on research, not repetition.
            </p>
            <img src={automaticTrainingImg} alt="Automatic AI training interface" className="feature-image" />
          </div>

          <div className="feature">
            <h2>3. Fully Reproducible</h2>
            <p>
              Share and reuse analysis workflows effortlessly. Save custom components and entire pipelines 
              to collaborate with your team or share with the research community. Ensure consistent results 
              across labs by eliminating variations between analysts.
            </p>
            <img src={fullyReproducibleImg} alt="Reproducible analysis interface" className="feature-image" />
          </div>
        </section>

        <footer className="footer">
          <p>Copyright © 2024 Alchemy A.I. | All Rights Reserved</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Terms and Conditions</Link> | <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </>
  );
}

export default Home; 