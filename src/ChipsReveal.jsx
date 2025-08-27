import React, { useRef, useEffect, useState } from 'react';
import './ChipsReveal.css';
import DecryptedText from '../Decrypted_Reveal/DecryptedText/DecryptedText';
import chipsvideo from '../src/assets/Chipsvideo.mp4';

const ChipsReveal = () => {
  const descRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(false);
          setTimeout(() => setInView(true), 10);
        }
      },
      { threshold: 0.3 }
    );

    if (descRef.current) {
      observer.observe(descRef.current);
    }

    return () => {
      if (descRef.current) {
        observer.unobserve(descRef.current);
      }
    };
  }, []);

  return (
    <div className="chips-reveal-wrapper relative overflow-hidden">
      {/* ✅ Video Background (hidden on small screens via CSS) */}
      <video
        className="chips-video-bg"
        src={chipsvideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ✅ Text on top */}
      <div className="decrypted-chips-text">
        <DecryptedText
          text="INNOVATE. INSPIRE."
          sequential={true}
          useOriginalCharsOnly={false}
          animateOn="view"
          revealDirection="start"
          speed={80}
          maxIterations={40}
          parentClassName="decrypted-chips-text-inner"
        />

        <p
          ref={descRef}
          className={`chips-reveal-description ${inView ? 'fade-in-up' : ''}`}
        >
          At UPES ACM, we strive to push the boundaries of technology through collaboration,
          creativity, and community impact. Our initiatives are crafted to spark curiosity and build real-world solutions.
        </p>

        <p
          className={`chips-reveal-link ${inView ? 'fade-in-up' : ''}`}
          onClick={() => {
            document.getElementById('initiatives')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          From nurturing fresh ideas to building scalable tech solutions, our journey doesn't stop here. 
          Scroll ahead to discover the initiatives that bring our mission to life,<br />
          — one project, one breakthrough at a time.
        </p>
      </div>
    </div>
  );
};

export default ChipsReveal;
