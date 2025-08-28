import React, { useRef, useEffect, useState } from 'react';
import BlurText from '../BlurText/BlurText/BlurText';
import AboutCarousel from '../Carousel/Carousel/Carousel'; 
import './About.css';

// This component is designed to be a self-contained section of your page.
const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Intersection Observer to trigger animations when the section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    // ✅ Changed <section> to <div> as requested.
    // This block-level element should appear below the preceding content.
    <div
      ref={sectionRef}
      id="about"
      className={`about-container fade-section ${visible ? 'visible' : ''}`}
    >
      {/* Left content column */}
      <div className="about-left">
        

        <h2 className="about-heading">
          One of the Best <span className="highlight">Student Chapters</span><br />
          since <span className="highlight">10 Years.</span>
        </h2>

        <p className="about-description">
          We work round-the-clock to hone the adroit programmer in our members through many events,
          workshops, fests, contests, and talks all year long. Our student body is headed by confident
          and proficient members who work seamlessly for this cause. This holistic approach equips our members with the skills, confidence, and industry exposure necessary to excel in competitive career paths and future professional endeavors.
        </p>

        <ul className="about-features">
          <li>Complete Holistic Development</li>
          <li>Guided Mentorship from Seniors</li>
          <li>Community Access, Coding classes, Projects etc.</li>
        </ul>
      </div>

      {/* Right content column */}
      <div className="about-right">
        <AboutCarousel
          baseWidth={500}
          autoplay={true}
          autoplayDelay={6000}
          pauseOnHover={true}
          loop={true}
          round={false} 
        />
      </div>
    </div>
  );
};

export default About;
