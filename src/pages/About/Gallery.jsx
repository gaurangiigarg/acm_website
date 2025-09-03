import React, { useState, useEffect } from 'react';
import './Gallery.css';
import DecryptedText from '../../../Decrypted_Reveal/DecryptedText/DecryptedText';

import img1 from '../../assets/img/Prodigy24/HRK_0014.JPG';
import img2 from '../../assets/img/Prodigy24/HRK_0356.JPG';
import img3 from '../../assets/img/Prodigy24/HRK_7147.JPG';
import img4 from '../../assets/img/Prodigy24/umm.jpg';
import img5 from '../../assets/img/sherlocked/img1.jpg';
import img6 from '../../assets/img/HOC/img1.jpg';
import img7 from '../../assets/img/HOC/img2.jpg';
import img8 from '../../assets/img/sherlocked/img2.jpeg';



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
    let loadedCount = 0;
    const total = extendedGalleryData.length;

    // Preload all images
    extendedGalleryData.forEach((item) => {
      const img = new Image();
      img.src = item.imageUrl;
      img.loading = "eager"; // ensures browser preloads it immediately
      img.decoding = "async";
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) {
          setLoaded(true);
        }
      };
    });
  }, []);

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
        <div className={`acm-gallery-track ${loaded ? 'loaded' : ''}`}>
          {extendedGalleryData.map((item, index) => (
            <div
              className={`acm-gallery-card ${item.size} ${!loaded ? 'skeleton' : ''}`}
              key={index}
            >
              <img
                src={item.imageUrl}
                alt={`Team gallery item ${index + 1}`}
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
