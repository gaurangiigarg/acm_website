import React, { useEffect, useRef, useMemo, useState } from 'react';

// CSS for all components and animations
const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&display=swap');

    /* --- Main Page Styles --- */
    .contact-reveal-background {
        background-color: #02030a; /* Start color: near-black blue */
        font-family: 'Poppins', sans-serif;
        color: #ffffff;
        will-change: background-color; /* Optimize for GSAP animation */
        min-height: 100vh; /* Make the entire section fit one screen */
        display: flex;
        align-items: center; /* Vertically center the content block */
        box-sizing: border-box;
    }

    /* This container holds all the content and defines the text alignment */
    .contact-reveal-container {
        max-width: 42rem;
        width: 100%;
        margin: 0 auto;
        padding: 0 1.5rem;
        text-align: center;
    }

    /* --- Block Styles for Text Elements --- */
    .contact-reveal-block, .decrypted-text-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-bottom: 1.5rem; 
        transition: opacity 0.5s ease-in-out;
        opacity: 0;
    }
    
    .contact-reveal-block.visible,
    .decrypted-text-container.visible {
        opacity: 1;
    }

    .contact-reveal-block:last-child {
        margin-bottom: 0;
    }
    
    /* --- Typography & Styling --- */
    .contact-reveal-p, .decrypted-text-p {
        line-height: 1.5;
        font-weight: 600;
    }
    
    .contact-reveal-word {
        display: inline-block;
    }

    /* Title (Decrypted) */
    .contact-reveal-title .decrypted-text-p {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(2.25rem, 6vw, 3.5rem);
        font-weight: 700;
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    /* Subtitle (Scroll Reveal) */
    .contact-reveal-subtitle .contact-reveal-p {
        font-size: clamp(1rem, 3vw, 1.125rem);
        color: #DBEAFE;
        font-weight: 400;
    }
    
    /* Main Text (Scroll Reveal) */
    .contact-reveal-main .contact-reveal-p {
        font-size: clamp(1rem, 3vw, 1.125rem);
        color: #BFDBFE;
        font-weight: 300;
        margin-top: 0.5rem;
    }

    /* --- Desktop Alignment Overrides --- */
    @media (min-width: 769px) {
        .contact-reveal-container {
            margin: 0; 
            padding: 0 5rem;
            text-align: left;
        }

        .contact-reveal-block, .decrypted-text-container {
            justify-content: flex-start;
        }
    }
    
    /* --- ✅ NEW MOBILE STYLES --- */
    /* This block reduces height and disables flex centering on small screens */
    @media (max-width: 768px) {
        .contact-reveal-background {
            min-height: auto;  /* Let content define height */
            display: block;     /* Disable flex vertical centering */
            padding: 6rem 0;  /* Add vertical padding */
        }
        
        /* Ensure mobile text stays centered */
        .contact-reveal-container {
            text-align: center;
        }
        .decrypted-text-container {
            justify-content: center;
        }
    }
`;

/**
 * ✅ NEW: useMediaQuery Hook
 * This hook checks if a CSS media query matches and returns a boolean.
 * We use this to conditionally run animations.
 */
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        // Using addEventListener/removeEventListener for broader compatibility
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

/**
 * DecryptedText Component
 * ✅ UPDATED: Now skips animation entirely on mobile screens.
 */
const DecryptedText = ({ text, speed = 50, maxIterations = 20, parentClassName = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const [visible, setVisible] = useState(false);
    const containerRef = useRef(null);
    const animationFrameRef = useRef();
    const originalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Check if we are on desktop (screens > 768px)
    const isDesktop = useMediaQuery('(min-width: 769px)');

    useEffect(() => {
        // --- ✅ DESKTOP LOGIC ---
        // Only run the complex observer animation logic if on desktop
        if (isDesktop) {
            let currentText = [];
            let iterations = [];

            const animate = () => {
                let finished = true;
                currentText = currentText.map((char, index) => {
                    if (text[index] === ' ') return ' ';
                    if (iterations[index] < maxIterations) {
                        finished = false;
                        iterations[index] += 1;
                        return originalChars[Math.floor(Math.random() * originalChars.length)];
                    } else {
                        return text[index];
                    }
                });
                setDisplayText(currentText.join(''));
                if (!finished) {
                    animationFrameRef.current = setTimeout(() => requestAnimationFrame(animate), speed);
                }
            };

            const observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting) {
                        setVisible(true);
                        currentText = text.split('').map(() => originalChars[Math.floor(Math.random() * originalChars.length)]);
                        iterations = Array(text.length).fill(0);
                        animate();
                    } else {
                        setVisible(false);
                        clearTimeout(animationFrameRef.current);
                        setTimeout(() => setDisplayText(""), 400);
                    }
                },
                { threshold: 0.5 }
            );

            if (containerRef.current) observer.observe(containerRef.current);

            return () => {
                clearTimeout(animationFrameRef.current);
                observer.disconnect();
            };
        } 
        // --- ✅ MOBILE LOGIC ---
        // On mobile, just show the text immediately. No animation, no observer.
        else {
            setDisplayText(text);
            setVisible(true);
        }
    }, [text, speed, maxIterations, isDesktop]); // Add isDesktop to dependency array

    return (
        <div
            ref={containerRef}
            className={`decrypted-text-container ${parentClassName} ${visible ? "visible" : ""}`}
        >
            <p className="decrypted-text-p">{displayText || text}</p>
        </div>
    );
};

/**
 * ScrollRevealText Component
 * ✅ UPDATED: Now skips GSAP animation on mobile screens.
 * (Note: This component is defined but not used in the final JSX, 
 * but its logic is now correctly guarded by the isDesktop check).
 */
const ScrollRevealText = ({ children, containerClassName = "" }) => {
    const containerRef = useRef(null);
    const isDesktop = useMediaQuery('(min-width: 769px)'); // Check for desktop

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word; 
            return (
                <span className="contact-reveal-word" key={index} style={{ display: 'inline-block' }}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        // ✅ Only run GSAP logic if on desktop AND if GSAP has been loaded
        if (isDesktop && window.gsap) {
            const el = containerRef.current;
            if (!el) return;

            const words = window.gsap.utils.toArray(el.querySelectorAll('.contact-reveal-word'));
            if (words.length === 0) return;

            window.gsap.set(el, { transformOrigin: '0% 50%', rotate: 3 });
            window.gsap.set(words, {
                autoAlpha: 0.1,
                textShadow: '0 0 4px rgba(255,255,255,0.6)',
            });

            const rotationTl = window.gsap.to(el, {
                rotate: 0,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom center', scrub: true },
            });

            const wordsTl = window.gsap.to(words, {
                autoAlpha: 1,
                textShadow: '0 0 0px rgba(255,255,255,0)',
                stagger: 0.05,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom-=20%', end: 'bottom center', scrub: true },
            });

            return () => {
                rotationTl.scrollTrigger?.kill();
                wordsTl.scrollTrigger?.kill();
            };
        }
        // On mobile, this effect does nothing, and the text will be visible
        // only when the parent block becomes visible.
    }, [isDesktop]); // Add isDesktop dependency

     // ✅ On mobile, we need a simple observer to just fade the block in (since GSAP isn't doing it)
     useEffect(() => {
        if (!isDesktop) {
            const el = containerRef.current;
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        el.classList.add('visible');
                        observer.unobserve(el);
                    }
                },
                { threshold: 0.2 }
            );
            observer.observe(el);
            return () => observer.disconnect();
        }
    }, [isDesktop]);

    return (
        <div ref={containerRef} className={`contact-reveal-block ${containerClassName}`}>
            <p className="contact-reveal-p">{splitText}</p>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
// ✅ UPDATED: Now only loads GSAP and runs background animation on desktop.
const IntroContact = () => {
    const backgroundRef = useRef(null);
    const isDesktop = useMediaQuery('(min-width: 769px)'); // Check for desktop

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = cssStyles;
        document.head.appendChild(styleElement);

        let backgroundTl;

        // ✅ Only load GSAP and run animations if we are on a desktop
        if (isDesktop) {
            const loadScript = (src, onLoad) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = onLoad;
                document.head.appendChild(script);
                return script;
            };

            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', () => {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', () => {
                    const gsap = window.gsap;
                    gsap.registerPlugin(window.ScrollTrigger);

                    const target = backgroundRef.current;
                    if (!target) return;

                    backgroundTl = gsap.fromTo(
                        target,
                        { backgroundColor: '#02030a' },
                        {
                            backgroundColor: '#233B90',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: target,
                                start: 'top bottom',
                                end: 'bottom bottom',
                                scrub: true,
                            },
                        }
                    );
                });
            });
        }

        return () => {
            // Cleanup: Kill GSAP timeline (if it exists) and remove the injected styles
            backgroundTl?.scrollTrigger?.kill();
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, [isDesktop]); // Add isDesktop dependency

    return (
        <div ref={backgroundRef} className="contact-reveal-background">
            <div className="contact-reveal-container">
                <DecryptedText
                    text="Get In Touch"
                    speed={50}
                    maxIterations={10}
                    parentClassName="contact-reveal-title"
                />

                {/* These static divs were not using the ScrollRevealText component.
                  For mobile, they need to be visible. We can use the simple ScrollRevealText
                  component (which now has a mobile fallback) to wrap them.
                  Or simpler: just make them visible. The DecryptedText observer will make them pop-in.
                  Let's wrap them in the updated ScrollRevealText for a clean mobile fade-in.
                */}
                
                <ScrollRevealText containerClassName="contact-reveal-subtitle">
                    We're here to help and answer any question you might have. We look forward to hearing from you!
                </ScrollRevealText>

                <ScrollRevealText containerClassName="contact-reveal-main">
                    Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
                </ScrollRevealText>
            </div>
        </div>
    );
};

export default IntroContact;