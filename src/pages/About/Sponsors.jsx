import React from 'react';

import './Sponsors.css'; // Import the stylesheet
import TiltedCard from '../../../TitledCard/TiltedCard/TiltedCard'

import IBM from '../../assets/img/logos/IBM.png'; // ✅ use IBM image

const Sponsors = () => {
  return (
    <section className="sponsors-section-wrapper">
      <h2 className="sponsors-heading">
        Since 2010 we've been working with <span className="highlight">amazing partners</span> to create meaningful impact and compelling experiences.
      </h2>

      <div className="sponsors-cards">
    <TiltedCard
      imageSrc="https://raw.githubusercontent.com/upesnavneet/acm_website/main/src/assets/img/logos/Dell.jpg"
      altText="Dell Logo"
      containerHeight="250px"
      containerWidth="250px"
      imageHeight="250px"
      imageWidth="250px"
      rotateAmplitude={12}
      scaleOnHover={1}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
    />

    <TiltedCard
      imageSrc="https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/logos/IBM.png"
      altText="IBM Logo"
      containerHeight="250px"
      containerWidth="250px"
      imageHeight="250px"
      imageWidth="250px"
      rotateAmplitude={12}
      scaleOnHover={1}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
    />

    <TiltedCard
      imageSrc="https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/logos/Dell.jpg"
      altText="Dell Logo"
      containerHeight="250px"
      containerWidth="250px"
      imageHeight="250px"
      imageWidth="250px"
      rotateAmplitude={12}
      scaleOnHover={1}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
    />

    <TiltedCard
      imageSrc="https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/logos/Dell.jpg"
      altText="Dell Logo"
      containerHeight="250px"
      containerWidth="250px"
      imageHeight="250px"
      imageWidth="250px"
      rotateAmplitude={12}
      scaleOnHover={1}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
    />
  </div>
  


      
    </section>
  );
};

export default Sponsors;
