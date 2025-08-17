import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Carousel.css";

const DEFAULT_ITEMS = [
  {
    id: 1,
    imageUrl: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Prodigy24/20240410_061802802_iOS.jpg",
  },
  {
    id: 2,
    imageUrl: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/group.jpeg",
  },
  {
    id: 3,
    imageUrl: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Prodigy24/HRK_0014.JPG",
  },
  {
    id: 4,
    imageUrl: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/HOC/img5.jpeg",
  },
  {
    id: 5,
    imageUrl: "https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/Prodigy24/HRK_6866.JPG",
  },
];

const SPRING_OPTIONS = { type: "spring", stiffness: 200, damping: 25 };
const DRAG_BUFFER = 30;

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 500,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = true,
  round = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const nextSlide = useCallback(() => {
    if (loop || currentIndex < items.length - 1) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  }, [currentIndex, items.length, loop]);

  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
        if (pauseOnHover && containerRef.current && containerRef.current.matches(':hover')) {
            return;
        }
        nextSlide();
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, pauseOnHover, nextSlide]);

  const onDragEnd = (event, info) => {
    setIsDragging(false);
    const { offset } = info;

    if (offset.x > DRAG_BUFFER) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (offset.x < -DRAG_BUFFER) {
      nextSlide();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        ref={containerRef}
        className={`carousel-container ${round ? "round" : ""}`}
        style={{
          width: `${baseWidth}px`,
          height: round ? `${baseWidth}px` : "300px",
          borderRadius: round ? "50%" : "12px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className={`carousel-item ${round ? "round" : ""}`}
            style={{
              position: 'absolute',
              width: `${baseWidth}px`,
              height: round ? `${baseWidth}px` : "300px",
              borderRadius: round ? "50%" : "12px",
              overflow: "hidden",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={SPRING_OPTIONS}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={onDragEnd}
          >
            <img
              src={items[currentIndex].imageUrl}
              alt={`carousel-${currentIndex}`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div
        className="carousel-indicators-container"
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        {items.map((_, index) => (
          <motion.div
            key={index}
            className="carousel-indicator"
            onClick={() => setCurrentIndex(index)}
            animate={{ scale: currentIndex === index ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: currentIndex === index ? "#333" : "#aaa",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
