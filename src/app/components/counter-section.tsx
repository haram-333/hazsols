"use client";

import { useEffect, useRef, useState } from 'react';

interface CounterItem {
  id: string;
  number: string;
  label: string;
  suffix: string;
}

const counterData: CounterItem[] = [
  {
    id: 'deployments',
    number: '500',
    label: 'ENTERPRISE DEPLOYMENTS',
    suffix: '+'
  },
  {
    id: 'code',
    number: '15',
    label: 'MILLION LINES OF CODE',
    suffix: 'M+'
  },
  {
    id: 'success',
    number: '100',
    label: 'PROJECT SUCCESS RATE',
    suffix: '%'
  },
  {
    id: 'partners',
    number: '50',
    label: 'GLOBAL PARTNERS',
    suffix: '+'
  }
];

const SplitWords = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(' ').map((word, i, arr) => (
        <span key={i} className="inline-block">
          <span className="gsap-reveal-wrapper inline-block overflow-hidden pb-[0.1em] align-bottom pt-1">
            <span className="gsap-reveal inline-block opacity-0 translate-y-[110%]">
              {word}
            </span>
          </span>
          {i < arr.length - 1 && <span className="inline-block w-[0.25em]">&nbsp;</span>}
        </span>
      ))}
    </>
  );
};

const InlineCounter = ({ data, targetLength }: { data: any, targetLength: number }) => {
  return (
    <span className="inline-block align-middle mx-2 md:mx-3">
      <span className="gsap-reveal-wrapper inline-block overflow-hidden pb-[0.1em] pt-1">
        <span className="gsap-reveal inline-block opacity-0 translate-y-[110%]">
          <span className="inline-flex items-baseline justify-center px-4 md:px-5 py-2 bg-[#050505] border border-white/10 rounded-2xl group hover:border-[#c8f04a]/50 hover:bg-[#c8f04a]/5 transition-all duration-300 cursor-default transform hover:scale-105 hover:-translate-y-1 shadow-2xl relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c8f04a]/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out"></span>
            <span 
              className="font-mono font-bold text-[#c8f04a] text-3xl md:text-5xl lg:text-7xl tracking-tighter drop-shadow-[0_0_15px_rgba(200,240,74,0.3)] tabular-nums inline-block text-right"
              style={{ minWidth: `${targetLength}ch` }}
            >
              {data.currentNumber}
            </span>
            <span className="font-mono font-bold text-[#c8f04a] text-2xl md:text-4xl lg:text-6xl ml-1 drop-shadow-[0_0_15px_rgba(200,240,74,0.3)]">
              {data.suffix}
            </span>
          </span>
        </span>
      </span>
    </span>
  );
};

export default function CounterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(counterData.map(item => ({ ...item, currentNumber: 0 })));
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      startCounters();
      
      let ctx: any;
      import("gsap").then((gsapMod) => {
        const gsap = gsapMod.default;
        
        ctx = gsap.context(() => {
          const tl = gsap.timeline();
          
          if (eyebrowRef.current) {
            tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" });
          }
          
          const reveals = sectionRef.current?.querySelectorAll('.gsap-reveal');
          if (reveals && reveals.length > 0) {
            tl.fromTo(reveals, 
              { y: "110%", opacity: 0 },
              {
                y: "0%",
                opacity: 1,
                duration: 0.9,
                stagger: 0.025,
                ease: "power4.out",
                onComplete: () => {
                  const wrappers = sectionRef.current?.querySelectorAll('.gsap-reveal-wrapper');
                  wrappers?.forEach(w => w.classList.remove('overflow-hidden'));
                }
              }, 
              "-=0.4"
            );
          }
          
          if (btnRef.current) {
            tl.to(btnRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }, "-=0.4");
          }
        }, sectionRef);
      });

      return () => {
        if (ctx) ctx.revert();
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const startCounters = () => {
    counterData.forEach((item, index) => {
      const targetNumber = parseInt(item.number);
      const duration = 2000; // 2 seconds
      const increment = targetNumber / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          current = targetNumber;
          clearInterval(timer);
        }

        setCounters(prev => prev.map((counter, i) => 
          i === index ? { ...counter, currentNumber: Math.floor(current) } : counter
        ));
      }, 16);
    });
  };

  return (
    <div ref={sectionRef} className="relative w-full bg-[#020202] py-32 lg:py-48 overflow-hidden border-t border-white/5">
      
      {/* Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center">
        
        {/* Tech Pill Badge */}
        <div 
          ref={eyebrowRef}
          className="flex items-center gap-3 mb-16 w-fit backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.03)] opacity-0 translate-y-5"
        >
          <div className="flex items-center justify-center w-3 h-3 rounded-full bg-[#c8f04a]/20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c8f04a] animate-pulse"></div>
          </div>
          <span className="text-white/80 font-inter font-semibold tracking-[0.25em] uppercase text-xs">
            Global Metrics // 02
          </span>
        </div>

        {/* Massive Inline Typography Block */}
        <div className="text-center md:text-left max-w-[1300px] leading-[1.5] md:leading-[1.6] font-outfit font-medium text-3xl md:text-5xl lg:text-[60px] text-white/80 tracking-tight selection:bg-[#c8f04a]/30">
          <SplitWords text="Hazsols has engineered over" />
          <InlineCounter data={counters[0]} targetLength={counterData[0].number.length} /> 
          <SplitWords text="enterprise deployments, writing more than" />
          <InlineCounter data={counters[1]} targetLength={counterData[1].number.length} /> 
          <SplitWords text="lines of code with a perfect" />
          <InlineCounter data={counters[2]} targetLength={counterData[2].number.length} /> 
          <SplitWords text="success rate across" />
          <InlineCounter data={counters[3]} targetLength={counterData[3].number.length} /> 
          <SplitWords text="global partners." />
        </div>

        {/* Centered Premium Button */}
        <div ref={btnRef} className="mt-24 opacity-0 translate-y-5">
          <a href="/contact" className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#c8f04a] text-black font-inter font-bold uppercase tracking-[0.2em] text-sm rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(200,240,74,0.4)]">
            <span className="relative z-10">Discuss Your Project</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-white/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12"></div>
          </a>
        </div>

      </div>
    </div>
  );
}
