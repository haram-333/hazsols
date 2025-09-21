"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div ref={sectionRef} className="video-scroll-section">
      <div className="video-scroll-container">
        {isVideoVisible && (
          <video
            ref={videoRef}
            className="video-scroll-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoad}
            style={{ opacity: isVideoLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          >
            <source src="/videos/meeting.mp4" type="video/mp4" />
          </video>
        )}

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
