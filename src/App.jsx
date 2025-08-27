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
    // Horizontal scroll logic...
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

    // ✅ Improved fade in/out logic for ScrollReveal section
    const section = document.querySelector('.scroll-reveal-section');
    const bg = document.querySelector('.scroll-black-bg');

    if (section && bg) {
      // This animation handles the fade-in when scrolling down
      // and the fade-out when scrolling back up.
      gsap.to(bg, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "40% top", // Fades in over the first 40% of the viewport height
          scrub: true,
        },
      });

      // This trigger handles the state of the background AFTER the section.
      // It prevents the fade-out when scrolling down past the section.
      ScrollTrigger.create({
        trigger: section,
        start: "bottom top", // Activates when the bottom of the section hits the top of the viewport
        // When scrolling DOWN past the section, snap the background off.
        onEnter: () => gsap.set(bg, { opacity: 0 }),
        // When scrolling UP into the section from below, snap it back on.
        onLeaveBack: () => gsap.set(bg, { opacity: 1 }),
      });
    }

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
          particleCount={0}
        />
      </section>
      <section className="app-section vertical-section" id="about-reveal">
        <About />
      </section>
      <section className="app-section vertical-section">
        <RevealSection1 />
      </section>

      {/* ✅ Scroll reveal section with fading background */}
      <section className="app-section scroll-reveal-section" id="reveal-text">
        <div className="scroll-black-bg"></div>
        <div className="scroll-reveal-content">
          <ScrollReveal baseOpacity={0.8} enableBlur={true} baseRotation={20} blurStrength={50}>
            Want to know who makes all that happen?
          </ScrollReveal>
        </div>
      </section>

      <section className="app-section vertical-section">
        <BackgroundReveal />
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