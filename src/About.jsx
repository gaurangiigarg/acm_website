import React, { useEffect } from 'react';
import useLenis from './useLenis';    
import './About.css';
import image1 from '../src/assets/img/HOC/img5.jpeg';
import image2 from '../src/assets/img/Prodigy24/umm.jpg';
import image3 from '../src/assets/img/Prodigy24/grp.jpg';
import DecryptedText from '../Decrypted_Reveal/DecryptedText/DecryptedText';
import BlurText from '../BlurText/BlurText/BlurText';

const About = () => {
  useLenis();

  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const aboutText = document.querySelector('.about-text');

    // --- Scroll Animation Handler for Shrinking Effect ---
    const handleScroll = () => {
      if (!scrollContainer || !leftPanel || !rightPanel || !aboutText || window.innerWidth <= 768) return;

      const shrinkScrollDistance = window.innerHeight;
      const scrollTop = window.scrollY;

      let scrollPercent = scrollTop / shrinkScrollDistance;
      if (scrollPercent > 1) scrollPercent = 1;

      const startFontSize = 25, endFontSize = 8;
      const startFlex = 55, endFlex = 25;

      const currentFontSize = startFontSize - (startFontSize - endFontSize) * scrollPercent;
      const currentLeftFlex = startFlex - (startFlex - endFlex) * scrollPercent;
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
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
        carouselSlides[currentSlideIndex].classList.add('active');
      }
    };
    const carouselTimer = setInterval(showNextSlide, slideInterval);

    // --- Intersection Observer for Text Animation (repeats every scroll) ---
    const textSections = document.querySelectorAll('.text-section');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    };

    const textObserver = new IntersectionObserver(observerCallback, observerOptions);
    textSections.forEach(section => textObserver.observe(section));

    // --- Cleanup ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(carouselTimer);
      textObserver.disconnect();
    };
  }, []);

  return (
    <div className="scroll-container">
      <div className="sticky-container">
        <div className="split-layout">
          {/* Left Panel */}
          <div className="left-panel">
            <h1 className="about-text">
              <DecryptedText
                        text="ABOUT"
                        sequential={true}
                        useOriginalCharsOnly={false}
                        animateOn="view"
                        revealDirection="start"
                        speed={120}
                        maxIterations={5}
                        
                      /> 
            </h1>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            {/* Carousel */}
            <div className="right-panel-image-container">
              <img src={image3} alt="Vision" className="carousel-slide active" />
              <img src={image2} alt="Growth" className="carousel-slide" />
              <img src={image1} alt="Community" className="carousel-slide" />
            </div>

            {/* Text Container */}
            <div className="right-panel-text-container">
              <div className="text-section">
                <h2>One of the best <span>Student Chapters</span> since 10 years.</h2>
                <p>
                  Work with the industry's finest—an experienced senior team
                  that's grown together through years of collaboration, united
                  by one goal: making your project exceed every expectation.
                </p>
              </div>

              <div className="text-section">
                <h2>Innovation-aligned</h2>
                <p>
                  We stay ahead of the curve, integrating the latest
                  technologies and creative strategies to deliver solutions
                  that are not just current, but also future-proof.
                </p>
              </div>

              <div className="text-section">
                <h2></h2>
                <p>
                  
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
