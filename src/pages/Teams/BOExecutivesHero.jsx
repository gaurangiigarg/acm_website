import React, { useState, useEffect } from 'react';
import './BOExecutivesHero.css'; // Make sure this CSS file is linked

const ExecutivesHero = () => {
  const [offsetY, setOffsetY] = useState(0);

  // Effect to handle the scroll event
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    
    // Add event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bo-executives-wrapper">
      <div className="bo-top-divider"></div>
      <div className="bo-content-grid">
        {/* Left Column with a slower parallax effect */}
        <div
          className="bo-left-column"
          style={{ transform: `translateY(${offsetY * -0.1}px)` }}
        >
          <h1 className="bo-main-heading">
            THE <br /> BOARD OF EXECUTIVES
          </h1>
        </div>
        {/* Right Column with a faster parallax effect */}
        <div
          className="bo-right-column"
          style={{ transform: `translateY(${offsetY * -0.3}px)` }}
        >
          <p className="bo-description">
            Leading with vision and dedication. <br/>
            The minds shaping our future.
          </p>
        </div>
      </div>
      <div className="bo-bottom-divider"></div>
    </section>
  );
};

export default ExecutivesHero;
