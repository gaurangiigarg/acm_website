import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "./assets/acmlogoo.png";

function Navbar() {
  const [show, setShow] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false); // close menu after clicking
    if (location.pathname !== "/") {
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
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="ACM Logo" className="logo-img" />
        </Link>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <a href="#home" onClick={(e) => handleScrollToSection(e, "home")}>
              Home
            </a>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          </li>
          <li>
            <Link to="/team" onClick={() => setIsMenuOpen(false)}>Team</Link>
          </li>
          <li>
            <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleScrollToSection(e, "contact")}>
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
