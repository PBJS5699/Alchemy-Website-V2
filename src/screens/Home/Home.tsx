import './Home.css';
import Nav from '../Nav/Nav';
import nodeBasedImg from '../../assets/screenshots/node-based.png';
import automaticTrainingImg from '../../assets/screenshots/automatic-training.png';
import fullyReproducibleImg from '../../assets/screenshots/fully-reproducible.png';
import appleLogo from '../../assets/os-icons/apple-logo.png';
import windowsLogo from '../../assets/os-icons/windows-logo.png';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

function Home() {
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
          <h1 className="home-title">
            <span className="gradient-text">Supercharge your research with AI</span>
            <br />
            From raw data to publication-ready results
          </h1>
          <p className="hero-subtitle">
            No more repetitive, manual, subjective image analysis. With our easy drag-and-drop solution, 
            create custom image analysis programs for your research you can share with your peers and 
            cite in your research - all without writing a single line of code.
          </p>
          <div className="download-section">
            {getDownloadButton()}
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
              Ensure consistency and credibility. Generate reproducible code for every analysis, 
              ready to cite in publications or share with peers. Boost transparency and eliminate 
              result variations between analysts.
            </p>
            <img src={fullyReproducibleImg} alt="Reproducible analysis interface" className="feature-image" />
          </div>
        </section>

        <section className="cta">
          <button className="cta-button">Request Demo</button>
        </section>

        <footer className="footer">
          <p>Copyright © 2024 Alchemy A.I. | All Rights Reserved</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Terms and Conditions</Link> | <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home; 