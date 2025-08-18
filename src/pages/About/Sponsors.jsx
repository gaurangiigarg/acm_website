import React from 'react';

import './Sponsors.css'; // Import the stylesheet

import Dell from '../../assets/img/logos/Dell.png';
import IBM from '../../assets/img/logos/IBM.png'; // ✅ use IBM image

const Sponsors = () => {
  return (
    <section className="sponsors-section-wrapper">
      <h2 className="sponsors-heading">
        Since 2010 we've been working with <span className="highlight">amazing partners</span> to create meaningful impact and compelling experiences.
      </h2>

      <div className="logo-grid">

        {/* Dell Logo */}
        <div className="logo-card">
          <img src={Dell} alt="Dell Logo" className="logo-img" />
        </div>

        {/* IBM Logo */}
        <div className="logo-card">
          <img src={IBM} alt="IBM Logo" className="logo-img" />  {/* ✅ Same style as Dell */}
        </div>

        {/* ICPC Logo */}
        <div className="logo-card">
          <svg viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>

        {/* Microsoft Logo */}
        <div className="logo-card">
          <svg viewBox="0 0 21 21">
            <path d="M1 1h9v9H1zM11 1h9v9h-9zM1 11h9v9H1zM11 11h9v9h-9z"/>
          </svg>
        </div>

        {/* Pynet Labs Logo */}
        <div className="logo-card">
          <span className="text-logo">Pynet Labs</span>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
