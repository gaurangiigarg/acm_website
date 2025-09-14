import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BOExecutivesHero.css'; // Your existing CSS file

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const ExecutivesHero = () => {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    // Create a GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // Create a timeline for the parallax animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current, // Use the component's ref as the trigger
          start: 'top top', // Animation starts when the top of the section hits the top of the viewport
          end: 'bottom top', // Animation ends when the bottom of the section hits the top of the viewport
          scrub: 0.8, // Smoothly links the animation progress to the scrollbar
        },
      });

      // Add animations to the timeline, targeting the text elements directly
      tl.to('.bo-main-heading', {
        yPercent: -50, // Moves the heading up
        ease: 'none',
      })
      .to('.bo-description', {
        yPercent: -500, // Moves the description up faster
        ease: 'none',
      }, '<'); // The '<' starts this animation at the same time as the previous one

    }, componentRef);

    // Cleanup function to revert animations when the component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <section className="bo-executives-wrapper" ref={componentRef}>
      <div className="bo-top-divider"></div>
      <div className="bo-content-grid">
        {/* Left Column */}
        <div className="bo-left-column">
          <h1 className="bo-main-heading">
            THE <br /> BOARD OF EXECUTIVES
          </h1>
        </div>
        {/* Right Column */}
        <div className="bo-right-column">
          <p className="bo-description">
            Leading with vision and dedication. <br/>
            The minds shaping our future.
          </p>
        </div>
      </div>
      <div className="bo-bottom-divider"></div>
    </section>
  );
};

export default ExecutivesHero;
