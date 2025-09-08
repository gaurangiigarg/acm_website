import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { lazy, Suspense, useLayoutEffect, useEffect } from 'react';
// Import 'useLocation' which is needed for the ScrollToTop component
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Import your components
import useLenis from './useLenis';
import Home from './home';
import Navbar from './Navbar';
import About from './About';
import ScrollReveal from '../ScrollReveal/ScrollReveal/ScrollReveal';
import Silk from '../Silk_background/Silk/Silk';
import RevealSection1 from './RevealSection1';
import BackgroundReveal from './BackgroundReveal';
import ExecutiveSlider from '../src/components/executivescard/ExecutiveSlider';
import Initiatives from './Initiatives';
import AboutUs from './pages/About/AboutUsSection';
import TeamsPage from './pages/Teams/TeamsPage';
import Contact from './Contact';
import ContactForm from './ContactUS';
import Leaders from './Leaders';
import PrismaticBurst from '../PrismaticBurst/PrismaticBurst/PrismaticBurst';
import Footer from './Footer';

import './App.css';

const ChipsReveal = lazy(() => import('./ChipsReveal'));

gsap.registerPlugin(ScrollTrigger);

// ✅ NEW COMPONENT: Resets scroll position to the top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // This effect runs every time the pathname changes

  return null; // This component doesn't render any visible UI
}


function MainLandingPage() {
  useLenis();

  // Your GSAP animation logic for scroll triggers
  useLayoutEffect(() => {
    const section = document.querySelector('.scroll-reveal-section');
    const bg = document.querySelector('.scroll-black-bg');

    if (section && bg) {
      let ctx = gsap.context(() => {
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
      });
      return () => ctx.revert(); // Cleanup GSAP context
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="global-silk-bg">
        <Silk speed={5} scale={1} color="#0d1b3f" noiseIntensity={1.5} rotation={0} />
      </div>

        <Home />

      <About />

      <RevealSection1 />

        <Suspense fallback={<div>Loading...</div>}>
          <ScrollReveal baseOpacity={0.8} enableBlur={true} baseRotation={20} blurStrength={50}>
            Want to know who makes all that happen?
          </ScrollReveal>
        </Suspense>
    
      <BackgroundReveal />
  
      <Suspense fallback={<div>Loading...</div>}>
        <ChipsReveal />
      </Suspense>

      <Initiatives />

      <section className="leaders-executives-section">
        {/* Background Layer */}
        <div className="prismatic-bg">
          <PrismaticBurst
            animationType="rotate3d"
            intensity={2}
            speed={0.5}
            distort={1.0}
            paused={false}
            offset={{ x: 0, y: 0 }}
            hoverDampness={0.25}
            rayCount={24}
            mixBlendMode="lighten"
            colors={['#172DD9', '#000000', '#000000']}
          />
        </div>

        {/* Foreground Content */}
        <div className="leaders-executives-content">
          <Leaders />
          <ExecutiveSlider />
        </div>
      </section>

      <Contact />

      <ContactForm />

      <Footer />

    </>
  );
}

export default function App() {
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <Router basename={basename}>
      <ScrollToTop /> {/* ✅ ADDED: This component fixes the scroll issue */}
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<TeamsPage />} />
      </Routes>
    </Router>
  );
}