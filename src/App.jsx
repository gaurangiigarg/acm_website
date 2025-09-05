import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { lazy, Suspense, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import './App.css';

const ChipsReveal = lazy(() => import('./ChipsReveal'));

gsap.registerPlugin(ScrollTrigger);


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
    
      

       

          <ScrollReveal baseOpacity={0.8} enableBlur={true} baseRotation={20} blurStrength={50}>
            Want to know who makes all that happen?
          </ScrollReveal>
 
   
      
      <BackgroundReveal />

    
          <ChipsReveal />





      <Leaders />



      <Contact />

      <ContactForm />






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
