import React, { useEffect } from 'react';
import useLenis from './useLenis';   // ✅ custom hook
import './About.css';
import image1 from '../src/assets/img/HOC/img5.jpeg';
import image2 from '../src/assets/img/Prodigy24/20240410_061802802_iOS.jpg';
import image3 from '../src/assets/img/Prodigy24/HRK_0356.jpg';

const About = () => {
  useLenis();

  useEffect(() => {
    // --- DOM Elements ---
    const scrollContainer = document.querySelector('.scroll-container');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const aboutText = document.querySelector('.about-text');

    // --- Animation Constants ---
    const startFontSize = 25;
    const endFontSize = 8;
    const startFlex = 55;
    const endFlex = 25;

    // --- Scroll Animation Handler ---
    const handleScroll = () => {
      if (!scrollContainer || !leftPanel || !rightPanel || !aboutText) return;

      // ✅ Disable scroll animation on small screens
      if (window.innerWidth <= 768) {
        leftPanel.style.flexBasis = '';
        rightPanel.style.flexBasis = '';
        aboutText.style.fontSize = '';
        return;
      }

      const scrollableHeight = scrollContainer.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      let scrollPercent = scrollTop / (scrollableHeight * 0.75);
      if (scrollPercent > 1) scrollPercent = 1;

      const currentFontSize =
        startFontSize - (startFontSize - endFontSize) * scrollPercent;
      const currentLeftFlex =
        startFlex - (startFlex - endFlex) * scrollPercent;
      const currentRightFlex = 100 - currentLeftFlex;

      requestAnimationFrame(() => {
        aboutText.style.fontSize = `${currentFontSize}vw`;
        leftPanel.style.flexBasis = `${currentLeftFlex}%`;
        rightPanel.style.flexBasis = `${currentRightFlex}%`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Image Carousel ---
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    let currentSlideIndex = 0;
    const slideInterval = 4000;

    const showNextSlide = () => {
      if (carouselSlides.length > 1) {
        carouselSlides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
        carouselSlides[currentSlideIndex].classList.add('active');
      }
    };
    const carouselTimer = setInterval(showNextSlide, slideInterval);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(carouselTimer);
    };
  }, []);

  return (
    <div className="scroll-container">
      <div className="sticky-container">
        {/* Decorative Arrow (hidden on mobile via CSS) */}
        <div className="decorative-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25"
            />
          </svg>
        </div>

        {/* Split Layout */}
        <div className="split-layout">
          {/* Left Panel */}
          <div className="left-panel">
            <h1 className="about-text">ABOUT</h1>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            {/* Carousel */}
            <div className="right-panel-image-container">
              <img src={image3} alt="Vision" className="carousel-slide active" />
              <img src={image2} alt="Growth" className="carousel-slide" />
              <img src={image1} alt="Community" className="carousel-slide" />
            </div>

            {/* Text */}
            <div className="right-panel-text-container">
              <div className="content-wrapper">
                <h2>
                  One of the Best <span>Student Chapters</span> since 10 Years.
                </h2>
                <p>
                  We work round-the-clock to hone the adroit programmer in our members through many events, workshops, fests, contests, and talks all year long. Our student body is headed by confident and proficient members who work seamlessly for this cause.
                </p>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
