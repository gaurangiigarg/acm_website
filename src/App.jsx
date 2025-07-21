import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import useLenis from './useLenis';

import Particles from '../Background1/Particles/Particles';
import Home from './home';
import Navbar from './Navbar';
import About from './About';
import ScrollReveal from '../ScrollReveal/ScrollReveal/ScrollReveal';
import Silk from '../Silk_background/Silk/Silk';
import RevealSection1 from './RevealSection1';
import BackgroundReveal from './BackgroundReveal';
import Robot from './Robot'
import Initiatives from './Initiatives'
import './App.css';
import ChipsReveal from './ChipsReveal';
import DarkVeil from '../DarkVeil/DarkVeil/DarkVeil'; 

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLenis(); // enable smooth vertical scrolling

  useLayoutEffect(() => {
  const aboutRevealSections = gsap.utils.toArray('.horizontal-scroll-section');

  // 💡 Animate other horizontal sections (like About + RevealSection1)
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

  // 💡 Fix RobotInitiatives scroll starting too early
  const bgReveal = document.querySelector('.spline-scroll-wrapper');
  const robotSection = document.querySelector('#robot-initiatives');
  const robotInner = robotSection?.querySelector('.horizontal-inner');

  if (robotSection && robotInner && bgReveal) {
    const totalScroll = robotInner.scrollWidth - window.innerWidth;

    // Calculate how long BackgroundReveal is pinned
    const bgHeight = bgReveal.offsetHeight;
    const pinOffset = bgHeight + window.innerHeight; // total scroll used by pinned section

    gsap.to(robotInner, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: robotSection,
        start: `top+=${pinOffset} top`, // ✅ waits for pinned section to finish
        end: `+=${totalScroll}`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // markers: true,
      },
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
          particleCount={100}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </section>

      <section className="app-section horizontal-scroll-section" id="about-reveal">
        <div
          className="horizontal-inner"
          style={{
            display: 'flex',
            height: '100vh',
            willChange: 'transform',
          }}
        >
          <div className="horizontal-panel" style={{ flex: '0 0 100vw' }}>
            <About />
          </div>
          <div className="horizontal-panel" style={{ flex: '0 0 100vw' }}>
            <RevealSection1 />
          </div>
        </div>
      </section>


      <section className="app-section scroll-reveal-section" id="reveal-text">
        <div className="scroll-reveal-content">
          <ScrollReveal
              baseOpacity={0.8}
              enableBlur={true}
              baseRotation={20}
              blurStrength={50}
            >
      Want to know who makes all that happen?
    </ScrollReveal>
  </div>
</section>


      <section className="spline-scroll-wrapper">
        <div className="spline-scroll-inner">
           <BackgroundReveal />
        </div>
      </section>  


<div className="darkveil-shared-wrapper">
  <DarkVeil />

  <section className="app-section horizontal-scroll-section" id="chips-reveal">
    <div className="horizontal-inner" style={{ display: 'flex', height: '100vh', willChange: 'transform' }}>
      <div className="horizontal-panel" style={{ flex: '0 0 100vw' }}>
        <div className="robot-fade-container">
          <Robot />
        </div>
      </div>
      <div className="horizontal-panel" style={{ flex: '0 0 100vw' }}>
        <ChipsReveal />
      </div>
    </div>
  </section>

  <section className="app-section vertical-section" id="initiatives">
    <Initiatives />
  </section>
</div>
      
    </>
  );
}

export default App;
