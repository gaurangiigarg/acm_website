import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "./assets/acmlogoo.png";

function Navbar() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setShow(false); // hide when scrolling down
      } else {
        setShow(true); // show when scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section when clicking in-page links on home route
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // navigate home first, then scroll
      window.location.href = `/#${id}`;
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`navbar ${show ? "show" : "hide"}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="ACM Logo" className="logo-img" />
        </Link>
        <ul className="navbar-links">
          <li><a href="#home" onClick={(e) => handleScrollToSection(e, "home")}>Home</a></li>
          <li><a href="#about" onClick={(e) => handleScrollToSection(e, "about")}>About Us</a></li>
          <li><Link to="/team">Team</Link></li> {/* ✅ Goes to team page */}
          <li><a href="#initiatives" onClick={(e) => handleScrollToSection(e, "initiatives")}>Our Initiatives</a></li>
          <li><a href="#contact" onClick={(e) => handleScrollToSection(e, "contact")}>Contact Us</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
