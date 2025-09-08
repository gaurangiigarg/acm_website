import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Initiatives.css';
import DecryptedText from '../Decrypted_Reveal/DecryptedText/DecryptedText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DOC from '../src/assets/img/webp_images/img1.webp';
import HOC from '../src/assets/img/webp_images/img2.webp';
import codeanytime from '../src/assets/img/webp_images/img3.webp';
import Spyc from '../src/assets/img/webp_images/img4.webp';

gsap.registerPlugin(ScrollTrigger);

// --- Data for the carousel cards ---
const cardData = [
  {
    category: 'Technical',
    title: '21 Days of Code',
    imageUrl: DOC,
  },
  {
    category: 'CSR',
    title: 'Hour Of Code',
    imageUrl: HOC,
  },
  {
    category: 'Technical',
    title: 'Code <br> Anytime',
    imageUrl: codeanytime,
  },
  {
    category: 'Technical',
    title: 'Spy-C',
    imageUrl: Spyc,
  },
  {
    category: 'Photography',
    title: 'Shutter-Saga',
    imageUrl:
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
];

// --- The Initiatives Carousel Component ---
function Initiatives() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);

  // ✅ Background fade runs ONLY on screens wider than 768px
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use GSAP's matchMedia for responsive ScrollTriggers
    let mm = gsap.matchMedia();

    // Add animation for "desktop" screens
    mm.add('(min-width: 769px)', () => {
      // This GSAP animation will only run on screens 769px and wider
      const bgFade = gsap.fromTo(
        el,
        { backgroundColor: '#000000' },
        {
          backgroundColor: '#02030a',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Return a cleanup function for this specific media query
      return () => {
        bgFade.kill(); // Kill the animation
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === el) trigger.kill();
        });
      };
    });

    // On mobile (768px and smaller), no GSAP animation is created.
    // We just set the final background color immediately.
    mm.add('(max-width: 768px)', () => {
      gsap.set(el, { backgroundColor: '#02030a' });
    });

    // General cleanup for the matchMedia instance
    return () => mm.revert();
  }, []);

  // ✅ Update navigation buttons (no change needed)
  const updateButtons = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const tolerance = 10;

    setPrevDisabled(scrollLeft < tolerance);
    setNextDisabled(scrollLeft > scrollWidth - clientWidth - tolerance);
  }, []);

  // ✅ Attach event listeners (no change needed)
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('scroll', updateButtons);
      window.addEventListener('resize', updateButtons);
      updateButtons();
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('scroll', updateButtons);
      }
      window.removeEventListener('resize', updateButtons);
    };
  }, [updateButtons]);

  // ✅ Scroll logic (no change needed)
  const getScrollAmount = () => {
    const carousel = carouselRef.current;
    if (!carousel) return 0;

    const card = carousel.querySelector('.carousel-card');
    if (!card) return 0;

    const carouselStyle = window.getComputedStyle(carousel);
    const cardGap = parseFloat(carouselStyle.gap) || 0;

    return card.offsetWidth + cardGap;
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="initiatives-container"
      style={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <DecryptedText
        text="INITIATIVES"
        sequential={true}
        useOriginalCharsOnly={false}
        animateOn="view"
        revealDirection="start"
        speed={50}
        maxIterations={40}
        parentClassName="initiatives-main-title"
      />

      <div className="initiatives-carousel-wrapper">
        <div className="initiatives-carousel-container" ref={carouselRef}>
          {cardData.map((card, index) => (
            <div
              key={index}
              className="carousel-card"
              style={{ backgroundImage: `url('${card.imageUrl}')` }}
            >
              <div className="card-overlay"></div>
              <div className="card-content">
                <p className="card-category">{card.category}</p>
                <h2
                  className="card-title"
                  dangerouslySetInnerHTML={{ __html: card.title }}
                ></h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="initiatives-navigation-controls">
        <button
          className="nav-button"
          onClick={handlePrevClick}
          disabled={isPrevDisabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <button
          className="nav-button"
          onClick={handleNextClick}
          disabled={isNextDisabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Initiatives;