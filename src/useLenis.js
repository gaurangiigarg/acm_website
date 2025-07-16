// src/hooks/useLenis.js
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08, // Adjust for scroll speed smoothing
      wheelMultiplier: 1.2, // Sensitivity
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
}
