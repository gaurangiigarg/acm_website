import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { lazy, Suspense, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import useLenis from './useLenis';
import Particles from '../Background1/Particles/Particles';
import Home from './home';
import Navbar from './Navbar';
import About from './About';
import ScrollReveal from '../ScrollReveal/ScrollReveal/ScrollReveal';
import Silk from '../Silk_background/Silk/Silk';
import RevealSection1 from './RevealSection1';
import BackgroundReveal from './BackgroundReveal';
import ExecutiveSlider from '../src/components/executivescard/ExecutiveSlider';
import ExecutivesIntro from './ExecutivesIntro';
import Initiatives from './Initiatives';
import AboutUs from './pages/About/AboutUsSection';   // ✅ Full About Page
import TeamsPage from './pages/Teams/TeamsPage'; 
import './App.css';

const Robot = lazy(() => import('./Robot'));
const ChipsReveal = lazy(() => import('./ChipsReveal'));

gsap.registerPlugin(ScrollTrigger);

function MainLandingPage() {
  useLenis();

  useLayoutEffect(() => {
    const aboutRevealSections = gsap.utils.toArray('.horizontal-scroll-section');

    aboutRevealSections.forEach((section) => {
      const inner = section.querySelector('.horizontal-inner');
      const panels = gsap.utils.toArray('.horizontal-panel', inner);
      if (!inner || panels.length === 0) return;

      const totalScroll = inner.scrollWidth - window.innerWidth;

      gsap.to(inner, {
        x: () => `-${totalScroll}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="global-silk-bg">
        <Silk speed={5} scale={1} color="#0d1b3f" noiseIntensity={1.5} rotation={0} />
      </div>
      <section className="app-section particles-section" id="home">
        <Home />
        <Particles
          particleColors={['#0C1636']}
          particleCount={50}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </section>
      <section className="app-section vertical-section" id="about-reveal">
        <About />
      </section>
      <section className="app-section vertical-section">
        <RevealSection1 />
      </section>
      <section className="app-section scroll-reveal-section" id="reveal-text">
        <div className="scroll-reveal-content">
          <ScrollReveal baseOpacity={0.8} enableBlur={true} baseRotation={20} blurStrength={50}>
            Want to know who makes all that happen?
          </ScrollReveal>
        </div>
      </section>
      <section className="app-section vertical-section">
        <BackgroundReveal />
      </section>
      <section className="app-section horizontal-scroll-section" id="chips-reveal">
        <div className="horizontal-inner" style={{ display: 'flex', height: '100vh', willChange: 'transform' }}>
          <div className="horizontal-panel" style={{ flex: '0 0 100vw' }}>
            <div className="robot-fade-container">
              <Suspense fallback={<div>Loading...</div>}>
                <Robot />
              </Suspense>
            </div>
          </div>
          <div className="horizontal-panel" style={{ flex: '0 0 100vw' }}>
            <Suspense fallback={<div>Loading...</div>}>
              <ChipsReveal />
            </Suspense>
          </div>
        </div>
      </section>
      <section className="app-section vertical-section" id="initiatives">
        <Initiatives />
      </section>
      <section id="spline-section" style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <ExecutivesIntro />
      </section>
      <section className="app-section vertical-section" id="executives">
        <ExecutiveSlider />
      </section>
    </>
  );
}

export default function App() {
  // Detect base path depending on environment
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/about" element={<AboutUs />} />  
        <Route path="/team" element={<TeamsPage />} />
      </Routes>
    </Router>
  );
}
