'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ScrollProgress() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const circumference = 2 * Math.PI * 25;
    let isAtBottomState = false;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate progress (0 to 100)
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      
      // Directly update SVG for immediate visual feedback
      if (progressCircleRef.current) {
        const strokeDashoffset = circumference - (progress / 100) * circumference;
        progressCircleRef.current.style.strokeDashoffset = strokeDashoffset.toString();
      }
      
      // Check if we're at the very bottom (within 5px)
      const newIsAtBottom = scrollTop + window.innerHeight >= docHeight - 5;
      
      // Only update React state if bottom state actually changed
      if (newIsAtBottom !== isAtBottomState) {
        isAtBottomState = newIsAtBottom;
        setIsAtBottom(newIsAtBottom);
        
        // Directly show/hide logo and arrow
        if (logoRef.current && arrowRef.current) {
          if (newIsAtBottom) {
            logoRef.current.style.display = 'none';
            arrowRef.current.style.display = 'block';
          } else {
            logoRef.current.style.display = 'block';
            arrowRef.current.style.display = 'none';
          }
        }
      }
    };

    // Initial calculation
    handleScroll();

    // Use both scroll and wheel events for immediate response
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const circumference = 2 * Math.PI * 25; // radius = 25 (for 60px circle)
  const strokeDasharray = circumference;

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-circle" onClick={scrollToTop}>
        <svg className="progress-ring" width="60" height="60">
          {/* Background circle */}
          <circle
            className="progress-ring-background"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
            fill="transparent"
            r="25"
            cx="30"
            cy="30"
          />
          {/* Progress circle */}
          <circle
            ref={progressCircleRef}
            className="progress-ring-progress"
            stroke="#14b8a6"
            strokeWidth="2"
            fill="transparent"
            r="25"
            cx="30"
            cy="30"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            transform="rotate(-90 30 30)"
          />
        </svg>
        
        {/* Logo or Arrow */}
        <div className="progress-content">
          <svg 
            ref={arrowRef}
            className="back-to-top-arrow" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            style={{ display: 'none' }}
          >
            <path 
              d="M7 14L12 9L17 14" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <Image 
            ref={logoRef}
            src="/logo.png" 
            alt="Logo" 
            width={20} 
            height={20}
            className="progress-logo"
          />
        </div>
      </div>
    </div>
  );
}
