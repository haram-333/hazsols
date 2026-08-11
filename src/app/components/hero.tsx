"use client";

import { useState, useEffect } from 'react';
import GooeyCanvas from './GooeyCanvas';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .ambient-blob {
          /* Defined in globals.css, ensure it stays in background */
        }
      `}} />
      
      <section 
          className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-[#050505] text-white"
          onMouseMove={handleMouseMove}
          style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px`, isolation: 'isolate' } as React.CSSProperties}
      >
        {/* BACKGROUND BLOBS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Ambient Blob */}
            <div className="ambient-blob animate-slide-up-1"></div>
        </div>

        {/* CONTENT GRID */}
        <div className="relative w-full h-full max-w-[90rem] mx-auto px-6 pt-32 pb-12 flex flex-col justify-between">

            {/* MASSIVE TEXT CONTAINER (Isolated mix-blend-screen group) */}
            <div className="relative w-[100vw] left-1/2 -translate-x-1/2 mt-4 md:mt-8 flex-1 flex flex-col justify-center" style={{ mixBlendMode: 'screen', isolation: 'isolate' }}>
                
                {/* 1. Custom WebGL Canvas Layer (Bottom) - Full viewport width */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto bg-gradient-to-br from-[#c8f04a] to-emerald-600">
                    <GooeyCanvas imageSrc="/shery_bg_bright.png" />
                </div>

                {/* 2. Text Mask Layer (Top) - Full viewport width, but content is grid-aligned */}
                <div 
                    className="absolute inset-[-2px] w-[calc(100%+4px)] flex flex-col bg-black pointer-events-none md:pt-10"
                    style={{ mixBlendMode: 'multiply', zIndex: 50 }}
                >
                    {/* Subpixel bleed blockers to eliminate sharp green lines on mobile/tablet */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-black"></div>
                    <div className="absolute bottom-0 inset-x-0 h-2 bg-black"></div>
                    <div className="absolute left-0 inset-y-0 w-2 bg-black"></div>
                    <div className="absolute right-0 inset-y-0 w-2 bg-black"></div>

                    {/* Inner grid container to perfectly align with the rest of the page */}
                    <div className="relative w-full max-w-[90rem] px-6 mx-auto flex-1 flex flex-col items-start justify-center py-10 md:py-0 gap-2 md:gap-0">
                        <div className="w-full">
                            <h1 className="font-outfit font-black text-[15vw] md:text-[11.5vw] leading-[0.75] tracking-tighter whitespace-nowrap text-white [perspective:1000px] pr-2">
                                {"DIGITAL".split("").map((char, index) => (
                                    <span 
                                        key={index} 
                                        className="inline-block animate-modern-reveal"
                                        style={{ animationDelay: `${1.5 + index * 0.06}s` }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </h1>
                        </div>
                        <div className="w-full flex justify-end md:mt-[1vw]">
                            <h1 className="font-outfit font-black text-[15vw] md:text-[11.5vw] leading-[0.75] tracking-tighter whitespace-nowrap text-white [perspective:1000px] pr-2">
                                {"SOLUTIONS".split("").map((char, index) => (
                                    <span 
                                        key={index} 
                                        className="inline-block animate-modern-reveal"
                                        style={{ animationDelay: `${1.8 + index * 0.06}s` }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full relative z-30">
            
            {/* Left: Tagline */}
            <div className="md:col-span-4 lg:col-span-3 stagger-5">
                <p className="font-inter text-sm md:text-base leading-relaxed text-white/70">
                    We create digital designs and software systems that help brands move faster and convert better. Your business deserves more than just a website. It needs results.
                </p>
                <a href="/contact" className="inline-flex items-center justify-center mt-6 px-8 py-3 bg-[#c8f04a] text-black font-inter font-bold text-sm tracking-wider uppercase rounded-full hover:bg-white transition-colors">
                    <span className="kinetic-link" style={{ '--kinetic-color': 'black' } as React.CSSProperties}>
                        <span className="kinetic-text-wrapper" data-text="START A PROJECT">START A PROJECT</span>
                    </span>
                </a>
            </div>

            {/* Spacer */}
            <div className="hidden md:block md:col-span-4 lg:col-span-6"></div>

            {/* Right: Services List */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-start md:items-end gap-2 pb-2">
                <a href="/services/web" className="kinetic-link font-inter text-xs md:text-sm font-semibold uppercase tracking-[0.2em] stagger-5">
                    <span className="kinetic-text-wrapper" data-text="WEB DEVELOPMENT">WEB DEVELOPMENT</span>
                </a>
                <a href="/services/app" className="kinetic-link font-inter text-xs md:text-sm font-semibold uppercase tracking-[0.2em] stagger-6">
                    <span className="kinetic-text-wrapper" data-text="APP DEVELOPMENT">APP DEVELOPMENT</span>
                </a>
                <a href="/services/ai" className="kinetic-link font-inter text-xs md:text-sm font-semibold uppercase tracking-[0.2em] stagger-7">
                    <span className="kinetic-text-wrapper" data-text="AI INTEGRATION">AI INTEGRATION</span>
                </a>
                <a href="/services/custom-software" className="kinetic-link font-inter text-xs md:text-sm font-semibold uppercase tracking-[0.2em] stagger-8">
                    <span className="kinetic-text-wrapper" data-text="CUSTOM SOFTWARE">CUSTOM SOFTWARE</span>
                </a>
            </div>
            
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes modernReveal {
            0% {
                transform: translateY(120%) rotateX(-80deg) scale(0.8);
                opacity: 0;
                transform-origin: bottom center;
            }
            100% {
                transform: translateY(0) rotateX(0deg) scale(1);
                opacity: 1;
                transform-origin: bottom center;
            }
        }
        
        .animate-modern-reveal {
            animation: modernReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
            will-change: transform, opacity;
        }

        :global(.content-hidden) .animate-modern-reveal {
            animation-play-state: paused !important;
        }
      `}</style>
    </section>
    </>
  );
}
