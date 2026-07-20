import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TeamGrid1.css';

// 1. Import your local images from an assets folder
import member1 from '../../assets/images/Sangam_Khanna.jpg'; // Example path, adjust to your project structure
import member2 from '../../assets/images/added/devanshi_raghav.jpg';
import member3 from '../../assets/images/TanayPrabhakar.jpg';
import member4 from '../../assets/images/added/hritvik_garg.jpg';
import member5 from '../../assets/images/Rudransh.jpg';
import member6 from '../../assets/images/Advika_Kaushik.jpg';
import member7 from '../../assets/images/Daksh_Mehrotra.JPG';
import member8 from '../../assets/images/added/atharv_chandorikar.webp';
import member9 from '../../assets/images/Jahnavi_Saxena.jpeg';
import member10 from '../../assets/images/Hiral_Mittal.jpg';
import member11 from '../../assets/images/added/mouli_rathor.jpg';
import member12 from '../../assets/images/rahul_mankani.jpg';
import member13 from '../../assets/images/added/vridhi_jain.jpeg';
import member14 from '../../assets/images/Ahad_Khan.jpg';
import member15 from '../../assets/images/added/bhavya_talwar.webp';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// --- Data for the team members ---
const teamData = [
  {
      imageUrl: member1,
      name: 'Sangam Khanna',
      title: 'BOE, ACM',
      githubUrl: 'https://github.com/CatoxiRetreater',
      linkedinUrl: 'https://www.linkedin.com/in/khannasangam/'
  },
  {
    imageUrl: member2,
    name: 'Devanshi Raghav',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/devanshiraghav',
    linkedinUrl: 'https://www.linkedin.com/in/devanshi-raghav-01b26a298/'
  },
  {
    imageUrl: member3,
    name: 'Tanay Prabhakar',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/tanayprabhakar',
    linkedinUrl: 'https://www.linkedin.com/in/tanayprabhakar/#'
  },
  {
    imageUrl: member4,
    name: 'Hritvik Garg',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/hritvikgarg',
    linkedinUrl: 'https://www.linkedin.com/in/hritvik-garg-818a09278/'
  },
  {
    imageUrl: member5,
    name: 'Rudransh Sogani',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/rudranshsogani',
    linkedinUrl: 'https://www.linkedin.com/in/rudransh-sogani-7211a6276/'
  },
  {
      imageUrl: member6,
      name: 'Advika Kaushik',
      title: 'BOE, ACM',
      githubUrl: 'https://github.com/advikakaushik',
      linkedinUrl: 'https://www.linkedin.com/in/advika-kaushik-76731a293/'
  },
  {
      imageUrl: member7,
      name: 'Daksh Mehrotra',
      title: 'BOE, ACM',
      githubUrl: 'https://github.com/DakshMehrotra',
      linkedinUrl: 'https://www.linkedin.com/in/mehrotradaksh/'
  },
  {
    imageUrl: member8,
    name: 'Atharv Chandorikar',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/Atharv-2',
    linkedinUrl: 'https://www.linkedin.com/in/atharv-chandorikar-721979291/'
  },
  {
    imageUrl: member9,
    name: 'Jahnavi Saxena',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/jahnavisaxena',
    linkedinUrl: 'https://www.linkedin.com/in/jahnavi-saxena-1318a6286/'
  },
  {
    imageUrl: member10,
    name: 'Hiral Mittal',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/hiral-2501',
    linkedinUrl: 'https://www.linkedin.com/in/hiral-mittal-b88068298'
  },
  {
    imageUrl: member11,
    name: 'Mouli Rathor',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/MouliRathor',
    linkedinUrl: 'https://www.linkedin.com/in/mouli-rathor-992a79350'
  },
  {
    imageUrl: member12,
    name: 'Rahul Mankani',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/rahul5002',
    linkedinUrl: 'https://www.linkedin.com/in/rahul-mankani/'
  },
  {
    imageUrl: member13,
    name: 'Vridhi Jain',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/Vridhi29',
    linkedinUrl: 'https://www.linkedin.com/in/vridhi-jain-158239343/'
  },
  {
    imageUrl: member14,
    name: 'Ahad Khan',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/cmdahad',
    linkedinUrl: 'https://www.linkedin.com/in/ahad-172794264/'
  },
  {
    imageUrl: member15,
    name: 'Bhavya Talwar',
    title: 'BOE, ACM',
    githubUrl: 'https://github.com/bhavyatalwar04',
    linkedinUrl: 'https://www.linkedin.com/in/talwarbhavya/'
  },
];

const TeamGrid = () => {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Staggered Card Entrance Animation ---
      gsap.to('.team-grid-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-grid-container',
          start: 'top 85%',
        }
      });

      // --- Image Parallax Scroll Animation ---
      const cards = gsap.utils.toArray('.team-grid-card');
      cards.forEach(card => {
        const image = card.querySelector('.team-grid-card-image');
        gsap.to(image, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });
    }, componentRef);

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <section className="team-grid-section" ref={componentRef}>
      <div className="team-grid-container">
        {teamData.map((member, index) => (
          <div className="team-grid-card" key={index}>
            <div className="team-grid-card-image-wrapper">
              <img src={member.imageUrl} alt={member.name} className="team-grid-card-image" />
            </div>
            <div className="team-grid-card-info">
              <div className="info-divider"></div>
              <div className="info-bottom">
                <p>{member.name} • {member.title}</p>
                <div className="social-icons">
                  <a href={member.githubUrl} className="social-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                  </a>
                  <a href={member.linkedinUrl} className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 114.75 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.94 0-1.62.68-1.62 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.38 1.02 3.38 3.56z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamGrid;
