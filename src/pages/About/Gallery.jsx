import React, { useState, useEffect } from 'react';
import './Gallery.css';
import DecryptedText from '../../../Decrypted_Reveal/DecryptedText/DecryptedText';

const galleryData = [
  { imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Prodigy24/HRK_0014.JPG', size: 'large' },
  { imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Prodigy24/HRK_0356.JPG', size: 'small' },
  { imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Prodigy24/HRK_7147.JPG', size: 'large' },
  { imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Prodigy24/20240410_061802802_iOS.jpg', size: 'small' },
  { imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/sherlocked/img1.jpg', size: 'large' },
  { imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/HOC/img1.jpg', size: 'small' },
  { imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/HOC/img2.jpg', size: 'large' },
  { imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/sherlocked/img2.jpeg', size: 'small' }
];

const extendedGalleryData = [...galleryData, ...galleryData];

const Gallery = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const total = extendedGalleryData.length;

    extendedGalleryData.forEach((item) => {
      const img = new Image();
      img.src = item.imageUrl;
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
        <div className="acm-gallery-track">
          {extendedGalleryData.map((item, index) => (
            <div
              className={`acm-gallery-card ${item.size} ${!loaded ? 'skeleton' : ''}`}
              key={index}
            >
              {loaded && <img src={item.imageUrl} alt={`Team gallery item ${index + 1}`} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
