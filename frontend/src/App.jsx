import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { lazy, Suspense, useLayoutEffect, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import useLenis from './useLenis';
import Home from './home';
import Navbar from './Navbar';
import About from './About';
import BackgroundReveal from './BackgroundReveal';
import ScrollReveal from '../ScrollReveal/ScrollReveal/ScrollReveal';
import Silk from '../Silk_background/Silk/Silk';
import RevealSection1 from './RevealSection1';
import ExecutiveSlider from '../src/components/executivescard/ExecutiveSlider';
import Initiatives from './Initiatives';
import AboutUs from './pages/About/AboutUsSection';
import TeamsPage from './pages/Teams/TeamsPage';
import Contact from './Contact';
import ContactForm from './ContactUS';
import Leaders from './Leaders';
import Footer from './Footer';

import './App.css';

const ChipsReveal = lazy(() => import('./ChipsReveal'));

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLandingPage() {
  useLenis();

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="global-silk-bg">
        <Silk speed={5} scale={1} color="#0d1b3f" noiseIntensity={1.5} rotation={0} />
      </div>

   
      <About />
      <RevealSection1 />

      <ScrollReveal baseOpacity={0.8} enableBlur={true} baseRotation={20} blurStrength={50}>
        Want to know who makes all that happen?
      </ScrollReveal>

      {/* ✅ BackgroundReveal is only rendered on larger screens */}
      {isLargeScreen && <BackgroundReveal />}

      <ChipsReveal />


   
        <Leaders />

        <Initiatives />

        <ExecutiveSlider />
 

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<TeamsPage />} />
      </Routes>
    </Router>
  );
}
