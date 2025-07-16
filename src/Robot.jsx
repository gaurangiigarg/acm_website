import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

function Robot() {
  const wrapperRef = useRef(null);
  const [showRobot, setShowRobot] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;

        if (inView && !hasPlayed) {
          setShowRobot(true);
          setHasPlayed(true);

          setTimeout(() => {
            const canvas = wrapperRef.current?.querySelector('canvas');
            if (canvas) {
              const centerX = window.innerWidth / 2;
              const centerY = window.innerHeight / 2;

              canvas.dispatchEvent(
                new MouseEvent('mousemove', {
                  clientX: centerX,
                  clientY: centerY,
                  bubbles: true,
                })
              );
            }
          }, 300);
        }
      },
      { threshold: 0.3 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      if (wrapperRef.current) observer.disconnect();
    };
  }, [hasPlayed]);

  return (
    <div className="robot-wrapper" ref={wrapperRef}>
      {showRobot && (
        <Spline scene="https://prod.spline.design/CxsNMqmHnwzkPn98/scene.splinecode" />
      )}
    </div>
  );
}

export default Robot;
