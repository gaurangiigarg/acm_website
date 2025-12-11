import React from 'react';
import './CommitteeShowcase.css';

const topRowCommittees = [
  {
    title: 'Operations',
    description:
      'The Operations committee works behind the scenes to ensure the smooth functioning of every event or activity of the chapters.',
  },
  {
    title: 'Corporate Social Responsibility',
    description:
      'Being the reflection of the chapter’s ethics and deeds, the CSR committee curates activities that help contribute to the upliftment of society. It promotes education, and vocational skills among young children.',
  },
];

const otherCommittees = [
  {
    title: 'Technical',
    description:
      "The Chapter's backbone, the Technical Team not only designs the websites and apps for the Chapter, but also propogates the culture of coding across entire UPES and works on projects that help students learn.",
  },
  {
    title: 'Events',
    description:
      'The brain of the chapter, organizes a variety of events, our vivacious team. Through creative concepts and flawless event execution, the Events team makes sure that attendees enjoy every minute from conception to conclusion.',
  },
  {
    title: 'Public Relations & Sponsorship',
    description:
      "The PR and Sponsorship team puts in immeasurable efforts to secure sponsorships for the events, respond to inquiries, and tries to increase the chapter's outreach",
  },
  {
    title: 'Design & VFX',
    description:
      'This distinguished committee is the creative house of the chapters. This team always leads the forefront by making breathtaking videos and developing visually appealing graphic material.',
  },
  {
    title: 'Editorial',
    description:
      "The Editorial Committee is the brainchild behind the Chapter's all formal communications, blogs, social media content and document all the daily proceedings. This teams gives life to everything you see or read about UPES ACM.",
  },
];

const CommitteesShowcase = () => {
  return (
    <div className="committees-overlay">
      <div className="committees-grid">
        {otherCommittees.map((committee, index) => (
          // ✅ WRAP your card in this new placeholder div
          <div className="committee-placeholder" key={`other-${index}`}>
            <div className="committee-card">
              <div className="committee-title">{committee.title}</div>
              <div className="committee-description">{committee.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="committees-top-row">
        {topRowCommittees.map((committee, index) => (
          // ✅ WRAP this card too
          <div className="committee-placeholder" key={`top-${index}`}>
            <div className="committee-card">
              <div className="committee-title">{committee.title}</div>
              <div className="committee-description">{committee.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitteesShowcase;