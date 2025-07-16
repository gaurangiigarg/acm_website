import React from 'react';
import DecryptedText from '../Decrypted_Reveal/DecryptedText/DecryptedText';
import './RevealSection1.css'
function RevealSection1() {
  return (
    <section className="reveal-container" id="reveal-section">
      <div className="reveal-content">

        {/* Example 1: Defaults (hover to decrypt) */}
        <DecryptedText
          text="DRIVEN THROUGH PURPOSE."
          sequential={true}
          useOriginalCharsOnly={false}
          animateOn='view'
          revealDirection='start'
          speed={60}
          maxIterations={10}
          parentClassName='DecryptedText'
        />

        <DecryptedText
          text="EMPOWERED BY TECHNOLOGY."
          sequential={true}
          useOriginalCharsOnly={false}
          animateOn='view'
          revealDirection='start'
          speed={60}
          maxIterations={10}
          parentClassName='DecryptedText'
        />
      </div>
    </section>
  );
};

export default RevealSection1;
