import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link for routing
import './Footer.css'; // Import the new CSS file
import logo from '../src/assets/acmlogoo.png'; // Assuming this path is correct

// --- SVG Icon Components for Social Media ---
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentFooterRef = footerRef.current;
    if (currentFooterRef) {
      observer.observe(currentFooterRef);
    }

    return () => {
      if (currentFooterRef) {
        observer.unobserve(currentFooterRef);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          <div className={`footer-column branding ${isVisible ? 'visible' : ''}`}>
            {/* Added the logo here */}
            <img src={logo} alt="ACM Logo" className="footer-logo" />
            <h2 className="branding-title">
              ACM Student Chapter
            </h2>
            <p className="branding-text">
              Fostering a community of innovators and problem-solvers at the forefront of computing technology.
            </p>
          </div>

          <div className={`footer-column quick-links ${isVisible ? 'visible' : ''}`}>
            <h3 className="footer-heading">Quick Links</h3>
            <ul>
              {/* These remain hash links for same-page navigation */}
              <li><a href="#home">Home</a></li>
              
              {/* ✅ UPDATED: Use Link for routing to other pages */}
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/teams">Teams</Link></li>
              
              <li><a href="#about">Gallery</a></li>
              <li><a href="#join">Become a Member</a></li>
            </ul>
          </div>

          <div className={`footer-column connect ${isVisible ? 'visible' : ''}`}>
            <h3 className="footer-heading">Connect</h3>
            <div className="social-icons">
              <a href="https://github.com/upesacm" target="_blank" rel="noopener noreferrer"><GithubIcon /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedinIcon /></a>
              <a href="https://instagram.com/upesacm" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
            </div>
            <div className="contact-mail">
              <a href="mailto:contact@acmchapter.com">
                <MailIcon />
                <span>contact@acmchapter.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className={`footer-bottom ${isVisible ? 'visible' : ''}`}>
          <div className="footer-divider"></div>
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} ACM Student Chapter. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;