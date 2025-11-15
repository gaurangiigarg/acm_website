import React, { useState } from 'react';
import './ExecutiveSlider.css'; 

import PankajBadoni from '../../assets/img/coverphoto.jpg';
import SangamKhanna from '../../assets/images/Sangam_Khanna.jpg';

// Updated data array to include the description
const teamData = [
  { 
    id: 'ceo', 
    title: 'Faculty Coordinator', 
    name: 'Pankaj Badoni', 
    img: PankajBadoni,
    description: "It has been over 8 years since I joined UPES ACM-W, and these past few years have been exciting and extremely successful for us. We have won several national and international awards for our hard work. Our annual event, Prodigy, has been a massive success for the past five years and I'm proud to say that UPES ACM hasn't ever hesitated from helping whenever possible, which can be seen in our outstanding CSR events and the collaborations we have. Being a part of ACM ensures that everyone can showcase what they're good at and constantly evolve. We strive to create a better environment for our members with every action of ours."
  },
  { 
    id: 'cfo', 
    title: 'Chairperson, ACM', 
    name: 'Sangam Khanna', 
    img: SangamKhanna,
    description: "I have been associated with the chapter since my first year in college. It's been almost two years now, and the journey has been great. From being the core committee member to the PR & Sponsorship Head and now representing the chapter as the Chairperson, has been really wonderful. UPES ACM & ACM-W is not only a student chapter but a family that brings the best out of you. We organize a variety of events ranging from technical, fun-tech and gaming events. Our coding initiatives such as the 21 Days of Code, Code Anytime and Spy-C have had great impact on the university students. We aim at coming together, being dedicated, growing together and contributing to the technical fraternity for the years to come."
  },
  { 
    id: 'coo', 
    title: 'Chief Operating Officer', 
    name: 'Ryan Hammond', 
    img: 'https://placehold.co/400x500/C0AC9B/333?text=Ryan',
    description: "Efficiency in operation is key. We streamline every process to ensure our projects are delivered on time and above expectations."
  },
  { 
    id: 'cho', 
    title: 'Chief Human Capital Officer', 
    name: 'Fatiema Ahmed', 
    img: 'https://placehold.co/400x500/A9988B/333?text=Fatiema',
    description: "Our people are our greatest asset. We foster a culture of collaboration, growth, and mutual respect. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  { 
    id: 'cto', 
    title: 'Chief Technical Officer', 
    name: 'Dylan Theunissen', 
    img: 'https://placehold.co/400x500/92847B/333?text=Dylan',
    description: "Innovation drives us. We leverage cutting-edge technology to redefine construction and asset management."
  },
  { 
    id: 'cmo', 
    title: 'Chief Commercial Officer', 
    name: 'Placeholder Name', 
    img: 'https://placehold.co/400x500/8B7A6C/333?text=Placeholder',
    description: "Placeholder quote about commercial strategy and market leadership. We connect with our clients."
  },
  { 
    id: 'cso', 
    title: 'Chief Strategy Officer', 
    name: 'Another Name', 
    img: 'https://placehold.co/400x500/7A6C5F/333?text=Another',
    description: "Another placeholder quote. Our vision is long-term, and our strategy is built on a foundation of data and experience."
  },
];


const TeamPage = () => {
  // Use state to track the active member's ID
  const [activeMemberId, setActiveMemberId] = useState(null);

  // Fallback for missing images
  const onImageError = (e) => {
    e.target.src = 'https://placehold.co/320x400?text=Image+Missing';
  };

  // Handler for touch/click, which has toggle behavior
  const handleToggleActive = (memberId) => {
    // If clicking the same one, close it. Otherwise, open the new one.
    setActiveMemberId(prevId => (prevId === memberId ? null : memberId));
  };

  return (
    <>
      <header className="tp-main-header">
        <div className="tp-logo">Our Team</div>
      </header>

      <div className="tp-page-content">
        <main className="tp-team-container">
          
          {/* UPDATED: Added conditional 'tp-visible' class */}
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
            // When mouse leaves the *entire list*, reset the active member
            onMouseLeave={() => setActiveMemberId(null)}
          >
            <div className="tp-team-member-intro">
              <h3>The Team</h3>
              <p>Anthem's management team has 200 combined years of deep experience in development, procurement, transactions, construction management, and asset management in South Africa.</p>
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
                onClick={() => handleToggleActive(member.id)}
              >
                <span className="tp-member-title">{member.title}</span>
                <h2 className="tp-member-name">{member.name}</h2>
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