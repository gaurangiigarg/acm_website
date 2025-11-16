import React from 'react';
import Navbar from '../../Navbar'; // Assuming Navbar is in the parent directory

import './TeamsPage.css';
import useLenis from '../../useLenis';
import TeamGrid1 from './TeamGrid1';
import TeamGrid2 from './TeamGrid2';
import TeamGrid3 from './TeamGrid3';
import BOExecutivesHero from './BOExecutivesHero'
import ExecutivesHero from './ExecutivesHero';
import OfficeBearersHero from './OfficeBearersHero'; 
import ColorBends from './background';

const TeamsPage = () => {
  useLenis(); 
  return (
    // UPDATED: Replaced fragment with a wrapper div
    <div className="teams-page-container">
      
      {/* UPDATED: Placed ColorBends in its own background container */}
      <div className="color-bends-background">
        <ColorBends
  colors={["#0d0d82"]}
  rotation={0}
  speed={0.2}
  scale={1}
  frequency={1}
  warpStrength={1}
  mouseInfluence={1}
  parallax={0.5}
  noise={0.01}
/>
      </div>

      {/* UPDATED: Added a wrapper for all foreground content */}
      <div className="teams-page-content-wrapper">
        <Navbar />
        {/* --- Top Section --- */}
        <section className="team-section-wrapper">
          <div className="top-divider"></div>
          <div className="content-grid">
            <div className="left-column">
              <div>
                <button className="gallery-button">GALLERY</button>
              </div>
              <p className="description">
                We're a team driven by conviction. Meet our people.
              </p>
              <div className="team-member-footer">
                ACM Student Chapter
              </div>
            </div>
            <div className="right-column">
              <h1 className="main-heading">
                OUR TEAM
                <span className="heading-number">ACM</span>
              </h1>
            </div>
          </div>
          <div className="bottom-divider"></div>
        </section>

        <BOExecutivesHero />
        <TeamGrid1 />
        <ExecutivesHero />
        <TeamGrid2 />
        <OfficeBearersHero />
        <TeamGrid3 />
      </div> {/* End of content wrapper */}
    </div> // End of main container
  );
};

export default TeamsPage;