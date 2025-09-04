import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ExecutiveSlider.css';
import PrismaticBurst from '../../../PrismaticBurst/PrismaticBurst/PrismaticBurst/';

import PankajBadoni from '../../../src/assets/img/coverphoto.jpg';
import SangamKhanna from '../../../src/assets/images/Sangam_Khanna.jpg';
import TanayPrabhakar from '../../../src/assets/images/TanayPrabhakar.jpg';
import DakshMehrotra from '../../../src/assets/images/Daksh_Mehrotra.jpeg';
import AdvikaKaushik from '../../../src/assets/images/Advika_Kaushik.jpg';
import RudranshSogani from '../../../src/assets/images/Rudransh_Sogani.jpg';

const ArrowIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

const TeamMemberCard = ({ name, title, description, imageUrl, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) observer.observe(currentCardRef);
    return () => currentCardRef && observer.unobserve(currentCardRef);
  }, []);

  return (
    <div className={`team-card card-${index} ${isVisible ? 'is-visible' : ''}`} ref={cardRef}>
      <div className="image-container">
        <div className="image-overlay">
          <span>{title}</span>
        </div>
        <ArrowIcon className="arrow-icon" />
        <img
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x350/0a192f/64ffda?text=Image';
          }}
        />
      </div>
      <div className="description-container">
        <div className="description-content">
          <div className="desc-header">
            <h2 className="desc-name">{name.toUpperCase()}</h2>
            <p className="desc-title">{title.toUpperCase()}</p>
          </div>
          <p className="desc-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ExecutiveSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const sliderPageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const executivesData = [
    {
      name: "Pankaj Badoni",
      title: "Faculty Cooridnator",
      description: "Over the years with UPES ACM-W, we've achieved great success—winning national and international awards and making our annual event, Prodigy, a consistent hit. ACM has always supported impactful CSR initiatives and meaningful collaborations. Being part of ACM empowers everyone to grow, showcase their strengths, and contribute to a better community.",
      imageUrl: PankajBadoni
    },
    {
      name: "Sangam Khanna",
      title: "Chairperson",
      description: "When I was first introduced to ACM and ACM-W at UPES, I was still grasping the basics of coding. Initiatives like 21 Days of Code, Code Anytime, and Spy C helped boost my confidence and solidified my decision to continue with ACM. Being part of ACM has been rewarding—not just for improving my technical skills, but also for learning teamwork, public relations, and event management.",
      imageUrl: SangamKhanna
    },
    {
      name: "Tanay Prabhakar",
      title: "Vice-Chairperson",
      description: "When I joined college, the UPES-ACM Student Chapter quickly became a supportive community that helped me grow. It introduced me to a culture of coding excellence and teamwork. Over time, I moved from core member to office bearer and now serve as vice chairperson. This journey has been incredible, and as a leader, I aim to take our chapter to even greater heights, building on the legacy I received.",
      imageUrl: TanayPrabhakar
    },
    {
      name: "Daksh Mehrotra",
      title: "Secretary",
      description: "My journey with UPES ACM has been truly transformative. From attending a technical event in my first year to becoming a core member and now Secretary, it's been a remarkable experience. The chapter became a second home, helping me develop leadership skills, and grow as a coder through initiatives like Code Anytime.",
      imageUrl: DakshMehrotra
    },
    {
      name: "Advika Kaushik",
      title: "Joint Secretary",
      description: "Joining UPES ACM was a turning point in my journey. From leading the VFX team to now serving as chapter secretary, it's been a rewarding ride filled with learnings. The challenging environment pushed me to grow as a confident communicator and team player. I'm grateful for the experiences, the friendships, and the skills I've gained along the way.",
      imageUrl: AdvikaKaushik
    },
    {
      name: "Rudransh Sogani",
      title: "Treasurer",
      description: "Joining ACM and ACM-W at UPES marked the start of my programming journey. Activities like 21 Days of Code, Code Anytime, and Spy C helped build my confidence and solidified my fundamentals. The experience inspired me to stay involved, and being part of ACM-W has taught me not just technical skills, but also public relations, teamwork, and event organization. I'm proud to be part of such a vibrant and enriching student chapter.",
      imageUrl: RudranshSogani
    }
  ];

  // 👇 Responsiveness: adjust slides based on screen size
  const getSlides = () => {
    if (isMobile) {
      return executivesData.map((exec) => [exec]); // one per slide
    } else {
      const slides = [];
      for (let i = 0; i < executivesData.length; i += 2) {
        slides.push(executivesData.slice(i, i + 2));
      }
      return slides;
    }
  };

  const slides = getSlides();

  const goToNextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    timerRef.current = setInterval(goToNextSlide, 5000);
    return () => clearInterval(timerRef.current);
  }, [activeIndex, goToNextSlide]);

  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // IntersectionObserver for background fade
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSliderVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    const currentSliderPageRef = sliderPageRef.current;
    if (currentSliderPageRef) observer.observe(currentSliderPageRef);
    return () => {
      if (currentSliderPageRef) observer.unobserve(currentSliderPageRef);
    };
  }, []);

  const handleDotClick = (index) => {
    clearInterval(timerRef.current);
    setActiveIndex(index);
  };

  return (
    <div
      className="executive-slider-page"
      ref={sliderPageRef}
      style={{ position: 'relative', isolation: 'isolate' }}
    >
      <div
        style={{
          backgroundColor: '#000',
          position: 'absolute',
          inset: 0,
          zIndex: -2,
        }}
      />
      
      <div className="app-container">
        <div className="executives-slider">
          <div
            className="slides-container"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div className="slide" key={slideIndex}>
                {slide.map((executive, cardIndex) => (
                  <TeamMemberCard key={executive.name} {...executive} index={cardIndex} />
                ))}
              </div>
            ))}
          </div>
          <div className="dots-container">
            {slides.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                className={`dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSlider;
