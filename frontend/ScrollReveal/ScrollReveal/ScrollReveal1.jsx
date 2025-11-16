import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom"
}) => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span
          className="word"
          key={index}
          style={{ display: 'inline-block', willChange: 'opacity, transform' }}
        >
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    const bg = bgRef.current;
    if (!el || !bg) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // ✅ Background fade in/out
    gsap.fromTo(
  bg,
  { backgroundColor: 'rgba(0,0,0,1)' }, // start BLACK
  {
    backgroundColor: 'rgba(0,0,0,0)', // fade to TRANSPARENT
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      scroller,
      start: 'top bottom',
      end: 'center center',
      scrub: true,
    },
  }
);

    // ✅ Text container rotation
    gsap.set(el, { transformOrigin: '0% 50%', rotate: baseRotation });
    const words = gsap.utils.toArray(el.querySelectorAll('.word'));

    gsap.set(words, {
      autoAlpha: baseOpacity,
      ...(enableBlur && {
        textShadow: `0 0 ${blurStrength}px rgba(0,0,0,0.6)`,
      }),
    });

    gsap.to(el, {
      rotate: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top bottom',
        end: rotationEnd,
        scrub: true,
      },
    });

    // ✅ Word fade
    gsap.to(words, {
      autoAlpha: 1,
      textShadow: enableBlur ? '0 0 0px rgba(0,0,0,0)' : 'none',
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top bottom-=20%',
        end: wordAnimationEnd,
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el || trigger.trigger === bg) trigger.kill();
      });
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <div className="scroll-reveal-wrapper" style={{ position: "relative" }}>
      {/* Background overlay */}
      <div
        ref={bgRef}
        className="scroll-reveal-bg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundColor: "rgba(0,0,0,0)",
        }}
      />

      {/* Text */}
      <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
        <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
      </h2>
    </div>
  );
};

export default ScrollReveal;