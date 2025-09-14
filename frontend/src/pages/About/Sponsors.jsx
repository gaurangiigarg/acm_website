import React from 'react';

import './Sponsors.css'; // Import the stylesheet
import TiltedCard from '../../../TitledCard/TiltedCard/TiltedCard'

import Dell from '../../assets/img/logos/Dell.jpg'; 
import IBM from '../../assets/img/logos/IBM.jpg';
import Azure from '../../assets/img/logos/Azure.jpg';
import PyNet from '../../assets/img/logos/PyNet.jpg';
import AWS from '../../assets/img/logos/AWS.jpg';

const Sponsors = () => {
  return (
    <section className="sponsors-section-wrapper">
      <h2 className="sponsors-heading">
        Since 2010 we've been working with <span className="highlight">amazing partners</span> to create meaningful impact and compelling experiences.
      </h2>

      <div className="sponsors-cards">
    <TiltedCard
      imageSrc={Dell}
      altText="Dell Logo"
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
      imageSrc={AWS}
      altText="AWS Logo"
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
      imageSrc={IBM}
      altText="IBM Logo"
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
      imageSrc={Azure}
      altText="Microsoft Azure Logo"
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
      imageSrc={PyNet}
      altText="PyNet Logo"
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

export default Sponsors;
