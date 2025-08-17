import React, { useRef, useEffect, useState } from 'react';
import BlurText from '../../../BlurText/BlurText/BlurText'
import AboutCarousel from '../../../Carousel/Carousel/Carousel'; 
import './Description.css'; // 👈 new CSS file

const AboutSection = () => {
  const sectionRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`about-section fade-section ${visible ? 'visible' : ''}`}
      ref={sectionRef}
      id="about"
    >
      {/* Left content */}
      <div className="about-left">
        <h2 className="about-heading">
          One of the Best <span className="about-highlight">Student Chapters</span><br />
          since <span className="about-highlight">10 Years.</span>
        </h2>

        <p className="about-paragraph">
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

      {/* Right content */}
      <div className="about-right">
        <AboutCarousel
          baseWidth={500}
          autoplay={true}
          autoplayDelay={6000}
          pauseOnHover={true}
          loop={true}
          round={false} />
      </div>
    </section>
  );
};

export default AboutSection;
