import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '../Decrypted_Reveal/DecryptedText/DecryptedText';
import './RevealSection1.css';

function RevealSection1() {
  return (
    <section className="reveal-container" id="reveal-section">
      <div className="reveal-content">
        {/* Fade-in wrapper for headline + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <DecryptedText
            text="DRIVEN THROUGH PURPOSE."
            sequential={true}
            useOriginalCharsOnly={false}
            animateOn="view"
            revealDirection="start"
            speed={60}
            maxIterations={10}
            parentClassName="DecryptedText"
          />
          <DecryptedText
            text="EMPOWERED BY TECHNOLOGY."
            sequential={true}
            useOriginalCharsOnly={false}
            animateOn="view"
            revealDirection="start"
            speed={60}
            maxIterations={10}
            parentClassName="DecryptedText"
          />

          <motion.p
            className="reveal-tagline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            Defining standards. Delivering impact.
          </motion.p>
        </motion.div>

        {/* Achievements box with motion */}
        <motion.div
          className="achievements-box"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <ul>
            <li><strong>Outstanding Chapter Award - 2023</strong><br />Awarded by ACM India</li>
            <li><strong>Best Student Chapter Award for Outstanding Community Service - 2021</strong><br />Awarded by ACM India</li>
            <li><strong>Student Chapter Excellence Award - 2020</strong><br />Awarded by ACM International</li>
            <li><strong>Best Student Chapter Award (Runner Up) - 2016</strong><br />Awarded by ACM India</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default RevealSection1;
