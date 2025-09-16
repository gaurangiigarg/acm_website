import React, { useEffect, useRef } from 'react';

// Data for the committees (no changes)
const committeesData = [
    { name: 'Technical', description: "The Chapter's backbone, the Technical Team not only designs the websites and apps for the Chapter, but also propogates the culture of coding across entire UPES and works on projects that help students learn." },
    { name: 'Events', description: 'The brain of the chapter, organizes a variety of events, our vivacious team. Through creative concepts and flawless event execution, the Events team makes sure that attendees enjoy every minute from conception to conclusion.' },
    { name: 'Design & VFX', description: 'This distinguished committee is the creative house of the chapters. This team always leads the forefront by making breathtaking videos and developing visually appealing graphic material.' },
    { name: 'Editorial', description: "The Editorial Committee is the brainchild behind the Chapter's all formal communications, blogs, social media content and document all the daily proceedings." },
    { name: 'CSR', description: 'Making a positive impact on society through meaningful community service initiatives.' },
    { name: 'PR', description: 'Managing our public image, outreach, and communications to the wider world.' },
    { name: 'Operations', description: 'The backbone of the chapter, ensuring everything runs smoothly behind the scenes.' },
];

// CSS (no changes)
const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    .committees-body-style {
        font-family: 'Poppins', sans-serif;
        color: #e5e5e5;
        overscroll-behavior: none;
        margin: 0;
    }
    
    .CommitteesSection {
        background-color: #000;
        min-height: 100vh;
    }
    
    .CommitteesSection .committees-scroll-area {
        height: 500vh;
        position: relative;
    }

    .CommitteesSection .committees-sticky-content {
        position: sticky;
        top: 0;
        height: 100vh;
        width: 100%;
        overflow: hidden;
    }

    .CommitteesSection .committees-layout {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
    }

    .CommitteesSection .committees-title-wrapper {
        flex-basis: 40%;
        flex-shrink: 0;
        padding: 0 5rem;
    }

    .CommitteesSection .committees-title-wrapper h2 {
        font-size: 5.5vw;
        font-weight: 700;
        line-height: 1.1;
        color: #ffffff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }

    .CommitteesSection .committees-cards-wrapper {
        flex-grow: 1;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .CommitteesSection .committee-card-item {
        position: absolute;
        width: 450px;
        height: 280px;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 24px;
        padding: 2.5rem;
        color: #fff;
        will-change: transform;
        box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-out;
    }

    .CommitteesSection .committee-card-item h3 {
        font-size: 2.25rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
        color: #1E3A8A;
    }

    .CommitteesSection .committee-card-item p {
        font-size: 1rem;
        line-height: 1.6;
        color: #374151;
    }

    .CommitteesSection .committees-subtitle {
      font-size: 1.1rem;
      font-weight: 400;
      margin-top: 2rem; 
      margin-left: 1rem;
      color: #9ca3af;
      line-height: 1.4;
    }

    /* Mobile responsiveness (no changes) */
    @media (max-width: 768px) {
        .CommitteesSection .committees-scroll-area,
        .CommitteesSection .committees-sticky-content {
            height: auto;
            position: relative;
        }

        .CommitteesSection .committees-layout {
            flex-direction: column;
            padding: 4rem 2rem;
        }

        .CommitteesSection .committees-title-wrapper {
            padding: 0;
            margin-bottom: 3rem;
            text-align: center;
        }

        .CommitteesSection .committees-title-wrapper h2 {
            font-size: 12vw;
        }

        .CommitteesSection .committees-cards-wrapper {
            position: static;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            height: auto;
            overflow: visible;
        }

        .CommitteesSection .committee-card-item {
          position: relative;
          width: 80%;
          max-width: 260px;
          height: auto; 
          padding: 1rem;
          opacity: 1;
          transform: none !important;
          transition: none;
        }

        .CommitteesSection .committee-card-item h3 { font-size: 1.2rem; }
        .CommitteesSection .committee-card-item p { font-size: 0.8rem; line-height: 1.4; }
        .CommitteesSection .committees-subtitle { font-size: 0.9rem; margin-top: 1rem; }
    }
`;

const Committees = () => {
    const scrollContainerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = cssStyles;
        document.head.appendChild(styleElement);
        document.body.classList.add('committees-body-style');

        const scrollContainer = scrollContainerRef.current;
        const cards = cardsRef.current;
        if (!scrollContainer || cards.length === 0) return;

        let ticking = false;
        const updateCards = () => {
            const scrollContainerTop = scrollContainer.offsetTop;
            const scrollContainerHeight = scrollContainer.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            const scrollDistance = scrollContainerHeight - viewportHeight;
            const progress = Math.max(0, Math.min(1, (scrollTop - scrollContainerTop) / scrollDistance));
            const cardProgress = progress * (cards.length - 1);
            const activeCardIndex = Math.floor(cardProgress);

            cards.forEach((card, i) => {
                if (!card) return;
                // ✅ REVERTED: Restored original z-index logic for "stack on top" effect
                card.style.zIndex = i;

                if (i <= activeCardIndex) {
                    card.style.transform = 'translateX(0%)';
                } else if (i === activeCardIndex + 1) {
                    const slideProgress = cardProgress - activeCardIndex;
                    const translateX = 150 * (1 - slideProgress);
                    card.style.transform = `translateX(${translateX}%)`;
                } else {
                    card.style.transform = 'translateX(150%)';
                }
            });
            ticking = false;
        };
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateCards);
                ticking = true;
            }
        };

        let resizeTimeout;
        const setupEventListeners = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const isMobile = window.innerWidth <= 768;
                
                window.removeEventListener('scroll', handleScroll);

                if (!isMobile) {
                    window.addEventListener('scroll', handleScroll, { passive: true });
                    updateCards();
                }
            }, 100);
        };

        setupEventListeners();
        window.addEventListener('resize', setupEventListeners);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', setupEventListeners);
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
            document.body.classList.remove('committees-body-style');
        };
    }, []);

    return (
        <div className="CommitteesSection">
            <div className="committees-scroll-area" ref={scrollContainerRef}>
                <div className="committees-sticky-content">
                    <div className="committees-layout">
                        <div className="committees-title-wrapper">
                            <h2>Our Committees</h2>
                            <p className="committees-subtitle">
                                Who make it all happen, our committees.
                            </p>
                        </div>
                        <div className="committees-cards-wrapper">
                            {committeesData.map((committee, index) => (
                                <div
                                    className="committee-card-item"
                                    key={committee.name}
                                    ref={el => cardsRef.current[index] = el}
                                >
                                    <h3>{committee.name}</h3>
                                    <p>{committee.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Committees;