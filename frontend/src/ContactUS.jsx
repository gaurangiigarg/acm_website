import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Make sure this path is correct for your project structure
import bgvideo from '../src/assets/Chipsvideo_Contactus.webm';

// Full CSS is embedded in this constant
const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    /* --- Main Container & Background --- */
    .futuristic-contact-wrapper {
        font-family: 'Poppins', sans-serif;
        background-color: #253A95;
        color: #E0E0E0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        overflow: hidden;
        position: relative;
    }

    /* --- Video Background --- */
    .futuristic-contact-bg-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0; /* Sits behind the form */
        display: none; /* Hidden on mobile by default */
    }

    /* --- Form Card --- */
    .futuristic-contact-card {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 28rem; /* 448px */
        background: rgba(0, 0, 0, 0.4); /* Slightly more opaque for readability over video */
        backdrop-filter: blur(1rem);
        border-radius: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        padding: 2.5rem;
        border: 1px solid rgba(129, 140, 248, 0.2);
    }

    /* --- Form Elements --- */
    .futuristic-contact-header { margin-bottom: 2rem; }
    .futuristic-contact-form > div:not(:last-child) { margin-bottom: 1.5rem; }
    .futuristic-contact-input-wrapper { position: relative; }
    .futuristic-contact-input {
        width: 100%;
        padding: 0.85rem 1rem 0.85rem 3rem;
        background: rgba(10, 15, 40, 0.4);
        border: 1px solid rgba(129, 140, 248, 0.2);
        border-radius: 0.5rem;
        color: white;
        transition: border-color 0.3s, box-shadow 0.3s;
    }
    .futuristic-contact-input::placeholder { color: rgba(199, 210, 254, 0.6); }
    .futuristic-contact-input:focus {
        outline: none;
        border-color: rgba(129, 140, 248, 0.7);
        box-shadow: 0 0 15px rgba(129, 140, 248, 0.4);
    }
    .futuristic-contact-icon {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        color: #a5b4fc;
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
        pointer-events: none;
    }
    .futuristic-contact-textarea-icon {
        top: 1.25rem;
        transform: none;
    }
    .futuristic-contact-submit-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 0.85rem 1rem;
        font-weight: 600;
        color: white;
        border-radius: 0.5rem;
        background-image: linear-gradient(to right, #1E3A8A, #2545B4);
        box-shadow: 0 0 15px rgba(37, 58, 149, 0.8);
        transition: all 0.3s;
        border: none;
        cursor: pointer;
    }
    .futuristic-contact-submit-btn > svg {
        width: 1.25rem;
        height: 1.25rem;
    }
    .futuristic-contact-submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 25px rgba(37, 58, 149, 1);
    }
    .futuristic-contact-submit-btn:disabled {
        background-image: linear-gradient(to right, #1e3a8a, #1c3579);
        cursor: not-allowed;
        opacity: 0.6;
    }
    .futuristic-contact-toast {
        position: fixed;
        top: 1.25rem;
        right: 1.25rem;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        opacity: 0;
        transform: translateY(0.5rem);
        transition: opacity 0.3s, transform 0.3s;
        pointer-events: none;
        z-index: 9999;
    }
    .futuristic-contact-toast.show {
        opacity: 1;
        transform: translateY(0);
    }
    @media (min-width: 768px) {
        .futuristic-contact-wrapper { justify-content: flex-end; }
        .futuristic-contact-card { margin-right: 4rem; }
        .futuristic-contact-bg-video { display: block; }
    }
    @media (min-width: 1024px) {
        .futuristic-contact-card { margin-right: 6rem; }
    }
    @media (max-width: 767px) {
      .futuristic-contact-wrapper {
        min-height: auto;
        display: block;
        padding: 5rem 1rem;
      }
    }
`;

const UserIcon = () => ( <svg className="futuristic-contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> </svg> );
const EmailIcon = () => ( <svg className="futuristic-contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /> </svg> );
const MessageIcon = () => ( <svg className="futuristic-contact-icon futuristic-contact-textarea-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /> </svg> );
const SendIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /> </svg> );
const LoadingSpinner = () => ( <svg className="animate-spin h-5 w-5 text-white" style={{ animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> );


const ContactForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = cssStyles;
        document.head.appendChild(styleElement);
        return () => {
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000);
    };

    // ✅ This function now sends the data to your Formspree endpoint
    const onSubmit = async (data) => {
        setIsLoading(true);
        
        // Your specific Formspree endpoint URL is pasted here
        const formspreeEndpoint = 'https://formspree.io/f/mnnbyngg';

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // Important for Formspree to send a JSON response
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            showToast("Message sent successfully!", "success");
            reset(); // Clear the form fields
        } catch (error) {
            console.error("There was a problem with the form submission:", error);
            showToast("Failed to send message. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="futuristic-contact-wrapper">
            <video autoPlay loop muted className="futuristic-contact-bg-video">
                <source src={bgvideo} type="video/webm" />
                Your browser does not support the video tag.
            </video>
            
            <div className="futuristic-contact-card">
                <div className="futuristic-contact-header">
                     <h1 style={{fontSize: '1.875rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem'}}>Send Message</h1>
                     <p style={{color: '#c7d2fe'}}>We'd love to hear from you</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="futuristic-contact-form">
                     <div>
                         <div className="futuristic-contact-input-wrapper">
                             <UserIcon />
                             <input 
                                 type="text" 
                                 placeholder="Your Full Name" 
                                 {...register("name", { required: "Full name is required." })}
                                 className="futuristic-contact-input" 
                             />
                         </div>
                         {errors.name && <p style={{color: '#f87171', marginTop: '0.5rem'}}>{errors.name.message}</p>}
                     </div>
                     <div>
                         <div className="futuristic-contact-input-wrapper">
                             <EmailIcon />
                             <input 
                                 type="email" 
                                 placeholder="your.email@example.com" 
                                 {...register("email", { 
                                     required: "Email is required.",
                                     pattern: {
                                         value: /^\S+@\S+$/i,
                                         message: "Entered value does not match email format."
                                     }
                                 })}
                                 className="futuristic-contact-input" 
                             />
                         </div>
                         {errors.email && <p style={{color: '#f87171', marginTop: '0.5rem'}}>{errors.email.message}</p>}
                     </div>
                     <div>
                         <div className="futuristic-contact-input-wrapper">
                             <MessageIcon />
                             <textarea 
                                 rows="4" 
                                 placeholder="Tell us about your project, question, or just say hello..." 
                                 {...register("message", { required: "Message is required." })}
                                 className="futuristic-contact-input"
                             ></textarea>
                         </div>
                         {errors.message && <p style={{color: '#f87171', marginTop: '0.5rem'}}>{errors.message.message}</p>}
                     </div>
                     <div>
                         <button type="submit" disabled={isLoading} className="futuristic-contact-submit-btn">
                             {isLoading ? <LoadingSpinner /> : <><SendIcon /> <span>Send Message</span></>}
                         </button>
                     </div>
                </form>
            </div>
            
            <div 
                className={`futuristic-contact-toast ${toast.show ? 'show' : ''}`}
                style={{ backgroundColor: toast.type === 'success' ? '#22C55E' : '#EF4444', color: 'white' }}
            >
                <p>{toast.message}</p>
            </div>
        </div>
    );
};

export default ContactForm;