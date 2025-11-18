import React from 'react';
import './Initiatives.css';
import DecryptedText from '../Decrypted_Reveal/DecryptedText/DecryptedText';
import CircularGallery from '../src/components/Circulargallery/CircularGallery';

// Imports kept as requested
import DOC from '../src/assets/img/webp_images/img1.webp';
import HOC from '../src/assets/img/webp_images/img2.webp';
import codeanytime from '../src/assets/img/webp_images/img3.webp';
import Spyc from '../src/assets/img/webp_images/img4.webp';

function Initiatives() {
  return (
    <div 
      style={{ 
        backgroundColor: '#000000', 
        minHeight: '100vh', 
        width: '100%', 
        display: 'flex',           // Enables Flexbox
        justifyContent: 'center',  // Centers horizontally
        alignItems: 'center',      // Centers vertically
        overflow: 'hidden' 
      }}
    >
      <div className="initiatives-container">
        <CircularGallery
          textAutoHide={false}
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={false}
          spotlightRadius={300}
          glowColor="0, 0, 139"
        />
      </div>
    </div>
  );
}

export default Initiatives;