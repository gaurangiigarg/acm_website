import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import CommitteesShowcase from './CommitteShowcase';
import './Robot.css';

function Robot() {
  const wrapperRef = useRef(null);
  const [showRobot, setShowRobot] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isFullyVisible, setIsFullyVisible] = useState(false); // Renamed for clarity, was isFullyVisible

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        // --- Logic to load robot (triggers >= 0.3, only ONCE) ---
        if (ratio >= 0.3 && !hasPlayed) {
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

        // ✅ 1. UPDATED LOGIC: Trigger fade at 75% view (or higher)
        setIsFullyVisible(ratio >= 0.75);
      },
      {
        // ✅ 2. UPDATED THRESHOLD: Watch for 30% (robot) and 75% (background)
        threshold: [0.3, 0.75],
      }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [hasPlayed]); // Dependency array remains correct

  return (
    <div className="robot-wrapper" ref={wrapperRef}>
      {/* 🔴 Black Background Layer */}
      <div
        className={`robot-black-bg ${isFullyVisible ? 'is-visible' : ''}`}
      ></div>

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