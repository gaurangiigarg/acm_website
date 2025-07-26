import React, { useEffect, useState } from 'react';
import './Initiatives.css';
import DarkVeil from '../DarkVeil/DarkVeil/DarkVeil';
import TextType from '../TextType/TextType/TextType'; // Optional if you use a typewriter header

const slides = [
  {
    title: '21 Days of Code',
    description: 'We launched 21 Days of Code to promote the environment for competitive programming and instil coding as second nature and a daily habit for 21 regular days.',
    image: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/images/img3.jpg',
  },
  {
    title: 'Code Anytime',
    description: 'Code Anytime is our round-the-year initiative to encourage free-spirited coding among beginners to amplify their passion for programming.',
    image: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/codeanytime24/20240902_184253.jpg',
  },
  {
    title: 'Hour of Code',
    description: 'The CSR team puts their words to action, and brings smiles across the faces of the underprivileged society. The team makes the activities as interactive as possible..',
    image: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/HOC/img5.jpeg',
  },
];

const Initiatives = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="initiatives-section">
      <div className="darkveil-background">
        <DarkVeil />
      </div>

      <h2 className="initiatives-header">
        <TextType text="Our Initiatives" speed={100} />
      </h2>

      <div className="slideshow-wrapper">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`initiative-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} className="slide-image" />
            <div className="slide-text">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active-dot' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Initiatives;
