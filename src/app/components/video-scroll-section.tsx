"use client";

import { useEffect, useRef, useState } from 'react';

const processNodes = [
  {
    id: "01",
    title: "Strategic Discovery",
    description: "We don't just write code. We analyze your business architecture to identify constraints, map out user journeys, and define a battle-tested technical roadmap before a single line is written.",
    icon: (
      <svg className="w-6 h-6 text-[#c8f04a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: "02",
    title: "Agile Engineering",
    description: "Our core engineering protocols emphasize extreme velocity and absolute precision. We deploy daily, iterate rapidly, and maintain an impeccable success rate across all enterprise deployments.",
    icon: (
      <svg className="w-6 h-6 text-[#c8f04a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: "03",
    title: "Continuous Deployment",
    description: "Ship faster with zero downtime. Our automated CI/CD pipelines ensure that every piece of code is rigorously tested, secured, and instantly deployed to your global infrastructure.",
    icon: (
      <svg className="w-6 h-6 text-[#c8f04a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: "04",
    title: "Hyper-Scale Infrastructure",
    description: "Built for millions. We construct scalable, elastic, and virtually impenetrable cloud architectures that grow autonomously alongside your accelerating business demands.",
    icon: (
      <svg className="w-6 h-6 text-[#c8f04a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
];

const ProcessNode = ({ node, index }: { node: typeof processNodes[0], index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={nodeRef}
      className={`group relative p-8 md:p-12 bg-[#050505] border border-white/5 rounded-3xl overflow-hidden transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      } hover:border-[#c8f04a]/30 hover:bg-[#c8f04a]/5`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#c8f04a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Top Row */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 group-hover:border-[#c8f04a]/50 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(200,240,74,0)] group-hover:shadow-[0_0_20px_rgba(200,240,74,0.15)]">
          {node.icon}
        </div>
        <span className="font-mono text-white/20 text-4xl font-bold tracking-tighter group-hover:text-[#c8f04a]/40 transition-colors duration-500">
          {node.id}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-outfit text-2xl md:text-3xl text-white font-medium mb-4 group-hover:text-[#c8f04a] transition-colors duration-500">
          {node.title}
        </h3>
        <p className="font-inter text-white/60 text-base md:text-lg leading-relaxed">
          {node.description}
        </p>
      </div>
    </div>
  );
};

export default function VideoScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#020202] py-24 md:py-32 lg:py-48 border-t border-white/5 overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#c8f04a]/[0.02] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#c8f04a]/[0.02] blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Sticky Typography */}
          <div className="w-full lg:w-5/12">
            <div 
              ref={headerRef}
              className={`lg:sticky lg:top-32 transition-all duration-1000 ease-out transform ${
                isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Tech Pill */}
              <div className="flex items-center gap-3 mb-8 w-fit backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.03)]">
                <div className="flex items-center justify-center w-3 h-3 rounded-full bg-[#c8f04a]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8f04a] animate-pulse"></div>
                </div>
                <span className="text-white/80 font-inter font-semibold tracking-[0.25em] uppercase text-xs">
                  Core Engineering // 03
                </span>
              </div>

              <h2 className="font-outfit font-medium text-5xl md:text-6xl lg:text-[72px] text-white tracking-tight leading-[1.1] mb-8">
                Innovation through <br />
                <span className="text-[#c8f04a] drop-shadow-[0_0_15px_rgba(200,240,74,0.2)]">structure.</span>
              </h2>
              
              <p className="font-inter text-white/70 text-lg md:text-xl leading-relaxed max-w-md mb-12">
                We believe in the absolute power of collaboration. It is the structured engine that drives true innovation and delivers world-class results for our partners.
              </p>

              {/* Kinetic Button */}
              <a href="/about" className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-transparent border border-[#c8f04a] text-[#c8f04a] font-inter font-bold uppercase tracking-[0.2em] text-sm rounded-full overflow-hidden transition-all hover:bg-[#c8f04a] hover:text-black hover:shadow-[0_0_40px_rgba(200,240,74,0.3)]">
                <span className="relative z-10">Discover Our Process</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="absolute inset-0 bg-[#c8f04a]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12"></div>
              </a>
            </div>
          </div>

          {/* Right Column: Scrolling Process Nodes */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6 md:gap-8 lg:pt-[10vh]">
            {processNodes.map((node, i) => (
              <ProcessNode key={node.id} node={node} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
