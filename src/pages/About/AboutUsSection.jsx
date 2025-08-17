import React from 'react';
import Navbar from '../../Navbar'; // Assuming Navbar is in the parent directory
import './AboutUsSection.css'; // Link to the new stylesheet
import useLenis from '../../useLenis';
import LiquidChrome from '../../../LiquidChrome/LiquidChrome/LiquidChrome';
import Robot from '../../Robot'
import Description from './Description';
import Gallery from './Gallery'; 

const AboutUsSection = () => {
  useLenis(); 
  return (
    <>
      {/* This div is now the fixed background */}
      <div className="liquid-chrome-background">
        <LiquidChrome
          baseColor={[0, 0, 0.05]}
          speed={0.15}
          amplitude={0.3}
          interactive={true}
        />
      </div>
      
      <Navbar />
      <section className="about-us-wrapper">
        <div className="about-us-top-divider"></div>

        {/* Main content area */}
        <div className="about-us-content">
          <h1 className="about-us-main-heading">
            ABOUT US
          </h1>
        </div>

        {/* Footer container */}
        <div className="about-us-footer-container">
            <p className="about-us-description">
              We are a community of innovators and problem solvers, united by a passion for technology and a drive to create impactful solutions.
            </p>
            
        </div>

        <div className="about-us-bottom-divider"></div>
      </section>

      <Gallery />

      <Description />

      <Robot />

      
    </>
  );
};

export default AboutUsSection;
