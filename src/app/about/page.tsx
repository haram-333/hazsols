'use client';

import Header from '@/app/components/header';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {

    const insightsRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
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
    }, []);

    return (
        <>
            <Header />
            <main>
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
                                <Link href="/contact" className="cta-button">
                                    Get in Touch
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="philosophy" ref={insightsRef}>
                    <div className="img-section" ref={imgRef}>
                        <img
                            src="./images/random.jpg"
                        ></img>
                    </div>
                    <div className="philosophy-text" ref={textRef}>
                        <div className="philosophy-label" ref={labelRef}>OUR PHILOSOPHY</div>
                        <p className="philosophy-description" ref={descRef}>At HazSols, our philosophy is simple— empowering people and businesses through innovation. We believe in fostering a collaborative environment, investing in talent, and delivering meaningful solutions that drive progress for our clients and communities worldwide.</p>
                        <button className="philosophy-cta" ref={buttonRef}>Learn More</button>
                    </div>
                </div>
            </main>
        </>
    );
}
