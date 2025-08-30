import React, { useEffect, useRef } from 'react';


// Data for the committees
const committeesData = [
    { name: 'Technical', description: 'Driving innovation through code, workshops, and cutting-edge tech projects.' },
    { name: 'Events', description: 'Crafting memorable experiences and flagship events that bring our community together.' },
    { name: 'Operations', description: 'The backbone of the chapter, ensuring everything runs smoothly behind the scenes.' },
    { name: 'VFX', description: 'Bringing ideas to life with stunning visual effects, animation, and creative motion graphics.' },
    { name: 'Design', description: 'Shaping our visual identity with beautiful graphics, UI/UX, and creative branding.' },
    { name: 'CSR', description: 'Making a positive impact on society through meaningful community service initiatives.' },
    { name: 'PR', description: 'Managing our public image, outreach, and communications to the wider world.' }
];

// ✅ All CSS is now embedded here to fix the import error
const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    .committees-body-style {
        font-family: 'Poppins', sans-serif;
        color: #e5e5e5;
        overscroll-behavior: none;
        margin: 0;
    }
    
    .CommitteesSection {
    background-color: #000; /* ensures black background at root */
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
            width: auto;
            height: auto;
            opacity: 1;
            transform: none;
        }
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

        const handleScroll = () => {
            if (window.innerWidth <= 768) {
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
                    const translateX = 120 * (1 - slideProgress);
                    card.style.transform = `translateX(${translateX}%)`;
                } else {
                    card.style.transform = 'translateX(120%)';
                }
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
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

