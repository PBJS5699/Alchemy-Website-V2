import React, { useEffect } from 'react';
import './Price.css';

const Price: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="price-page">
      <div className="price-container">
        <h1>Pricing</h1>
        <div className="price-content">
          {/* Price content will go here */}
        </div>
      </div>
    </div>
  );
};

export default Price; 