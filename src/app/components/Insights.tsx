"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Insights() {
    const insightsRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const insights = insightsRef.current;
        const video = videoRef.current;
        const text = textRef.current;
        const label = labelRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const button = buttonRef.current;

        if (!insights || !video || !text || !label || !title || !desc || !button) return;

        // Check if mobile/tablet (flex-direction: column)
        const isMobile = window.innerWidth <= 1200;
        
        if (isMobile) {
            // Mobile/Tablet: Show text immediately, no GSAP animations
            gsap.set([label, title, desc, button], { opacity: 1 });
            gsap.set(video, {
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
            tl.to(video, {
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
        <div className="insights" ref={insightsRef}>
            <div className="vid-section" ref={videoRef}>
                <video 
                    src="./videos/meeting.mp4" 
                    autoPlay 
                    muted 
                    loop
                ></video>
            </div>
            <div className="insights-text" ref={textRef}>
                <div className="insights-label" ref={labelRef}>INSIGHTS</div>
                <h1 className="insights-title" ref={titleRef}>Data-driven solutions for modern businesses.</h1>
                <p className="insights-description" ref={descRef}>Transform your operations with cutting-edge technology and strategic insights.</p>
                <a href="/contact" className="insights-cta" ref={buttonRef}>GET IN TOUCH</a>
            </div>
        </div>
    );
}
