import React, { useEffect, useRef } from 'react';

// CSS for all components and animations
const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&display=swap');

    /* --- Main Page Styles --- */
    .contact-reveal-background {
        background-color: #02030a;
        font-family: 'Poppins', sans-serif;
        color: #ffffff;
        will-change: background-color;
        min-height: 100vh;
        display: flex;
        align-items: center;
        box-sizing: border-box;
    }

    .contact-reveal-container {
        max-width: 42rem;
        width: 100%;
        margin: 0 auto;
        padding: 0 1.5rem;
        text-align: center;
    }

    .contact-reveal-block {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-bottom: 1.5rem;
        transition: opacity 0.5s ease-in-out;
        opacity: 1;
    }

    .contact-reveal-block:last-child {
        margin-bottom: 0;
    }

    .contact-reveal-p {
        line-height: 1.5;
        font-weight: 600;
    }

    /* Title */
    .contact-reveal-title .contact-reveal-p {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(2.25rem, 6vw, 3.5rem);
        font-weight: 700;
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    /* Subtitle */
    .contact-reveal-subtitle .contact-reveal-p {
        font-size: clamp(1rem, 3vw, 1.125rem);
        color: #DBEAFE;
        font-weight: 400;
    }

    /* Main Text */
    .contact-reveal-main .contact-reveal-p {
        font-size: clamp(1rem, 3vw, 1.125rem);
        color: #BFDBFE;
        font-weight: 300;
        margin-top: 0.5rem;
    }

    @media (min-width: 768px) {
        .contact-reveal-container {
            margin: 0; 
            padding: 0 5rem;
            text-align: left;
        }

        .contact-reveal-block {
            justify-content: flex-start;
        }
    }

    @media (max-width: 767px) {
      .contact-reveal-background {
        min-height: auto;
        display: block;
        padding: 6rem 0;
      }
    }
`;

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

        // Run GSAP scroll color animation
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

                {/* ✅ Title without decryption effect */}
                <div className="contact-reveal-block contact-reveal-title">
                    <p className="contact-reveal-p">Get In Touch</p>
                </div>

                {/* Subtitle */}
                <div className="contact-reveal-subtitle">
                    <p className="contact-reveal-p">
                        We're here to help and answer any question you might have. We look forward to hearing from you!
                    </p>
                </div>

                {/* Main text */}
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
