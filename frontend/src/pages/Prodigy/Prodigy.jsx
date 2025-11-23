import React, { useEffect, useRef } from 'react';
import Navbar from '../../Navbar';
import './Prodigy.css';

// Assuming PrismaticBurst is a component that renders the dynamic background.
import PrismaticBurst from '../../../PrismaticBurst/PrismaticBurst/PrismaticBurst'; 

const Prodigy = () => {
  const containerRef = useRef(null);

  // Event Data (Kept the same for consistency)
  const events = [
    { 
      id: 1, 
      title: "CodeWars", 
      category: "Competitive Coding",
      description: "A high-octane competitive programming battle to test your algorithmic prowess against the best minds."
    },
    { 
      id: 2, 
      title: "RoboRumble", 
      category: "Robotics",
      description: "Design, build, and battle autonomous bots in an arena of steel, circuits, and destruction."
    },
    { 
      id: 3, 
      title: "Design Derbi", 
      category: "UI/UX Design",
      description: "Craft seamless user experiences and stunning visual interfaces in this intense UI/UX showdown."
    },
    { 
      id: 4, 
      title: "Innovate-X", 
      category: "Hackathon",
      description: "A 24-hour marathon to solve real-world problems using bleeding-edge technology and innovation."
    },
    { 
      id: 5, 
      title: "CyberSiege", 
      category: "Cybersecurity",
      description: "Defend the digital fortress or breach the firewalls in this capture-the-flag cybersecurity challenge."
    },
    { 
      id: 6, 
      title: "AlgoTrade", 
      category: "FinTech",
      description: "Master the financial markets using algorithmic strategies and predictive modeling in a simulated economy."
    },
    { 
      id: 7, 
      title: "GameZone", 
      category: "E-Sports",
      description: "Compete in the ultimate e-sports tournament featuring high-stakes matches in Valorant and FIFA."
    },
    { 
      id: 8, 
      title: "TechTrivia", 
      category: "Quiz",
      description: "Test your geek quotient in this rapid-fire quiz covering everything from silicon chips to sci-fi lore."
    },
    { 
      id: 9, 
      title: "PaperPres", 
      category: "Research",
      description: "Showcase your groundbreaking research and technical papers to a panel of industry experts."
    },
    { 
      id: 10, 
      title: "TreasureHunt", 
      category: "Fun Event",
      description: "Decode cryptic technical clues and navigate the campus to find the hidden loot before time runs out."
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

    // Select elements within this component to animate
    if (containerRef.current) {
      const elementsToAnimate = containerRef.current.querySelectorAll('.fade-on-scroll, .video-wrapper-outer, .theme-header, .domain-card, .prodigy-cta, .event-poster-card, .innosphere-text-section');
      
      elementsToAnimate.forEach(el => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* NEW: PrismaticBurst container - Fixed background layer */}
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
    colors={['#3520cf',]}
  />
      </div>

      <div className="prodigy-container" ref={containerRef}>
        
        {/* Background elements moved to CSS layer or removed if PrismaticBurst handles it */}
        {/* Keeping glow and grid lines in case they overlay PrismaticBurst */}
        <div className="prodigy-bg-glow"></div>
        <div className="prodigy-grid-lines"></div>

        {/* HERO SECTION */}
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

        {/* INNOSPHERE INTRO TEXT */}
        <section className="innosphere-text-section fade-on-scroll">
          <h3>THE THEME</h3>
          <p>
            The Innosphere is not merely a theme; it is a living, breathing digital ecosystem. 
            It represents the precise moment where human creativity intersects with machine intelligence 
            to forge a new reality. In this sphere, ideas are not just thought—they are engineered.
          </p>
        </section>

        {/* THEME REVEAL VIDEO SECTION */}
        <section className="video-section fade-on-scroll">
          <div className="video-wrapper-outer">
            <div className="video-container">
              {/* PLACEHOLDER FOR YOUTUBE/MP4 EMBED */}
              <div className="video-placeholder">
                <div className="play-button-circle">
                  <div className="play-triangle"></div>
                </div>
                <span className="video-text">THEME REVEAL COMING SOON</span>
              </div>
              {/* To add video, uncomment and add src:
              <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                  title="Prodigy Theme Reveal" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
              </iframe> 
              */}
            </div>
            <div className="video-corner-accent top-left"></div>
            <div className="video-corner-accent bottom-right"></div>
          </div>
        </section>

        {/* INNOSPHERE OUTRO TEXT */}
        <section className="innosphere-text-section fade-on-scroll">
          <h3>BEYOND BOUNDARIES</h3>
          <p>
            As the lines between the physical and digital worlds blur, we invite you to step into 
            a dimension of limitless possibility. Witness the genesis of a new era where 
            technology creates a symbiotic relationship with law, design, and sustainability.
          </p>
        </section>

        {/* ABOUT THE THEME */}
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
              <div className="card-icon">⚖️</div>
              <h4>Tech x Law</h4>
              <p>Solving legal complexities through automation, AI governance, and smart contracts.</p>
            </div>
            <div className="domain-card fade-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="card-icon">💼</div>
              <h4>Tech x Business</h4>
              <p>Revolutionizing fintech, market analytics, and algorithmic trading strategies.</p>
            </div>
            <div className="domain-card fade-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="card-icon">🎨</div>
              <h4>Tech x Design</h4>
              <p>Merging generative art, UI/UX psychology, and spatial computing for immersive experiences.</p>
            </div>
            <div className="domain-card fade-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="card-icon">🌱</div>
              <h4>Tech x Sustainability</h4>
              <p>Engineering solutions for climate change, green energy, and smart urban planning.</p>
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section className="events-section">
          <div className="theme-header fade-on-scroll">
            <h3>EVENTS LINEUP</h3>
            <p>Ten challenges. One arena. Choose your battleground.</p>
          </div>
          
          <div className="events-grid">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className="event-poster-card fade-on-scroll"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="poster-image-placeholder">
                  <span>{event.id.toString().padStart(2, '0')}</span>
                </div>
                <div className="poster-overlay">
                  <h5>{event.title}</h5>
                  <span className="event-category">{event.category}</span>
                  <p className="event-description">{event.description}</p>
                  <button className="poster-btn">→</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER / CTA */}
        <section className="prodigy-cta fade-on-scroll">
          <button className="register-btn">REGISTER NOW</button>
          <div className="date-location">
            <span>MARCH 2025</span>
            <span className="separator">|</span>
            <span>UPES DEHRADUN</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Prodigy;