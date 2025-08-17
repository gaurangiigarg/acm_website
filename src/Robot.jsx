import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import CommitteesShowcase from './CommitteShowcase';
import './Robot.css'; 
import Galaxy from '../GalaxyBackground/Galaxy/Galaxy';

function Robot() {
  const wrapperRef = useRef(null);
  const [showRobot, setShowRobot] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
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
    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <div className="robot-wrapper" ref={wrapperRef}>
      {/* 🔴 Black Background Layer */}
      <div className="robot-black-bg"></div>

      {/* 🔵 Galaxy Layer */}
      <div className="robot-galaxy">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.4}
          glowIntensity={0.1}
          saturation={0}
          hueShift={70}
        />
      </div>

      {/* 🟢 Foreground Content */}
      <div className="robot-content">
        {showRobot && (
          <div className="robot-spline">
            <Spline scene="https://prod.spline.design/CxsNMqmHnwzkPn98/scene.splinecode" />
          </div>
        )}
        <CommitteesShowcase />
      </div>

      <div className="watermark-patch"></div>
</div>

  );
}

export default Robot;
