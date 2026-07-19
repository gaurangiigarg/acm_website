import React, { useState, useEffect, useRef } from 'react'; // --- NEW ---
import './ExecutiveSlider.css'; 

import PankajBadoni from '../../assets/img/coverphoto.jpg';
import mrigank_singh from '../../assets/images/added/mrigank_singh.jpg';
import MayankKumar from '../../assets/images/Mayank.jpg';
import Krish_mishra from '../../assets/images/added/krish_mishra.jpg';
import PrabhjeetSingh from '../../assets/images/PRABHJEET_SINGH.jpg';
import DakshSethi from '../../assets/images/added/daksh_sethi.jpg';
import ShlokMadan from '../../assets/images/Shlok_Madan.jpg';

// Updated data array to include the description
const teamData = [
  { 
    id: 'ceo', 
    title: 'Faculty Coordinator', 
    name: 'Pankaj Badoni', 
    img: PankajBadoni,
    description: "It has been over 9 years since I joined UPES ACM-W, and these past few years have been exciting and extremely successful for us. We have won several national and international awards for our hard work. Our annual event, Prodigy, has been a massive success for the past five years and I'm proud to say that UPES ACM hasn't ever hesitated from helping whenever possible, which can be seen in our outstanding CSR events and the collaborations we have. Being a part of ACM ensures that everyone can showcase what they're good at and constantly evolve. We strive to create a better environment for our members with every action of ours."
  },
  { 
    id: 'cfo', 
    title: 'Chairperson, ACM', 
    name: 'Mrigank Singh', 
    img: mrigank_singh,
    description: "I have been associated with the chapter since my first year in college. It's been almost two years now, and the journey has been great. From being the core committee member to the Events Head and now representing the chapter as the Chairperson, has been really wonderful. UPES ACM & ACM-W is not only a student chapter but a family that brings the best out of you. We organize a variety of events ranging from technical, fun-tech and gaming events. Our coding initiatives such as the 21 Days of Code, Code Anytime and Spy-C have had great impact on the university students. We aim at coming together, being dedicated, growing together and contributing to the technical fraternity for the years to come."
  },
  { 
    id: 'chh', 
    title: 'Web Master, ACM', 
    name: 'Mayank Kumar', 
    img: MayankKumar,
    description: "I have been associated with the chapter since my first year in college, and the journey has been an incredible learning experience. From serving as the Technical Head to now representing the chapter as the Webmaster, every role has helped me grow both technically and professionally. UPES ACM & ACM-W is not just a student chapter but a family that encourages innovation, collaboration, and continuous learning. We organize a wide range of events, including technical workshops, coding competitions, fun-tech activities, and gaming events that engage students across the university. Our initiatives, such as 21 Days of Code, Code Anytime, and Spy-C, have inspired students to strengthen their coding and problem-solving skills. As the Webmaster, I look forward to enhancing our digital presence while continuing to contribute towards building a stronger and more vibrant technical community."
  },
  { 
    id: 'cmo', 
    title: 'Treasurer', 
    name: 'Shlok Madan', 
    img: ShlokMadan,
    description: "When I was exposed to ACM and the ACM-W student organisation at UPES, my programming career had just started. Where I used to frequently get confused between the fundamentals of coding, activities like 21 Days of Code, Code Anytime, and Spy C increased my confidence in coding, that's when I decided to continue my career with ACM and the ACM-W student chapter. Being a part of ACM-W gives me a great deal of pleasure because what more could you ask for from a student chapter than a chapter that teaches you a lot about your skill, and not just the skill, but how to deal with public relations, how to organise events as a team, and much more. I'm happy to be a part of this vibrant student chapter."
  },
  { 
    id: 'coo', 
    title: 'Vice-Chairperson, ACM', 
    name: 'Krish Mishra', 
    img: Krish_mishra,
    description: "Upon my college arrival, the UPES-ACM Student Chapter warmly embraced me, alleviating overwhelming challenges. It swiftly became a familial refuge, fostering belonging and support. Beyond membership, it meant embracing a culture of coding excellence and technical advancement. As I progressed through my academic journey, I transitioned from a core member to an office bearer and now proudly hold the position of vice chairperson in this esteemed chapter.Reflecting on this journey, it has been nothing short of extraordinary. My aspiration as a leader is to propel the UPES-ACM Student Chapter to unprecedented heights, leaving a legacy that transcends the remarkable one I inherited."
            
  },
  { 
    id: 'cho', 
    title: 'Secreatry', 
    name: 'Prabhjeet Singh', 
    img: PrabhjeetSingh,
    description: " My journey with UPES ACM has been nothing short of transformative. From stumbling upon a Technical event in my first year to becoming a core member and now Secretary, it's been an extraordinary ride. Joining UPES ACM was like finding a second home-a supportive family where I could overcome confusion and stage fright. It provided a platform to share ideas, hone leadership skills, and improve coding abilities through initiatives like Code Anytime. It's more than just a student chapter-it's a supportive community fostering growth and coding excellence. UPES ACM has shaped not only my academic journey but also my character and aspirations, providing a place where aspirations thrive and individuals are empowered to reach their full potential."
  },
  { 
    id: 'cto', 
    title: 'Joint Secretary', 
    name: 'Daksh Sethi', 
    img: DakshSethi,
    description: "Joining UPES ACM was a turning point for me. I landed a spot on the Design committee, leading the team as Design Head. Now, I'm honored to serve as the chapter secretary. It's been a rollercoaster ride, filled with learnings. The positive and challenging work environment proved to be a fantastic combination for growth. I've broken out of my shell, becoming a more confident communicator.  From the initial steps to the leadership responsibilities, this journey within UPES ACM has been incredibly rewarding and instrumental in developing my teamwork and leadership skills. I'm incredibly grateful for the community, the challenges, and the friendships I've made along the way."
  },
  
];


const TeamPage = () => {
  // Use state to track the active member's ID
  const [activeMemberId, setActiveMemberId] = useState(null);
  const listRef = useRef(null); // --- NEW --- Create a ref for the list container

  // Fallback for missing images
  const onImageError = (e) => {
    e.target.src = 'https://placehold.co/320x400?text=Image+Missing';
  };

  // Handler for touch/click, which has toggle behavior
  const handleToggleActive = (memberId) => {
    // If clicking the same one, close it. Otherwise, open the new one.
    setActiveMemberId(prevId => (prevId === memberId ? null : memberId));
  };

  // --- NEW --- Add effect for handling outside clicks/taps
  useEffect(() => {
    const handleOutsideTap = (event) => {
      // Check if the click is outside the listRef container
      if (listRef.current && !listRef.current.contains(event.target)) {
        setActiveMemberId(null); // Close any open item
      }
    };

    // Add event listeners for both mouse and touch
    document.addEventListener('mousedown', handleOutsideTap);
    document.addEventListener('touchstart', handleOutsideTap);

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideTap);
      document.removeEventListener('touchstart', handleOutsideTap);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <div className="tp-page-content">
        <main className="tp-team-container">
          
          {/* --- 1. DESKTOP STICKY IMAGE --- */}
          {/* This is hidden on mobile by the CSS */}
          <div className={`tp-team-image-container ${activeMemberId ? 'tp-visible' : ''}`}>
            {teamData.map((member) => (
              <img
                key={member.id}
                src={member.img}
                alt={member.name}
                // Conditionally add the 'tp-active' class for the photo
                className={`tp-team-photo ${activeMemberId === member.id ? 'tp-active' : ''}`}
                onError={onImageError}
              />
            ))}
          </div>

          <div 
            className="tp-team-list" 
            ref={listRef} // --- NEW --- Attach the ref to the list container
            // When mouse leaves the *entire list*, reset the active member
            onMouseLeave={() => setActiveMemberId(null)}
          >
            <div className="tp-team-member-intro">
              <h3>Our Executives</h3>
              <p>Our executive team is a blend of passionate, driven, and skilled individuals who ensure the smooth functioning of our chapter. Together, they form the backbone of our operations, turning ideas into action and maintaining the standards, culture, and professionalism that define our chapter. Their dedication and teamwork are what keep our initiatives running with excellence throughout the year.</p>
            </div>

            {/* Map over the team data to create the list */}
            {teamData.map((member) => (
              <div
                key={member.id}
                // Conditionally add 'tp-active' class to the member item itself
                className={`tp-team-member ${activeMemberId === member.id ? 'tp-active' : ''}`}
                // Set this member as active on hover (for desktop)
                onMouseEnter={() => setActiveMemberId(member.id)}
                // Use toggle handler for click/touch (for mobile)
                onClick={(e) => {
                  e.stopPropagation(); // --- NEW --- Stop tap from bubbling to the document
                  handleToggleActive(member.id);
                }}
              >
                <span className="tp-member-title">{member.title}</span>
                <h2 className="tp-member-name">{member.name}</h2>
                
                {/* --- 2. NEW MOBILE-ONLY IMAGE --- */}
                {/* This is hidden on desktop by the CSS */}
                <div className="tp-mobile-image-wrapper">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="tp-mobile-photo"
                    onError={onImageError}
                  />
                </div>
                
                {/* --- 3. SHARED DESCRIPTION BOX --- */}
                <div className="tp-member-description">
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
            
          </div>
        </main>
      </div>
    </>
  );
};

export default TeamPage;