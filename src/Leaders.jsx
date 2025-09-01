import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../ScrollReveal/ScrollReveal/ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  scrollContainerRef,
  containerClassName = "",
  start = "top bottom",
  end = "bottom top"
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // ✅ Background fade from black → blue
    gsap.fromTo(
      el,
      { backgroundColor: "#000000" },
      {
        backgroundColor: "#15186F",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          scroller,
          start,
          end,
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, [scrollContainerRef, start, end]);

  return (
    <div
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`}
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

    </div>
  );
};

export default ScrollReveal;
