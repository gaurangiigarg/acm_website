import React, { useEffect, useRef } from 'react';
import Navbar from '../../Navbar';
import './Prodigy.css';
import theme from '../../assets/ThemeReveal/reveal.mp4';

import Sponsors from './Sponsors.jsx';
import PrismaticBurst from '../../../PrismaticBurst/PrismaticBurst/PrismaticBurst'; 

// Poster images
import funtech from '../../assets/Prodigy_posters/funtech.png';
import ICPC from '../../assets/Prodigy_posters/ICPC.png';
import treasurehunt from '../../assets/Prodigy_posters/treasurehunt.jpg';
import bgmi from '../../assets/Prodigy_posters/bgmi.png';
import valorant from '../../assets/Prodigy_posters/val.png';
import SOL from '../../assets/Prodigy_posters/SOL.png';
import SOB from '../../assets/Prodigy_posters/SOB.png';
import SOD from '../../assets/Prodigy_posters/SOD.jpg';

import gss from '../../assets/Prodigy_posters/gss.png';
import photography from '../../assets/Prodigy_posters/photography.jpg';

import logo from '../../assets/acmlogoo.png';

const Prodigy = () => {
  const containerRef = useRef(null);

  const events = [
    { 
      id: 1, 
      title: "EMOJI.EXE", 
      category: "Fun-Tech",
      image: funtech,
      description: "Solve algorithmic challenges with a fun twist. Decode emoji-based problems and bring a playful spin to competitive coding."
    },
    { 
      id: 2, 
      title: "Code-Sprint", 
      category: "Technical",
      image: ICPC,
      description: "ICPC contest designed to tackle optimized algorithms and problem-solving rounds designed for competitive programmers."
    },
    { 
      id: 3, 
      title: "Stylograph", 
      category: "Design",
      image: SOD,
      description: "Iterate and present design solutions to real briefs."
    },
    { 
      id: 4, 
      title: "The Mystery of Nevermore", 
      category: "Treasure Hunt",
      image: treasurehunt,
      description: "A campus-wide hunt. Decode clues, collaborate across teams and race to uncover the final hidden prize."
    },
    { 
      id: 5, 
      title: "Guest Speaker Program", 
      category: "Interactive Session",
      image: gss,
      description: "Hear from Dr. Neeraj Chugh, Associate Professor at UPES, about practical insights into tech careers and research."
    },
    { 
      id: 6, 
      title: "Vaad Vivaad 3.0", 
      category: "Law & Technology",
      image: SOL,
      description: "Debate the ethics and legalities of emerging tech and AI. Policy, AI governance and mock courtroom simulations for technolegal challenges."
    },
    { 
      id: 7, 
      title: "The Bid Affair", 
      category: "Business & Technology",
      image: SOB,
      description: "Business strategy meets tech execution — pitch, negotiate and compete in simulated startup and market scenarios."
    },
    { 
      id: 8, 
      title: "Lenscape", 
      category: "Photography Contest",
      image: photography,
      description: "Capture the Innosphere. A photographic contest focused on storytelling and composition"
    },
    { 
      id: 9, 
      title: "Battle Pulse", 
      category: "Gaming",
      image: bgmi,
      description: "High-octane BGMI squads compete in tactical matches. Strategy, coordination and clutch plays decide the champions."
    },
    { 
      id: 10, 
      title: "Predator League", 
      category: "Gaming",
      image: valorant,
      description: "A competitive Valorant league featuring ranked-style matches, team strategies and high-stakes elimination rounds."
    },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (containerRef.current) {
      // The querySelectorAll looks INSIDE containerRef. 
      // The footer must be a child of the container for this to work.
      const elementsToAnimate = containerRef.current.querySelectorAll('.fade-on-scroll, .video-wrapper-outer, .theme-header, .domain-card, .event-poster-card, .innosphere-text-section, .prodigy-footer');
      elementsToAnimate.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <div className="prismatic-bg-layer">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={2}
          speed={0.35}
          distort={0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={0}
          mixBlendMode="lighten"
          colors={['#0b1e70']}
        />
      </div>

      {/* Main Container */}
      <div className="prodigy-container" ref={containerRef}>
        <div className="prodigy-bg-glow"></div>
        <div className="prodigy-grid-lines"></div>

        <section className="prodigy-hero">
          <div className="hero-content">
            <span className="hero-label">UPES ACM PRESENTS</span>
            <h1 className="hero-title">PRODIGY '25</h1>
            <h2 className="hero-theme">INNOSPHERE</h2>
            <p className="hero-tagline">
              Where Code Collides with Reality.
            </p>
          </div>
        </section>

        <section className="innosphere-text-section fade-on-scroll">
          <h3>THE THEME</h3>
          <p>
            The Innosphere is not merely a theme; it is a living, breathing digital ecosystem. 
            It represents the precise moment where human creativity intersects with machine intelligence 
            to forge a new reality. In this sphere, ideas are not just thought—they are engineered.
          </p>
        </section>

        <section className="video-section fade-on-scroll">
          <div className="video-wrapper-outer">
            <div className="video-container">
              <div className="video-placeholder"></div>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/QHvaMvPNCKc?autoplay=1&mute=1&loop=1&playlist=QHvaMvPNCKc"
                title="Theme Reveal Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset: 0,
                  objectFit: 'cover'
                }}
              ></iframe>
            </div>
            <div className="video-corner-accent top-left"></div>
            <div className="video-corner-accent bottom-right"></div>
          </div>
        </section>

        <section className="innosphere-text-section fade-on-scroll">
          <h3>BEYOND BOUNDARIES</h3>
          <p>
            As the lines between the physical and digital worlds blur, we invite you to step into 
            a dimension of limitless possibility. Witness the genesis of a new era where 
            technology creates a symbiotic relationship with law, design, and sustainability.
          </p>
        </section>

        <section className="theme-description">
          <div className="theme-header fade-on-scroll">
            <h3>THE CONVERGENCE</h3>
            <p>
              Innosphere is the nexus where technology transcends code. 
              It represents the cross-domain fusion of engineering with the fundamental pillars of modern society.
            </p>
          </div>

          <div className="domain-grid">
            <div className="domain-card fade-on-scroll" style={{ transitionDelay: '0ms' }}>
              <div className="card-icon"></div>
              <h4>Tech x Law</h4>
              <p>Solving legal complexities through automation, AI governance, and smart contracts.</p>
            </div>
            <div className="domain-card fade-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="card-icon"></div>
              <h4>Tech x Business</h4>
              <p>Revolutionizing fintech, market analytics, and algorithmic trading strategies.</p>
            </div>
            <div className="domain-card fade-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="card-icon"></div>
              <h4>Tech x Design</h4>
              <p>Merging generative art, UI/UX psychology, and spatial computing for immersive experiences.</p>
            </div>
          </div>
        </section>

        <section className="events-section">
          <div className="theme-header fade-on-scroll">
            <h3>EVENTS LINEUP</h3>
            <p>The Ten Challenges.</p>
          </div>

          <div className="events-grid">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className="event-poster-card fade-on-scroll"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="poster-image-placeholder">
                  <img 
                    src={event.image} 
                    alt={`${event.title} poster`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="poster-overlay">
                  <h5>{event.title}</h5>
                  <span className="event-category">{event.category}</span>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Sponsors />

        {/* Footer MOVED INSIDE the .prodigy-container so the ref can find it */}
        <footer className="prodigy-footer fade-on-scroll">
          <div className="footer-content">
            <img src={logo} alt="UPES ACM Logo" className="footer-logo" />

            <button 
              className="register-btn"
              onClick={() => window.open("https://linktr.ee/acmprodigy25", "_blank")}
            >
              REGISTER NOW
            </button>

            <div className="date-location">
              <span>NOVEMBER 2025</span>
              <span className="separator">|</span>
              <span>UPES DEHRADUN</span>
            </div>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} UPES ACM Student Chapter. All rights reserved.</p>
        </footer>

      </div> {/* End of prodigy-container */}
    </>
  );
};

export default Prodigy;