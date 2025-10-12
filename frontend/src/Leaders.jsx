import React, { useState, useEffect } from 'react';
import './Leaders.css';
import DecryptedText from '../Decrypted_Reveal/DecryptedText/DecryptedText';

import img1 from '../src/assets/img/coverphoto.jpg';
import img2 from '../src/assets/images/TanayPrabhakar.jpg';
import img3 from '../src/assets/images/Sangam_Khanna.jpg';
import img4 from '../src/assets/images/Daksh_Mehrotra.jpeg';
import img5 from '../src/assets/images/Advika_Kaushik.jpg';
import img6 from '../src/assets/images/Rudransh_Sogani.jpg';


const galleryData = [
  { imageUrl: img1, size: 'large' },
  { imageUrl: img2, size: 'small' },
  { imageUrl: img3, size: 'large' },
  { imageUrl: img4, size: 'small' },
  { imageUrl: img5, size: 'large' },
  { imageUrl: img6, size: 'small' }
  
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
            text="HEAR FROM OUR LEADERS"
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
          Discover the vision, passion, and dedication that drive our success. In the following section, our executive team shares their personal journeys and insights, offering a glimpse into the heart of our community.
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