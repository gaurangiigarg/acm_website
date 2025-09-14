import React, { useState, useEffect } from 'react';
import './TeamsGallery.css';
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

const TeamGallery = () => {
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
    <section className="gallery-section-wrapper">
      <div className="gallery-description">
        <h2>
          <DecryptedText
            text="DRIVEN BY INNOVATION"
            sequential={true}
            useOriginalCharsOnly={false}
            animateOn="view"
            revealDirection="start"
            speed={35}
            maxIterations={10}
            parentClassName="gallery-description"
          />
        </h2>
        <p>
          The ACM Student Chapter is a collective of passionate creators, problem-solvers, and tech enthusiasts. We are dedicated to exploring the frontiers of computing and fostering a community where ideas can flourish and evolve into impactful projects.
        </p>
      </div>

      {!loaded ? (
        <div className="scrolling-gallery-container">
          <div className="scrolling-track">
            {extendedGalleryData.map((item, index) => (
              <div
                className={`gallery-card ${item.size} skeleton`}
                key={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="scrolling-gallery-container">
          <div className="scrolling-track">
            {extendedGalleryData.map((item, index) => (
              <div className={`gallery-card ${item.size}`} key={index}>
                <img
                  src={item.imageUrl}
                  alt={`Team gallery item ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamGallery;
