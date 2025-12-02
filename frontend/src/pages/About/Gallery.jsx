import React, { useState, useEffect } from 'react';
import './Gallery.css';
import DecryptedText from '../../../Decrypted_Reveal/DecryptedText/DecryptedText';

import img1 from '../../assets/events_gallery/AICWiC/31.jpg'
import img2 from '../../assets/events_gallery/Prodigy25/1.jpg';
import img3 from '../../assets/events_gallery/Prodigy25/32.jpg';
import img4 from '../../assets/events_gallery/AICWiC/3.jpg';
import img5 from '../../assets/events_gallery/Prodigy25/28.jpg';
import img6 from '../../assets/events_gallery/Prodigy25/40.jpg';
import img7 from '../../assets/events_gallery/AICWiC/1.jpg';
import img8 from '../../assets/events_gallery/AICWiC/25.jpg';

const galleryData = [
  { imageUrl: img1, size: 'large' },
  { imageUrl: img2, size: 'small' },
  { imageUrl: img3, size: 'large' },
  { imageUrl: img4, size: 'small' },
  { imageUrl: img5, size: 'large' },
  { imageUrl: img6, size: 'small' },
  { imageUrl: img7, size: 'large' },
  { imageUrl: img8, size: 'small' }
];

// Repeat gallery for infinite scroll effect
const extendedGalleryData = [...galleryData, ...galleryData];

const Gallery = () => {
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {

    setLoaded(true);
  }, []); // Empty dependency array runs this only once on mount.

  return (
    <section className="acm-gallery-wrapper">
      <div className="acm-gallery-description">
        <h2>
          <DecryptedText
            text="A FORCE CALLED ACM"
            sequential={true}
            useOriginalCharsOnly={false}
            animateOn="view"
            revealDirection="start"
            speed={35}
            maxIterations={10}
            parentClassName="acm-gallery-description"
          />
        </h2>
        <p>
          The ACM Student Chapter is a collective of passionate creators, problem-solvers, and tech enthusiasts. 
          We are dedicated to exploring the frontiers of computing and fostering a community where ideas can flourish 
          and evolve into impactful projects.
        </p>
      </div>

      <div className="acm-gallery-container">
        {/* The 'loaded' class (which starts the animation) is now added almost instantly */}
        <div className={`acm-gallery-track ${loaded ? 'loaded' : ''}`}>
          {extendedGalleryData.map((item, index) => (
            <div
              className={`acm-gallery-card ${item.size} ${!loaded ? 'skeleton' : ''}`}
              key={index}
            >
              <img
                src={item.imageUrl}
                alt={`Team gallery item ${index + 1}`}
                loading="eager"  // Keep eager loading since it's part of an animation
                decoding="async" // Keep async decoding to prevent jank
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;