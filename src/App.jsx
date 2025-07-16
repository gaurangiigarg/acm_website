import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import useLenis from './useLenis';
import Robot from './Robot';
import Particles from '../Background1/Particles/Particles';
import Home from './home';
import Navbar from './Navbar';
import About from './About';
import Initiatives from './Initiatives';
import Silk from '../Silk_background/Silk/Silk';
import './App.css';
import RevealSection1 from './RevealSection1';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLenis(); // vertical scroll

  useEffect(() => {
  const horizontalSections = gsap.utils.toArray('.horizontal-scroll-section');

  horizontalSections.forEach((section) => {
    const inner = section.querySelector('.horizontal-inner');
    const panels = gsap.utils.toArray('.horizontal-panel', inner);

    if (!inner || panels.length === 0) return;

    const totalScroll = inner.scrollWidth - window.innerWidth; // ✅ accurate scroll distance

    gsap.to(inner, {
      x: () => `-${totalScroll}px`,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 0.5,
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
        <div className="horizontal-inner" style={{ display: 'flex', height: '100vh' }}>
          <div className="horizontal-panel" style={{ flex: '0 0 100vw' }}>
            <About />
          </div>
          <div className="horizontal-panel" style={{ flex: '0 0 100vw' }}>
            <RevealSection1 />
          </div>
        </div>
      </section>

      <section className="app-section Robot-section">
        <Robot />
      </section>

      <section className="app-section initiatives-section" id="initiatives">
        <Initiatives />
      </section>
    </>
  );
}

export default App;
