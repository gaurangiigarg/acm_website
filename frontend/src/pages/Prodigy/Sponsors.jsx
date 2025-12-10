import React from 'react';

import './Sponsors.css'; // Import the stylesheet
import TiltedCard from '../../../TitledCard/TiltedCard/TiltedCard'

import CodingNinjas from '../../assets/img/logos/ninjas.png'; 
import unstop from '../../assets/img/logos/unstop.png';
import konfhub from '../../assets/img/logos/konfhub.png';


const  Cards= () => {
  return (
    <section className="sponsors-section-wrapper">
      <h2 className="sponsors-heading">
       Proudly supported by  <span className="highlight">our partners</span> who help us turn ideas into impact. 
      </h2>

      <div className="sponsors-cards">
    <TiltedCard
      imageSrc={CodingNinjas}
      altText="Coding Ninjas Logo"
      containerHeight="250px"
      containerWidth="250px"
      imageHeight="250px"
      imageWidth="250px"
      rotateAmplitude={20}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
    />

    <TiltedCard
      imageSrc={unstop}
      altText="Unstop Logo"
      containerHeight="250px"
      containerWidth="250px"
      imageHeight="250px"
      imageWidth="250px"
      rotateAmplitude={20}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
    />

     <TiltedCard
      imageSrc={konfhub}
      altText="Konfhub Logo"
      containerHeight="250px"
      containerWidth="250px"
      imageHeight="250px"
      imageWidth="250px"
      rotateAmplitude={20}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
    />

    

    
  </div>
  


      
    </section>
  );
};

export default Cards;
