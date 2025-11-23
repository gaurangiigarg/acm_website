import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {
  lazy,
  Suspense,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import useLenis from "./useLenis";
import Home from "./home";
import Navbar from "./Navbar";
import About from "./About";
import BackgroundReveal from "./BackgroundReveal";
import ScrollReveal from "../ScrollReveal/ScrollReveal/ScrollReveal";
import Silk from "../Silk_background/Silk/Silk";
import RevealSection1 from "./RevealSection1";
import ExecutiveSlider from "../src/components/executivescard/ExecutiveSlider";
import Initiatives from "./Initiatives";
import AboutUs from "./pages/About/AboutUsSection";
import TeamsPage from "./pages/Teams/TeamsPage";
import Contact from "./Contact";
import ContactForm from "./ContactUS";
import Footer from "./Footer";
import ScrollReveal1 from "../ScrollReveal/ScrollReveal/ScrollReveal1.jsx";
import GalleryPage from "./pages/Gallery/Gallery.jsx";

// 👇 1. Import the Prodigy25 component here
import Prodigy25 from "../src/pages/Events_Gallery/Prodigy25.jsx";
import Prodigypage from '../src/pages/Prodigy/Prodigy.jsx'

import "./App.css";

const ChipsReveal = lazy(() => import("./ChipsReveal"));

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLandingPage() {
  useLenis();

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    const section = document.querySelector(".scroll-reveal-section");
    const bg = document.querySelector(".scroll-black-bg");

    if (section && bg) {
      let ctx = gsap.context(() => {
        gsap.to(bg, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        });

        ScrollTrigger.create({
          trigger: section,
          start: "bottom top",
          onEnter: () => gsap.set(bg, { opacity: 0 }),
          onLeaveBack: () => gsap.set(bg, { opacity: 1 }),
        });
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      <Navbar />

      {/* ⭐ Silk Background ONLY on Home Page */}
      <div className="global-silk-bg">
        <Silk
          speed={5}
          scale={1}
          color="#0d1b3f"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Home Section */}
      <Suspense fallback={null}>
        <Home />
      </Suspense>

      <About />
      <RevealSection1 />

      <ScrollReveal
        baseOpacity={0.8}
        enableBlur={true}
        baseRotation={20}
        blurStrength={50}
      >
        Want to know who makes all that happen?
      </ScrollReveal>

      {isLargeScreen && <BackgroundReveal />}

      <Suspense fallback={null}>
        <ChipsReveal />
      </Suspense>

      <Initiatives />

      <ScrollReveal1
        baseOpacity={0.8}
        enableBlur={true}
        baseRotation={20}
        blurStrength={50}
      >
        Look at what our executives have to say
      </ScrollReveal1>

      <ExecutiveSlider />

      <Contact />
      <ContactForm />
      <Footer />
    </>
  );
}

export default function App() {
  const basename = import.meta.env.BASE_URL || "/";

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<TeamsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        
        {/* 👇 2. Add the route definition here */}
        <Route path="/prodigy25" element={<Prodigy25 />} />
        <Route path="/prodigypage" element={<Prodigypage />} />
      </Routes>
    </Router>
  );
}