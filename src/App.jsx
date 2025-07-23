
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { lazy, Suspense, useLayoutEffect } from 'react';

import useLenis from './useLenis';

import Particles from '../Background1/Particles/Particles';
import Home from './home';
import Navbar from './Navbar';
import About from './About';
import ScrollReveal from '../ScrollReveal/ScrollReveal/ScrollReveal';
import Silk from '../Silk_background/Silk/Silk';
import RevealSection1 from './RevealSection1';
import BackgroundReveal from './BackgroundReveal';

import Initiatives from './Initiatives'
import './App.css';

import DarkVeil from '../DarkVeil/DarkVeil/DarkVeil';

const Robot = lazy(() => import('./Robot'));
const ChipsReveal = lazy(() => import('./ChipsReveal'));
const Masonary = lazy(() => import('../Masonary/Masonry/Masonry'));

const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Prodigy24/HRK_0356.JPG",
      url: "https://example.com/three",
      height: 600,
    },

    {
      id: "4",
      img: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/executives%20ACM/Chairperson_ACMW_Devanshi.jpeg",
      url: "https://example.com/three",
      height: 500,
    },
    {
      id: "5",
      img: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/executives%20ACM/Stuti%20Jain.jpg",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "6",
      img: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/executives%20ACM/Vice_Chairperson_ACMW_Hritvik%20Garg.jpeg",
      url: "https://example.com/three",
      height: 700,
    },
    {
      id: "7",
      img: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Board%20of%20Executives/Jahnavi%20Saxena.png",
      url: "https://example.com/three",
      height: 700,
    },
    
    {
      id: "8",
      img: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Board%20of%20Executives/Amrit%20Raj%20Garg.jpg",
      url: "https://example.com/three",
      height: 400,
    },


    {
      id: "9",
      img: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Board%20of%20Executives/Aarohi%20Sharma.jpg",
      url: "https://example.com/three",
      height: 800,
    },

    {
      id: "10",
      img: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Board%20of%20Executives/Hiral%20Mittal.jpg",
      url: "https://example.com/three",
      height: 500,
    },

    
];

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


<section className="app-section vertical section" id="mason">
  <Masonary
  items={items}
  ease="power3.out"
  duration={0.6}
  stagger={0.05}
  animateFrom="bottom"
  scaleOnHover={true}
  hoverScale={0.95}
  blurToFocus={true}
  colorShiftOnHover={false}
/>
</section>
      
    </>
  );
}

export default App;
