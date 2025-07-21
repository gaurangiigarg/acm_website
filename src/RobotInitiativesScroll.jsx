import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Silk from '../Silk_background/Silk/Silk';
import Robot from './Robot';
import Initiatives from './Initiatives';
import './RobotInitiativesScroll.css';

gsap.registerPlugin(ScrollTrigger);

function RobotInitiativesScroll() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const scrollContent = container?.querySelector('.horizontal-scroll-content');
    if (!container || !scrollContent) return;

    const updateScroll = () => {
      const totalScroll = scrollContent.scrollWidth - window.innerWidth;

      ScrollTrigger.killAll();

      gsap.to(scrollContent, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    };

    updateScroll();
    ScrollTrigger.refresh();

    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('resize', updateScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="horizontal-section robot-initiatives-section" ref={containerRef}>
      <div className="section-background">
        <Silk speed={5} scale={1} color="#2B2A2D" noiseIntensity={1.5} rotation={0} />
      </div>

      <div className="horizontal-scroll-content">
        <div className="horizontal-panel"><Robot /></div>
        <div className="horizontal-panel"><Initiatives /></div>
      </div>
    </section>
  );
}

export default RobotInitiativesScroll;
