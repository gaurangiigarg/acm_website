import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
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

const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 150, damping: 20 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 500,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = true,
  round = false,
}) {
  const itemWidth = baseWidth;
  const trackItemOffset = itemWidth + GAP;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const carouselItems = loop ? [...items, items[0]] : items;

  // Handle pause on hover
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;

    const container = containerRef.current;
    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [pauseOnHover]);

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered)) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, carouselItems.length]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        ref={containerRef}
        className={`carousel-container ${round ? "round" : ""}`}
        style={{
          width: `${itemWidth}px`,
          height: round ? `${itemWidth}px` : "300px",
          borderRadius: round ? "50%" : "12px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          className="carousel-track"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: `${GAP}px`,
          }}
          animate={{ x: -currentIndex * trackItemOffset }}
          transition={SPRING_OPTIONS}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${round ? "round" : ""}`}
              style={{
                width: `${itemWidth}px`,
                height: round ? `${itemWidth}px` : "300px",
                borderRadius: round ? "50%" : "12px",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={item.imageUrl}
                alt={`carousel-${index}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicators */}
      <div
        className={`carousel-indicators-container ${round ? "round" : ""}`}
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
            animate={{
              scale: currentIndex % items.length === index ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: currentIndex % items.length === index ? "#333" : "#aaa",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
