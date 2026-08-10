"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    num: "01",
    name: "Web Development",
    tagline: "Scale without limits.",
    body: "Fast, scalable web products that convert visitors into customers — built on modern architecture that won't break under pressure.",
    href: "/services/web",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    num: "02",
    name: "Mobile Apps",
    tagline: "Future-proofed architecture.",
    body: "Native and cross-platform apps that users actually want to open — designed for performance, not just feature lists.",
    href: "/services/app",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    num: "03",
    name: "AI Solutions",
    tagline: "Rapid deployment.",
    body: "Automation and intelligence built into your core product — not bolted on. Cutting-edge solutions and rapid deployment.",
    href: "/services/ai",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    num: "04",
    name: "Custom Software",
    tagline: "Data-driven innovation.",
    body: "Bespoke systems built for your exact workflow. Future-driven innovation top-lining extra time, artifacts, and incredible results.",
    href: "/services/custom-software",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
          const cards = sectionRef.current?.querySelectorAll(".service-card");
          if (cards?.length) {
            gsap.fromTo(
              Array.from(cards),
              { opacity: 0, y: 40 },
              {
                opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
              }
            );
          }
        }, sectionRef);
      } catch (err) {
        console.warn("Services animation failed:", err);
      }
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="services-new section" ref={sectionRef} id="services" style={{ position: "relative", zIndex: 1 }}>
      {/* Dark overlay so section reads on top of canvas */}
      <div className="section-overlay" aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header" style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <div className="section-eyebrow__line" />
            <span className="label-accent">What We Do</span>
            <div className="section-eyebrow__line" />
          </div>
          <h2 className="section-title--lg" style={{ marginTop: 16 }}>
            BUILT TO PERFORM.<br />DESIGNED TO LAST.
          </h2>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Link
              href={s.href}
              key={s.num}
              className={`service-card${i === 2 ? " service-card--active" : ""}`}
              id={`service-card-${s.num}`}
              style={{ opacity: 0 }}
            >
              <div className="service-card__icon" aria-hidden="true">
                {s.icon}
              </div>
              <div className="service-card__num">{s.num}</div>
              <h3 className="service-card__name">{s.name}</h3>
              <p className="service-card__tagline">{s.tagline}</p>
              <p className="service-card__body">{s.body}</p>
              <div className="service-card__arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
