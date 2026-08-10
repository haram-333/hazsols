"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { num: 500,  suffix: "+",   label: "PROJECTS SHIPPED" },
  { num: 98,   suffix: "%",   label: "CLIENT RETENTION" },
  { num: 50,   suffix: "M+",  label: "USERS IMPACTED" },
  { num: 10,   suffix: "+",   label: "YEARS INNOVATING" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const triggered  = useRef(false);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      try {
        const [gsapMod, stMod, countupMod] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("countup.js"),
        ]);
        const gsap = gsapMod.default;
        const { ScrollTrigger } = stMod;
        const { CountUp } = countupMod;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const items = sectionRef.current
            ? Array.from(sectionRef.current.querySelectorAll(".stat-new"))
            : [];

          if (items.length) {
            gsap.fromTo(
              items,
              { opacity: 0, y: 32 },
              {
                opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 75%",
                  onEnter: () => {
                    if (triggered.current) return;
                    triggered.current = true;
                    numRefs.current.forEach((el, i) => {
                      if (!el) return;
                      const cu = new CountUp(el, STATS[i].num, {
                        duration: 2.5,
                        easingFn: (t: number, b: number, c: number, d: number) => {
                          const n = t / d;
                          return -c * n * (n - 2) + b;
                        },
                      });
                      cu.start();
                    });
                  },
                },
              }
            );
          }
        }, sectionRef);
      } catch (err) {
        console.warn("Stats animation failed:", err);
      }
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      className="stats-new section"
      ref={sectionRef}
      id="stats"
      aria-label="Key stats"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="section-overlay" aria-hidden="true" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div className="stat-new" key={i} style={{ opacity: 0 }}>
              <div className="stat-new__num">
                <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
                <span className="stat-new__suffix">{stat.suffix}</span>
              </div>
              <p className="stat-new__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
