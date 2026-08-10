"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const actionsRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [gsapMod, stMod, splittingMod, sheryMod] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("splitting"),
          import("sheryjs"),
        ]);

        const gsap = gsapMod.default;
        const { ScrollTrigger } = stMod;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Splitting = (splittingMod as any).default ?? splittingMod;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Shery = (sheryMod as any).default ?? sheryMod;

        gsap.registerPlugin(ScrollTrigger);

        if (!headlineRef.current || !preloaderRef.current) return;

        // Splitting
        Splitting({ target: headlineRef.current, by: "chars" });
        const chars = headlineRef.current.querySelectorAll(".char");
        const words = headlineRef.current.querySelectorAll<HTMLElement>(".word");
        words.forEach((w) => {
          w.style.overflow = "hidden";
          w.style.display = "inline-block";
          w.style.paddingBottom = "0.05em";
        });

        // Loader bar progress (fake), then reveal
        gsap.to(loaderBarRef.current, {
          width: "100%",
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.to(preloaderRef.current, {
              yPercent: -100,
              duration: 1.0,
              ease: "expo.inOut",
            });

            if (eyebrowRef.current) {
              tl.fromTo(eyebrowRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.5"
              );
            }

            if (chars.length) {
              tl.fromTo(chars,
                { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.9, stagger: 0.018 },
                "-=0.4"
              );
            }

            if (subRef.current) {
              tl.fromTo(subRef.current,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.4"
              );
            }

            if (actionsRef.current) {
              tl.fromTo(actionsRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.4"
              );
            }
          },
        });

        // Shery
        setTimeout(() => {
          try {
            Shery.mouseFollower({
              skew: true,
              ease: "cubic-bezier(0.23, 1, 0.320, 1)",
              duration: 1,
            });
            Shery.makeMagnet(".magnetic-btn", {
              ease: "cubic-bezier(0.23, 1, 0.320, 1)",
              duration: 1,
            });
          } catch (e) {
            console.warn("Shery init failed", e);
          }
        }, 1800);

      } catch (err) {
        if (preloaderRef.current) preloaderRef.current.style.display = "none";
        [headlineRef, subRef, actionsRef, eyebrowRef].forEach((r) => {
          if (r.current) r.current.style.opacity = "1";
        });
        console.warn("Hero init failed:", err);
      }
    };
    init();
  }, []);

  return (
    <>
      {/* Preloader */}
      <div ref={preloaderRef} className="preloader">
        <div className="preloader__inner">
          <span className="preloader__label">HAZSOLS</span>
          <div className="preloader__track">
            <div ref={loaderBarRef} className="preloader__bar" />
          </div>
          <span className="preloader__sub">Loading experience...</span>
        </div>
      </div>

      {/* Hero — transparent background so canvas shows through */}
      <section
        className="hero"
        id="hero"
        aria-label="Hero"
        style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        {/* Gradient overlay so text stays readable over canvas */}
        <div className="hero__overlay" aria-hidden="true" />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 120, paddingBottom: 120 }}>
          <div ref={eyebrowRef} className="hero__eyebrow" style={{ opacity: 0, marginBottom: 32 }}>
            <span className="tag">Software Agency · Lahore, Pakistan</span>
          </div>

          <h1
            ref={headlineRef}
            className="hero__headline"
            aria-label="We build software that moves fast."
          >
            WE BUILD SOFTWARE<br />THAT MOVES FAST.
          </h1>

          <p ref={subRef} className="hero__sub" style={{ opacity: 0 }}>
            Redefining digital velocity with cutting-edge solutions<br />
            and rapid deployment from Lahore to everywhere.
          </p>

          <div ref={actionsRef} className="hero__actions" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn btn--accent magnetic-btn" id="hero-cta-btn">
              Accelerate Your Future
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero__scroll-cue" aria-hidden="true">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}
