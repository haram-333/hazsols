'use client';

import Header from '@/app/components/header';
import ContactForm from '@/app/components/contact-form';
import Footer from '@/app/components/footer';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const [mounted, setMounted] = useState(false);

    const insightsRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Set theme immediately to prevent flicker
        try {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
        } catch (error) {
            console.warn('Theme setting failed:', error);
            document.documentElement.setAttribute('data-theme', 'light');
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const insights = insightsRef.current;
        const img = imgRef.current;
        const text = textRef.current;
        const label = labelRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const button = buttonRef.current;

        if (!insights || !img || !text || !label || !title || !desc || !button) return;

        // Check if mobile/tablet (flex-direction: column)
        const isMobile = window.innerWidth <= 1200;

        if (isMobile) {
            // Mobile/Tablet: Show text immediately, no GSAP animations
            gsap.set([label, title, desc, button], { opacity: 1 });
            gsap.set(img, {
                width: "100%",
                height: "60vh",
                position: "relative",
                top: "auto",
                left: "auto",
                right: "auto",
                y: "auto"
            });
        } else {
            // Desktop: Use GSAP animations
            gsap.set([label, title, desc, button], { opacity: 0 });

            // Create the main timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: insights,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1,
                    pin: true
                }
            });

            // Add video width animation to timeline (0-100% of timeline)
            tl.to(img, {
                width: "50%",
                left: 0,
                top: '50%',
                y: '-50%',
                position: 'absolute',
                duration: 2,
                ease: "power2.out"
            })
                // Add text animations (starts at 100% of timeline - when video reaches 50%)
                .to(label, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, 1.0)
                .to(title, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, 1.2)
                .to(desc, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, 1.4)
                .to(button, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, 1.6);
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [mounted]);

    if (!mounted) {
        return (
            <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="insights font-sans">
                {/* About Hero Section */}
                <section className="service-hero">
                    {/* Background Image */}
                    <div className="hero-background">
                        <Image
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop&crop=center"
                            alt="About Us Background"
                            fill
                            className="background-image"
                            priority
                        />
                    </div>

                    {/* Liquid Glass Effect Container */}
                    <div className="glass-container">
                        {/* Manual blur layer behind glass card */}
                        <div className="glass-blur-layer">
                            <Image
                                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop&crop=center"
                                alt="About Us Background Blurred"
                                fill
                                className="glass-blur-image"
                                priority
                            />
                        </div>

                        <div className="glass-card">
                            <div className="glass-content">
                                <div className="service-category">ABOUT US</div>
                                <h1 className="service-title">Empowering Businesses, Inspiring Innovation</h1>
                                <a href="/contact" className="cta-button">
                                    Get in Touch
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="insights" ref={insightsRef}>
                    <div className="img-section" ref={imgRef}>
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&crop=center"
                            alt="Our Team Philosophy"
                        ></img>
                    </div>
                    <div className="insights-text" ref={textRef}>
                        <div className="insights-label" ref={labelRef}>OUR PHILOSOPHY</div>
                        <h1 className="insights-title" ref={titleRef}>Empowering people and businesses through innovation.</h1>
                        <p className="insights-description" ref={descRef}>At HazSols, our philosophy is simple empowering people and businesses through innovation. We believe in fostering a collaborative environment, investing in talent, and delivering meaningful solutions that drive progress for our clients and communities worldwide.</p>
                        <a href="/contact" className="insights-cta" ref={buttonRef}>GET IN TOUCH</a>
                    </div>
                </div>
            </main>

            {/* Our Mission Section - Outside main container for full width */}
            <section className="mission-section">
                <div className="mission-bg-circle"></div>
                <div className="mission-container">
                    <h2 className="mission-title">
                        <span className="mission-title-our">Our</span>
                        <span className="mission-title-mission">Mission</span>
                    </h2>
                        <div className="mission-content-box">
                            <div className="mission-quote-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 14" fill="none" className="quote-svg">
                                    <path d="M14.5 7H12V5C12 3.89688 12.8969 3 14 3H14.25C14.6656 3 15 2.66563 15 2.25V0.75C15 0.334375 14.6656 0 14.25 0H14C11.2375 0 9 2.2375 9 5V12.5C9 13.3281 9.67188 14 10.5 14H14.5C15.3281 14 16 13.3281 16 12.5V8.5C16 7.67188 15.3281 7 14.5 7ZM5.5 7H3V5C3 3.89688 3.89688 3 5 3H5.25C5.66563 3 6 2.66563 6 2.25V0.75C6 0.334375 5.66563 0 5.25 0H5C2.2375 0 0 2.2375 0 5V12.5C0 13.3281 0.671875 14 1.5 14H5.5C6.32812 14 7 13.3281 7 12.5V8.5C7 7.67188 6.32812 7 5.5 7Z" fill="currentColor"></path>
                                </svg>
                            </div>
                        <p className="mission-text">
                            To empower businesses with cutting-edge technology solutions, unlocking their growth potential by connecting them with passionate and skilled engineers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Vision Section */}
            <section className="vision-section">
                <div className="vision-bg-circle"></div>
                <div className="vision-container">
                    <h2 className="vision-title">
                        <span className="vision-title-our">Our</span>
                        <span className="vision-title-vision">Vision</span>
                    </h2>
                    <div className="vision-content-box">
                        <div className="vision-quote-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 14" fill="none" className="quote-svg">
                                <path d="M14.5 7H12V5C12 3.89688 12.8969 3 14 3H14.25C14.6656 3 15 2.66563 15 2.25V0.75C15 0.334375 14.6656 0 14.25 0H14C11.2375 0 9 2.2375 9 5V12.5C9 13.3281 9.67188 14 10.5 14H14.5C15.3281 14 16 13.3281 16 12.5V8.5C16 7.67188 15.3281 7 14.5 7ZM5.5 7H3V5C3 3.89688 3.89688 3 5 3H5.25C5.66563 3 6 2.66563 6 2.25V0.75C6 0.334375 5.66563 0 5.25 0H5C2.2375 0 0 2.2375 0 5V12.5C0 13.3281 0.671875 14 1.5 14H5.5C6.32812 14 7 13.3281 7 12.5V8.5C7 7.67188 6.32812 7 5.5 7Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <p className="vision-text">
                            At HazSols, we envision transforming IT systems into smart, agile, and AI-driven digital assets. With a decade of expertise, we empower global clients through innovative, adaptive solutions, shaping a future where technology meets the dynamic demands of a connected world.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="values-section">
                <div className="values-container">
                    <div className="values-header">
                        <span className="values-label">OUR VALUES</span>
                        <h2 className="values-title">We Believe in Providing Values.</h2>
                    </div>
                        <div className="values-cards">
                            <div className="value-card">
                                <div className="value-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                    </svg>
                                </div>
                                <h3 className="value-card-title">Ship & Iterate</h3>
                                <p className="value-card-description">We move swiftly, refining our approach with every step to maintain a leading edge.</p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        <path d="M9 12l2 2 4-4"/>
                                    </svg>
                                </div>
                                <h3 className="value-card-title">Trusted Pair of Hands</h3>
                                <p className="value-card-description">Dependable and steadfast, we are always there when it matters most.</p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                                <h3 className="value-card-title">Overdeliver on the Promise</h3>
                                <p className="value-card-description">Exceeding expectations is our standard, going beyond what's assured.</p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3"/>
                                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                                    </svg>
                                </div>
                                <h3 className="value-card-title">Clear is Kind</h3>
                                <p className="value-card-description">Transparent, honest communication keeps everyone on the same page.</p>
                            </div>
                        </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <ContactForm />

            {/* Footer */}
            <Footer />
        </>
    );
}
