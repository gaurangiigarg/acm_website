import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Particles from '../Background1/Particles/Particles';
import Home from './home';
import Navbar from './Navbar';
import About from './About';
import Initiatives from './Initiatives';
import Silk from '../Silk_background/Silk/Silk';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Fade in each section
    gsap.utils.toArray('.app-section').forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Animate body background color between Home and About
    gsap.to('body', {
      backgroundColor: '#001f3f', // Deep Blue
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });

    // Optional: revert background when leaving About
    gsap.to('body', {
      backgroundColor: 'black',
      ease: 'none',
      scrollTrigger: {
        trigger: '#robot',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      {/* Global Background Layer */}
      <div className="global-silk-bg">
        <Silk
          speed={5}
          scale={1}
          color="#0d1b3f"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <section className="app-section particles-section">
        <Home />
        <Particles
          particleColors={['#0C1636']}
          particleCount={100}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={true}
        />
      </section>

      <section className="app-section about-section" id="about">
        <About />
      </section>


      <section className="app-section initiatives-section" id="initiatives">
        <Initiatives />
      </section>
    </>
  );
}

export default App;
