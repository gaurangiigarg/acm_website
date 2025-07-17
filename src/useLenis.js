import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      mouseMultiplier: 1.2,
      smoothTouch: false,
    });

    // GSAP update sync
    lenis.on('scroll', ScrollTrigger.update);

    let animationFrame;

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update(); // ✅ sync every frame
      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrame); // ✅ clean up
    };
  }, []);
}
