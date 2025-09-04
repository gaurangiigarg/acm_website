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

    .contact-reveal-block:last-child {
        margin-bottom: 0;
    }

    .decrypted-text-container.visible {
        opacity: 1;
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
    @media (min-width: 768px) {
        .contact-reveal-container {
            margin: 0; 
            padding: 0 5rem;
            text-align: left;
        }

        .contact-reveal-block, .decrypted-text-container {
            justify-content: flex-start;
        }
    }
`;

/**
 * DecryptedText Component
 * Animates text with a scrambling "decryption" effect whenever it enters the viewport.
 */
const DecryptedText = ({ text, speed = 50, maxIterations = 20, parentClassName = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const [visible, setVisible] = useState(false);
    const containerRef = useRef(null);
    const animationFrameRef = useRef();
    const originalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    useEffect(() => {
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
    }, [text, speed, maxIterations]);

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
 */
const ScrollRevealText = ({ children, containerClassName = "" }) => {
    const containerRef = useRef(null);

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
        const el = containerRef.current;
        if (!el || !window.gsap) return;

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
    }, []);

    return (
        <div ref={containerRef} className={`contact-reveal-block ${containerClassName}`}>
            <p className="contact-reveal-p">{splitText}</p>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const IntroContact = () => {
    const backgroundRef = useRef(null);

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = cssStyles;
        document.head.appendChild(styleElement);

        let backgroundTl;

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

        return () => {
            backgroundTl?.scrollTrigger?.kill();
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    return (
        <div ref={backgroundRef} className="contact-reveal-background">
            <div className="contact-reveal-container">
                <DecryptedText
                    text="Get In Touch"
                    speed={50}
                    maxIterations={10}
                    parentClassName="contact-reveal-title"
                />


                <div className="contact-reveal-subtitle">
                    <p className="contact-reveal-p">
                        We're here to help and answer any question you might have. We look forward to hearing from you!
                    </p>
                </div>

                {/* Main text as plain text */}
                <div className="contact-reveal-main">
                    <p className="contact-reveal-p">
                        Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IntroContact;
