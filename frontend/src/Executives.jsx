import { useRef, useEffect } from 'react';

const ScrollReveal = ({ containerClassName = "", textClassName = "" }) => {
  const wrapperRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const bg = bgRef.current;

    if (!wrapper || !bg) return;

    // Fade in content
    wrapper.style.opacity = 0;
    wrapper.style.transform = "translateY(20px)";

    setTimeout(() => {
      wrapper.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      wrapper.style.opacity = 1;
      wrapper.style.transform = "translateY(0)";
    }, 100);

    // Background fade: black → transparent
    bg.style.backgroundColor = "rgba(0,0,0,1)"; // start black

    setTimeout(() => {
      bg.style.transition = "background-color 1.5s ease";
      bg.style.backgroundColor = "rgba(0,0,0,0)"; // fade to transparent
    }, 200);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="scroll-reveal-wrapper"
      style={{ position: "relative" }}
    >
      <style>
        {`
          .scroll-reveal-wrapper {
            width: 100%;
            padding: 80px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .scroll-reveal-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }

          .scroll-reveal {
            max-width: 900px;
            text-align: left;
          }

          .scroll-reveal-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #ffffff;
            text-align: left;
          }

          .scroll-reveal-description {
            font-size: 1.15rem;
            color: #d0d0d0;
            line-height: 1.7;
            max-width: 750px;
            text-align: left;
          }

          @media (max-width: 768px) {
            .scroll-reveal-title {
              font-size: 2rem;
            }
            .scroll-reveal-description {
              font-size: 1rem;
            }
          }
        `}
      </style>

      {/* Background that fades from black → transparent */}
      <div ref={bgRef} className="scroll-reveal-bg"></div>

      {/* Text */}
      <div className={`scroll-reveal ${containerClassName}`}>
        <h2 className={`scroll-reveal-title ${textClassName}`}>
          Look what our executives have to say
        </h2>

        <p className="scroll-reveal-description">
          Our executive team brings together passion, leadership, and vision.
          Each of them plays a crucial role in guiding ACM towards innovation 
          and helping our members grow academically, technically, and personally.
          Their dedication is what drives our community forward.
        </p>
      </div>
    </div>
  );
};

export default ScrollReveal;
