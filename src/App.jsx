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
    // ✅ Only fade in/out logic for ScrollReveal section (horizontal scroll removed)
    const section = document.querySelector('.scroll-reveal-section');
    const bg = document.querySelector('.scroll-black-bg');

    if (section && bg) {
      gsap.to(bg, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "40% top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: "bottom top",
        onEnter: () => gsap.set(bg, { opacity: 0 }),
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

    
      <section className="app-section scroll-reveal-section" id="reveal-text">
        <div className="scroll-black-bg"></div>
        <div className="scroll-reveal-content">
          <ScrollReveal baseOpacity={0.8} enableBlur={true} baseRotation={20} blurStrength={50}>
            Want to know who makes all that happen?
          </ScrollReveal>
        </div>
      </section>

      

      {/* ✅ Robot and ChipsReveal are now stacked vertically (no horizontal scroll) */}
      <section className="app-section vertical-section">
        <div className="robot-fade-container">
          <Suspense fallback={<div>Loading...</div>}>
            <Robot />
          </Suspense>
        </div>
      </section>

      <section className="app-section vertical-section">
        <Suspense fallback={<div>Loading...</div>}>
          <ChipsReveal />
        </Suspense>
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
