import React, { useEffect, useRef } from 'react';

// Data for the committees
const committeesData = [
    { name: 'Technical', description: "The Chapter's backbone." },
    { name: 'Events', description: 'The Brain of the Chapter.' },
    { name: 'Design', description: 'The visual identity of the Chapter.' },
    { name: 'VFX', description: 'Motion and magic behind every video.' },
    { name: 'Media', description: 'The eyes and lens of the Chapter.' },
    { name: 'Editorial', description: "The Voice of the Chapter" },
    { name: 'CSR', description: 'Keeping the chapter connected with society' },
    { name: 'PR', description: 'Managing our public image, outreach, and communications to the wider world.' },
    { name: 'Operations', description: 'The behind-the-scene heroes' },
];

// CSS with added transition for smoother animations
const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    .committees-body-style {
        font-family: 'Poppins', sans-serif;
        color: #e5e5e5;
        overscroll-behavior: none;
        margin: 0;
    }
    
    .CommitteesSection {
        background-color: #00000000; /* ensures black background at root */
        min-height: 100vh;
    }
    
    .CommitteesSection .committees-scroll-area {
        height: 500vh; /* This creates the scroll length needed for the effect */
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
        
        /* ✅ ADDED: CSS transition for smoother animations */
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

    /* Mobile responsiveness */
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
          transform: none;
          transition: none; /* Disable transition on mobile */
        }

        .CommitteesSection .committee-card-item h3 { font-size: 1.2rem; }
        .CommitteesSection .committee-card-item p { font-size: 0.8rem; line-height: 1.4; }
    }
    
    @media (max-width: 768px) {
      .CommitteesSection .committees-subtitle { font-size: 0.9rem; margin-top: 1rem; }
    }
`;

const CommitteesReveal = () => {
    const scrollContainerRef = useRef(null);
    const cardsRef = useRef([]);
    const ticking = useRef(false);

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = cssStyles;
        document.head.appendChild(styleElement);
        document.body.classList.add('committees-body-style');
        
        const scrollContainer = scrollContainerRef.current;
        const cards = cardsRef.current;

        if (!scrollContainer || cards.length === 0) return;

        const updateCards = () => {
            ticking.current = false; 

            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                cards.forEach(card => {
                    if (card) card.style.transform = 'none';
                });
                return; 
            }

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
                card.style.zIndex = i; 

                if (i <= activeCardIndex) {
                    card.style.transform = 'translateX(0%)';
                } else if (i === activeCardIndex + 1) {
                    const slideProgress = cardProgress - activeCardIndex;
                    // ✅ UPDATED: Increased translate value to ensure cards are off-screen
                    const translateX = 150 * (1 - slideProgress);
                    card.style.transform = `translateX(${translateX}%)`;
                } else {
                    // ✅ UPDATED: Increased translate value here as well
                    card.style.transform = 'translateX(150%)';
                }
            });
        };

        const handleScroll = () => {
            if (window.innerWidth <= 768) {
                return;
            }

            if (!ticking.current) {
                window.requestAnimationFrame(updateCards);
                ticking.current = true;
            }
        };
        
        const handleResize = () => {
            updateCards();
        };

        updateCards(); 
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            document.head.removeChild(styleElement);
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

export default CommitteesReveal;

