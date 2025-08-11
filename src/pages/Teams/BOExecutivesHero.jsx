import React from 'react';
import './BOExecutivesHero.css'; // Import the stylesheet

const ExecutivesHero = () => {
  return (
    <section className="bo-executives-wrapper">
      <div className="bo-top-divider"></div>
      <div className="bo-content-grid">
        {/* Left Column */}
        <div className="bo-left-column">
          <h1 className="bo-main-heading">
            THE <br /> BOARD  OF EXECUTIVES
          </h1>
        </div>
        {/* Right Column */}
        <div className="bo-right-column">
          <div>{/* Empty div to maintain layout */}</div>
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
