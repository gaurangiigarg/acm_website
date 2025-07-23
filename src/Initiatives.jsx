import React, { useRef, useEffect, useState } from 'react';
import './Initiatives.css';
import ShinyText from '../ShinyText/ShinyText/ShinyText';


const initiatives = [
  {
    title: '21 Days Of Code',
    description:
      'We launched 21 Days of Code to promote the environment for competitive programming and instil coding as second nature and a daily habit for 21 regular days. Every year, we witness active programmers come along with the spirit to learn, code and practice.',
    icon: ' ',
  },
  {
    title: 'Code Anytime',
    description:
      'Code Anytime is our round-the-year initiative to encourage free-spirited coding among beginners to amplify their passion for programming.',
    icon: ' ',
  },
  {
    title: 'SPY-C',
    description:
      'SPY-C is an initiative to build the core foundation of programming and aid students in overcoming their dread of programming by perfecting their knowledge of the C language through the help of their seniors.',
    icon: ' ',
  },
  {
    title: 'Hour Of Code',
    description:
      'The CSR team puts their words to action, and brings smiles across the faces of the underprivileged society. The team parts education in the most exciting manner and makes the activities as interactive and intriguing as possible.',
    icon: ' ',
  },
];

export default function Initiatives() {
  const sectionRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="initiatives-section" id="initiatives">
      
      {/* Content */}
      <div className="initiatives-content">
        <div className="initiatives-header">
          <ShinyText text="OUR INITIATIVES" speed={6} className="initiatives-title" />
        </div>

        <div className="initiatives-grid">
          {initiatives.map((item, idx) => (
            <div key={idx} className="glass-card">
              <span className="icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
