"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set text hidden initially
    gsap.set(textRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      // Create timeline for everything
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500vh",
          pin: true,
          pinSpacing: false,
          scrub: 1,
        }
      });

      // Video shrinks to 50%
      tl.to(videoRef.current, {
        width: "50%",
        height: "70vh",
        top: "50%",
        left: "0%",
        transform: "translateY(-50%)",
        duration: 1,
        ease: "none"
      });

      // Text appears at the end
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="video-scroll-section">
      <div className="video-scroll-container">
        <video
          ref={videoRef}
          className="video-scroll-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/meeting.mp4" type="video/mp4" />
        </video>

        <div ref={textRef} className="video-scroll-text">
          <div className="video-scroll-content">
            <span className="video-scroll-label">COLLABORATION</span>
            <h2 className="video-scroll-title">
              Innovation through teamwork
            </h2>
            <p className="video-scroll-description">
              We believe in the power of collaboration to drive innovation and deliver exceptional results for our clients.
            </p>
            <button className="video-scroll-cta">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
