import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Initiatives.css';
import DecryptedText from '../Decrypted_Reveal/DecryptedText/DecryptedText';

// --- Data for the carousel cards ---
const cardData = [
    {
        category: 'Technical',
        title: '21 Days of Code',
        imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/codeanytime24/20240902_184154.jpg'
    },
    {
        category: 'CSR',
        title: 'Hour Of Code',
        imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/HOC/img5.jpeg'
    },
    {
        category: 'Technical',
        title: 'Code <br> Anytime',
        imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/codeanytime24/20240902_184253.jpg'
    },
    {
        category: 'Technical',
        title: 'Spy-C',
        imageUrl: 'https://raw.githubusercontent.com/upesnavneet/acm_assets/main/img/TTR/img1.jpg'
    },
    {
        category: 'Photography',
        title: 'Shutter-Saga',
        imageUrl: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3'
    }
];

// --- The Initiatives Carousel Component ---
function Initiatives() {
    const carouselRef = useRef(null);
    const [isPrevDisabled, setPrevDisabled] = useState(true);
    const [isNextDisabled, setNextDisabled] = useState(false);

    // useCallback to memoize the function for performance
    const updateButtons = useCallback(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        const tolerance = 10;

        setPrevDisabled(scrollLeft < tolerance);
        setNextDisabled(scrollLeft > scrollWidth - clientWidth - tolerance);
    }, []); // No dependencies, as it only relies on the ref

    // useEffect to handle side effects: adding event listeners
    useEffect(() => {
        const carouselElement = carouselRef.current;
        if (carouselElement) {
            carouselElement.addEventListener('scroll', updateButtons);
            window.addEventListener('resize', updateButtons);
            
            // Initial check
            updateButtons();
        }

        // Cleanup function to remove event listeners
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('scroll', updateButtons);
            }
            window.removeEventListener('resize', updateButtons);
        };
    }, [updateButtons]); // Rerun effect if updateButtons changes

    const getScrollAmount = () => {
        const carousel = carouselRef.current;
        if (!carousel) return 0;
        
        const card = carousel.querySelector('.carousel-card');
        if (!card) return 0;

        const carouselStyle = window.getComputedStyle(carousel);
        const cardGap = parseFloat(carouselStyle.gap) || 0;
        
        return card.offsetWidth + cardGap;
    };

    const handlePrevClick = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        }
    };

    const handleNextClick = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    };

    return (
        <div className="initiatives-container">

                <DecryptedText 
                text="Our Initiatives"
                sequential={true}
                useOriginalCharsOnly={false}
                animateOn="view"
                revealDirection="start"
                speed={50}
                maxIterations={40}
                parentClassName="initiatives-main-title" />


            <div className="initiatives-carousel-wrapper">
                <div className="initiatives-carousel-container" ref={carouselRef}>
                    {cardData.map((card, index) => (
                        <div 
                            key={index}
                            className="carousel-card" 
                            style={{ backgroundImage: `url('${card.imageUrl}')` }}
                        >
                            <div className="card-overlay"></div>
                            <div className="card-content">
                                <p className="card-category">{card.category}</p>
                                {/* Use dangerouslySetInnerHTML for the <br> tag */}
                                <h2 className="card-title" dangerouslySetInnerHTML={{ __html: card.title }}></h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="initiatives-navigation-controls">
                <button className="nav-button" onClick={handlePrevClick} disabled={isPrevDisabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <button className="nav-button" onClick={handleNextClick} disabled={isNextDisabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Initiatives;
