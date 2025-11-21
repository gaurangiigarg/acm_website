import React from 'react';
import './Initiatives.css';
import CircularGallery from '../src/components/Circulargallery/CircularGallery';



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