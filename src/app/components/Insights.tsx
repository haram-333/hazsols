"use client";

import { useEffect, useRef, useState } from 'react';

const processNodes = [
  {
    id: "01",
    title: "Strategic Discovery",
    description: "We don't just write code. We analyze your business architecture to identify constraints, map out user journeys, and define a battle-tested technical roadmap before a single line is written.",
    icon: (
      <svg className="w-8 h-8 text-[#c8f04a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: "02",
    title: "Agile Engineering",
    description: "Our core engineering protocols emphasize extreme velocity and absolute precision. We deploy daily, iterate rapidly, and maintain an impeccable success rate across all enterprise deployments.",
    icon: (
      <svg className="w-8 h-8 text-[#c8f04a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: "03",
    title: "Continuous Deployment",
    description: "Ship faster with zero downtime. Our automated CI/CD pipelines ensure that every piece of code is rigorously tested, secured, and instantly deployed to your global infrastructure.",
    icon: (
      <svg className="w-8 h-8 text-[#c8f04a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: "04",
    title: "Hyper-Scale Infrastructure",
    description: "Built for millions. We construct scalable, elastic, and virtually impenetrable cloud architectures that grow autonomously alongside your accelerating business demands.",
    icon: (
      <svg className="w-8 h-8 text-[#c8f04a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
];

const ProcessNode = ({ node }: { node: typeof processNodes[0] }) => {
  return (
    <div className="card-node relative lg:absolute inset-0 w-full lg:h-full flex flex-col justify-center opacity-0 translate-y-16">
      <div className="group relative w-full lg:h-[550px] p-8 md:p-10 lg:p-14 bg-[#050505] border border-white/5 rounded-3xl lg:rounded-[2.5rem] overflow-hidden flex flex-col justify-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c8f04a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Top Row */}
        <div className="flex justify-between items-start mb-8 lg:mb-auto relative z-10">
          <div className="flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/5 border border-white/10 group-hover:border-[#c8f04a]/50 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(200,240,74,0)] group-hover:shadow-[0_0_20px_rgba(200,240,74,0.15)]">
            {node.icon}
          </div>
          <span className="font-mono text-white/10 text-5xl lg:text-6xl font-bold tracking-tighter group-hover:text-[#c8f04a]/20 transition-colors duration-500">
            {node.id}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 lg:mt-12">
          <h3 className="font-outfit text-2xl md:text-3xl lg:text-5xl text-white font-medium mb-4 lg:mb-6 group-hover:text-[#c8f04a] transition-colors duration-500">
            {node.title}
          </h3>
          <p className="font-inter text-white/60 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg">
            {node.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Insights() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    if (typeof window !== 'undefined') {
      import("gsap").then((gsapMod) => {
        import("gsap/ScrollTrigger").then((stMod) => {
          const gsap = gsapMod.default;
          const ScrollTrigger = stMod.ScrollTrigger;
          gsap.registerPlugin(ScrollTrigger);

          ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.card-node');
            const mm = gsap.matchMedia();

            // Desktop: Stacked Pinned Reveal
            mm.add("(min-width: 1024px)", () => {
              gsap.set(cards, { opacity: 0, y: 50 });
              gsap.set(cards[0], { opacity: 1, y: 0 }); // Show first card instantly

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1,
                }
              });

              tl.to(cards[0], { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" }, "+=0.5");
              tl.to(cards[1], { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }, "<");
              
              tl.to(cards[1], { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" }, "+=0.5");
              tl.to(cards[2], { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }, "<");
              
              tl.to(cards[2], { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" }, "+=0.5");
              tl.to(cards[3], { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }, "<");
              
              tl.to({}, { duration: 0.5 });
            });

            // Mobile/Tablet: Standard Flowing List
            mm.add("(max-width: 1023px)", () => {
              gsap.set(cards, { opacity: 0, y: 30 });
              
              cards.forEach((card: any) => {
                gsap.to(card, {
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // Trigger when card comes into view
                  },
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out"
                });
              });
            });

          }, sectionRef);
        });
      });
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full lg:h-[400vh] bg-[#020202]">
      {/* CSS Sticky perfectly replaces GSAP Pinning for Desktop. Normal flow on Mobile. */}
      <div className="lg:sticky top-0 lg:h-screen w-full lg:overflow-hidden flex items-center justify-center border-t border-white/5 py-24 lg:py-0">
        
        {/* Background Mesh Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#c8f04a]/[0.02] blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#c8f04a]/[0.02] blur-[120px] rounded-full"></div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 pt-0 lg:pt-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 lg:items-center">
            
            {/* Left Column: Fixed Typography */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              {/* Tech Pill */}
              <div className="flex items-center gap-3 mb-6 lg:mb-8 w-fit backdrop-blur-md bg-white/5 border border-white/10 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.03)]">
                <div className="flex items-center justify-center w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#c8f04a]/20">
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[#c8f04a] animate-pulse"></div>
                </div>
                <span className="text-white/80 font-inter font-semibold tracking-[0.2em] lg:tracking-[0.25em] uppercase text-[10px] lg:text-xs">
                  Core Engineering // 03
                </span>
              </div>

              <h2 className="font-outfit font-medium text-4xl md:text-5xl lg:text-[72px] text-white tracking-tight leading-[1.1] mb-6 lg:mb-8">
                Innovation through <br />
                <span className="text-[#c8f04a] drop-shadow-[0_0_15px_rgba(200,240,74,0.2)]">structure.</span>
              </h2>
              
              <p className="font-inter text-white/70 text-base md:text-lg lg:text-xl leading-relaxed max-w-md mb-8 lg:mb-12">
                We believe in the absolute power of collaboration. It is the structured engine that drives true innovation and delivers world-class results for our partners.
              </p>

              {/* Kinetic Button */}
              <a href="/about" className="group relative w-fit inline-flex items-center justify-center gap-3 lg:gap-4 px-8 lg:px-10 py-4 lg:py-5 bg-transparent border border-[#c8f04a] text-[#c8f04a] font-inter font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] text-xs lg:text-sm rounded-full overflow-hidden transition-all hover:bg-[#c8f04a] hover:text-black hover:shadow-[0_0_40px_rgba(200,240,74,0.3)]">
                <span className="relative z-10">Discover Our Process</span>
                <svg className="w-4 h-4 lg:w-5 lg:h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="absolute inset-0 bg-[#c8f04a]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12"></div>
              </a>
            </div>

            {/* Right Column: Stacked Scrolling Cards */}
            <div className="w-full lg:w-7/12 relative flex flex-col lg:block gap-6 lg:gap-0 lg:h-[550px] mt-12 lg:mt-0">
              {processNodes.map((node) => (
                <ProcessNode key={node.id} node={node} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
