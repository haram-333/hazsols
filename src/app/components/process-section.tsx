"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    body: "We sit with you, ask hard questions, and map every edge case before a line of code is written. No assumptions, no guesswork.",
  },
  {
    num: "02",
    title: "Strategy & Design",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    body: "Wireframes and UI validated with real feedback. We design for how people actually use things — not for award show screenshots.",
  },
  {
    num: "03",
    title: "Development & Testing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    body: "Clean architecture, typed code, CI/CD from day one. Shipping fast without cutting corners is a discipline, not an accident.",
  },
  {
    num: "04",
    title: "Launch & Scale",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
      </svg>
    ),
    body: "Deployment, monitoring, handoff — done right. We stay on after launch to make sure the product performs the way we promised.",
  },
];

export default function ProcessSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const pinWrapRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      try {
        const [gsapMod, stMod] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        const gsap = gsapMod.default;
        const { ScrollTrigger } = stMod;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const header = sectionRef.current?.querySelector(".process__header");
          if (header) {
            gsap.fromTo(header,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
              }
            );
          }
        }, sectionRef);
      } catch (err) {
        console.warn("Process animation failed:", err);
      }
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="process-new section" ref={sectionRef} id="process" style={{ position: "relative", zIndex: 1 }}>
      <div className="section-overlay" aria-hidden="true" />

      {/* Header (outside pin so it scrolls in before pinning) */}
      <div className="container process__header" style={{ position: "relative", zIndex: 2, marginBottom: 48 }}>
        <div className="section-eyebrow">
          <div className="section-eyebrow__line" />
          <span className="label-accent">How We Do It</span>
        </div>
        <h2 className="section-title--lg" style={{ marginTop: 16 }}>
          OUR PROCESS: FROM<br />DISCOVERY TO LAUNCH.
        </h2>
      </div>

      {/* Pinned horizontal scroll container */}
      <div ref={pinWrapRef} style={{ overflow: "hidden", position: "relative", zIndex: 2 }}>
        <div ref={trackRef} className="process-track">
          {STEPS.map((step, i) => (
            <div key={step.num} className={`process-card${i === 0 ? " process-card--active" : ""}`}>
              <div className="process-card__top">
                <span className="process-card__num">{step.num}.</span>
                <div className="process-card__icon">{step.icon}</div>
              </div>
              <h3 className="process-card__title">{step.title}</h3>
              <div className="process-card__divider" />
              <p className="process-card__body">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="process-progress-track">
            <div ref={progressRef} className="process-progress-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
