"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import ThreeCanvas to prevent SSR window errors
const ThreeCanvas = dynamic(() => import('./three-canvas'), {
  ssr: false,
});

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface InsightCard {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

const insightCards: InsightCard[] = [
  {
    id: 'innovation',
    title: 'Innovation First',
    description: 'Embracing cutting-edge technologies to deliver breakthrough results.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
  },
  {
    id: 'quality',
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality checks for flawless delivery.',
    category: 'Process',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop'
  },
  {
    id: 'excellence',
    title: 'Technical Excellence',
    description: 'Robust, scalable, and maintainable enterprise solutions.',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop'
  },
  {
    id: 'agile',
    title: 'Agile Development',
    description: 'Rapid, iterative, and highly client-focused development cycles.',
    category: 'Methodology',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
  },
  {
    id: 'client-success',
    title: 'Client Success',
    description: 'Building lasting partnerships through exceptional service.',
    category: 'Partnership',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop'
  },
  {
    id: 'future-ready',
    title: 'Future-Ready',
    description: 'Solutions that adapt and scale with your business growth.',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'A collaborative environment where innovation thrives.',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop'
  },
  {
    id: 'security',
    title: 'Security First',
    description: 'Enterprise-grade protection measures for your data.',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop'
  }
];

// Split cards into 3 columns
const column1Cards = insightCards.slice(0, 3);
const column2Cards = insightCards.slice(3, 6);
const column3Cards = insightCards.slice(6, 8);

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Technology': return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>;
    case 'Process': return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>;
    case 'Engineering': return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>;
    case 'Methodology': return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>;
    case 'Partnership': return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>;
    case 'Strategy': return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>;
    case 'Culture': return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>;
    case 'Security': return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>;
    default: return <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
  }
};

function ModernInsightCard({ card }: { card: InsightCard }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set spotlight coordinates
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    
    // 3D Tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg
    const rotateY = ((x - centerX) / centerX) * 8;
    
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
      className="group relative w-full rounded-[24px] bg-[#050505] border border-white/5 p-1 overflow-hidden cursor-pointer h-[260px] md:h-[280px] xl:h-[320px] shadow-2xl"
    >
      {/* Magic Glowing Border Layer */}
      <div className="magic-border" style={{ transition: 'opacity 0.3s' }}></div>

      {/* Internal Content Container */}
      <div className="relative z-10 h-full w-full rounded-[20px] bg-[#0a0a0c] overflow-hidden flex flex-col p-5 md:p-6 xl:p-8">
        
        {/* Subtle Dotted Grid Pattern (Only visible on hover spotlight) */}
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black, transparent)',
            WebkitMaskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black, transparent)'
          }}
        />

        {/* Spotlight Effect that follows cursor */}
        <div 
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(200, 240, 74, 0.05), transparent 40%)`
          }}
        />

        {/* Card Content - Top Aligned Icon */}
        <div className="relative z-20 flex flex-col h-full">
          {/* Top Section: Icon */}
          <div className="mb-auto">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-[#c8f04a]/10 border border-[#c8f04a]/20 flex items-center justify-center text-[#c8f04a] mb-4 xl:mb-6 group-hover:scale-110 group-hover:bg-[#c8f04a]/20 transition-all duration-500 shadow-[0_0_20px_rgba(200,240,74,0.1)]">
              {getCategoryIcon(card.category)}
            </div>
          </div>
          
          {/* Bottom Section: Typography */}
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="font-outfit font-bold text-lg md:text-xl xl:text-2xl text-white mb-2 xl:mb-3 group-hover:text-[#c8f04a] transition-colors duration-300 tracking-tight">
              {card.title}
            </h3>
            <p className="font-inter text-gray-400 text-xs xl:text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InsightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.to(column1Ref.current, {
        y: -150,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(column2Ref.current, {
        y: -50,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(column3Ref.current, {
        y: 100,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-[#050505] min-h-screen py-24 lg:py-32 overflow-hidden border-t border-white/5">
      
      {/* 3D Liquid Core Background - Full Width & Height */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ThreeCanvas />
      </div>
      
      {/* Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pointer-events-none">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          {/* Left Column - Linear-style Stark Typography */}
          <div ref={leftColumnRef} className="w-full xl:w-5/12 lg:w-1/2 flex flex-col justify-center relative min-h-[50vh] lg:min-h-0 pointer-events-auto">
            
            <div className="relative z-10 mt-auto mb-auto">
              {/* Tech Pill Badge */}
              <div className="flex items-center gap-3 mb-10 w-fit backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <div className="flex items-center justify-center w-3 h-3 rounded-full bg-[#c8f04a]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8f04a] animate-pulse"></div>
                </div>
                <span className="text-white/80 font-inter font-semibold tracking-[0.2em] uppercase text-xs">
                  Core Protocols // 01
                </span>
              </div>

              {/* Stark Kinetic Typography */}
              <h2 className="font-outfit font-black text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tighter mb-8 drop-shadow-2xl">
                The Core<br/>
                Foundation<br/>
                <span className="text-[#c8f04a] drop-shadow-[0_0_30px_rgba(200,240,74,0.3)]">
                  Of Excellence.
                </span>
              </h2>

              <p className="font-inter text-gray-400 text-lg md:text-xl max-w-md leading-relaxed border-l-2 border-[#c8f04a]/30 pl-5">
                We engineer liquid, adaptable solutions that form the absolute foundation of your digital future. No compromises, just execution.
              </p>
            </div>
          </div>

          {/* Right Side - 3 Column Stair Layout */}
          <div className="w-full xl:w-7/12 lg:w-1/2 pointer-events-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pt-10 lg:pt-32 pb-20">
              
              {/* Column 1 - Moves up fast */}
              <div ref={column1Ref} className="flex flex-col gap-4 md:gap-6 translate-y-20">
                {column1Cards.map((card) => (
                  <ModernInsightCard key={card.id} card={card} />
                ))}
              </div>

              {/* Column 2 - Moves up slow */}
              <div ref={column2Ref} className="flex flex-col gap-4 md:gap-6 -translate-y-10">
                {column2Cards.map((card) => (
                  <ModernInsightCard key={card.id} card={card} />
                ))}
              </div>

              {/* Column 3 - Moves down slightly */}
              <div ref={column3Ref} className="flex-col gap-4 md:gap-6 translate-y-10 hidden xl:flex">
                {column3Cards.map((card) => (
                  <ModernInsightCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
