import React, { useRef, useEffect, useState } from 'react';
import './ChipsReveal.css';
import chipsvideo from '../src/assets/Chipsvideo.webm';

// ✅ 1. CREATE A CUSTOM HOOK to check screen size
// This hook returns `true` if the media query matches, and `false` otherwise.
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};


const ChipsReveal = () => {
  const descRef = useRef(null);
  const [inView, setInView] = useState(false);

  // ✅ 2. USE THE HOOK to determine if we are on a desktop screen
  // We'll consider anything wider than 768px as "desktop".
  const isDesktop = useMediaQuery('(min-width: 769px)');

  useEffect(() => {
    // ✅ 3. CONDITIONAL LOGIC
    // Only set up the IntersectionObserver if we are on a desktop.
    if (isDesktop) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(false);
            setTimeout(() => setInView(true), 10);
          }
        },
        { threshold: 0.3 }
      );

      const currentDescRef = descRef.current;
      if (currentDescRef) {
        observer.observe(currentDescRef);
      }

      return () => {
        if (currentDescRef) {
          observer.unobserve(currentDescRef);
        }
      };
    } else {
      // On smaller screens, just set the text to be visible immediately.
      // No observer, no animation, no lag.
      setInView(true);
    }
  }, [isDesktop]); // Re-run the effect if the screen size crosses the breakpoint

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
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* ✅ Text on top */}
      <div className="decrypted-chips-text">
        <h1 className="decrypted-chips-text-inner">INNOVATE. INSPIRE.</h1>

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