import { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlurText from '../BlurText/BlurText/BlurText';
import './BackgroundReveal.css';
import Galaxy from '../GalaxyBackground/Galaxy/Galaxy';

gsap.registerPlugin(ScrollTrigger);

function BackgroundReveal() {
  const sectionRef = useRef(null);
  const splineRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=0', 
      scrub: true,
      pin: true,
      onEnter: () => {
        if (splineRef.current) {
          splineRef.current.emitEvent('start', 'Camera');
          splineRef.current.emitEvent('reset', 'YourObjectName');
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="reveal-local-container">

      <div className="galaxy-black-bg"></div>

      

      <div className="spline-bg-wrapper">
        <Spline
          scene="https://prod.spline.design/jWdQZ-tIJBY28t4r/scene.splinecode"
          className="spline-bg"
          onLoad={(splineApp) => {
            splineRef.current = splineApp;
          }}
        />
      </div>

      <div className="reveal-text">
        <BlurText
          text="who make it all happen."
          delay={400}
          animateBy="words"
          direction="top"
          className="about-label"
          stepDuration={0.6}
        />
      </div>
    </section>
  );
}

export default BackgroundReveal;
