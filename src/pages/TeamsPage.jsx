import React from "react";
import Navbar from '../Navbar';
import DarkVeil from '../../DarkVeil/DarkVeil/DarkVeil';
import DecryptedText from '../../Decrypted_Reveal/DecryptedText/DecryptedText';
import './TeamsPage.css';
import BlurText from '../../BlurText/BlurText/BlurText';
import TeamHeader from '../../src/assets/TeamHeader.png';

export default function TeamsPage() {
  return (
    <>
      <Navbar />

      {/* Full static background */}
      <div
        className="background"
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -999
        }}
      >
        <DarkVeil />
      </div>

      <section className="teams-intro-section">
        {/* Tagline */}
        <DecryptedText
          text="Leading the Future of Tech at ACM"
          sequential={true}
          useOriginalCharsOnly={false}
          animateOn="view"
          revealDirection="start"
          speed={60}
          maxIterations={10}
          parentClassName="DecryptedText"
        />

        {/* Description */}
        <BlurText
          text="The ACM Core Team is the driving force behind every initiative, event, and innovation within our chapter. Comprised of passionate leaders, skilled developers, creative thinkers, and strategic planners, this diverse group works tirelessly to uphold ACM's vision of advancing computing as a science and profession."
          delay={2}
          animateBy="words"
          direction="top"
          className="DecryptedText1"
          stepDuration={0.6}
        />

        {/* Image fixed at bottom */}
        <img src={TeamHeader} alt="ACM Team Header" className="team-header-bottom" />
      </section>
    </>
  );
}
