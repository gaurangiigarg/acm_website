import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1, // ⬅️ Reduced a bit for quicker feel
      easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), // more natural easing
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      mouseMultiplier: 1, // ⬅️ Lowered for better control
      smoothTouch: true,  // ⬅️ Enable smoothness on touch devices
      touchMultiplier: 1.5,
    });

    // Sync GSAP ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Better RAF with GSAP ticker instead of requestAnimationFrame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert seconds to ms
    });

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);
}
