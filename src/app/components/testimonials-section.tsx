"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    quote: "Hazsols built our platform from scratch in under 3 months. The code quality was exceptional — we've had zero critical bugs in production.",
    name: "Ahmed Raza",
    title: "Founder",
    company: "LogiTrack",
    avatar: null,
    initials: "AR",
  },
  {
    quote: "They didn't just build what we asked for — they pushed back on ideas that wouldn't have worked and suggested better ones. That's the kind of partner you want.",
    name: "Sarah Mitchell",
    title: "Product Lead",
    company: "Vanta Health",
    avatar: null,
    initials: "SM",
  },
  {
    quote: "The mobile app shipped on time, looked premium, and performed smoothly on every device we tested. Highly technical team.",
    name: "Omar Tariq",
    title: "CEO",
    company: "ShipEasy",
    avatar: null,
    initials: "OT",
  },
];

export default function TestimonialsSection() {
  const swiperRef  = useRef<HTMLDivElement>(null);
  const prevRef    = useRef<HTMLButtonElement>(null);
  const nextRef    = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      try {
        const [gsapMod, stMod, swiperMod, swiperModules] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("swiper"),
          import("swiper/modules"),
        ]);

        const gsap = gsapMod.default;
        const { ScrollTrigger } = stMod;
        const { Swiper } = swiperMod;
        const { Navigation, Pagination, A11y } = swiperModules;

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const header = sectionRef.current?.querySelector(".testimonials-new__header");
          if (header) {
            gsap.fromTo(header,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
              }
            );
          }
        }, sectionRef);

        if (swiperRef.current) {
          const paginationEl = swiperRef.current.querySelector(".swiper-pagination") as HTMLElement | null;
          new Swiper(swiperRef.current, {
            modules: [Navigation, Pagination, A11y],
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            a11y: { enabled: true },
            navigation: {
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            },
            pagination: paginationEl
              ? { el: paginationEl, clickable: true }
              : false,
            breakpoints: {
              768: { slidesPerView: 1 },
            },
          });
        }
      } catch (err) {
        console.warn("Testimonials init failed:", err);
      }
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="testimonials-new section"
      id="testimonials"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="section-overlay section-overlay--solid" aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div className="testimonials-new__header" style={{ opacity: 0, marginBottom: 48 }}>
          <div className="section-eyebrow">
            <div className="section-eyebrow__line" />
            <span className="label-accent">Client Words</span>
          </div>
          <h2 className="section-title--lg" style={{ marginTop: 16 }}>TESTIMONIALS</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>Swiper.js slider</p>
        </div>

        {/* Quote mark */}
        <div className="testimonials-quote-mark" aria-hidden="true">&ldquo;</div>

        {/* Swiper */}
        <div ref={swiperRef} className="swiper testimonials-swiper">
          <div className="swiper-wrapper">
            {TESTIMONIALS.map((t, i) => (
              <div className="swiper-slide" key={i}>
                <div className="testimonial-new-card">
                  <blockquote className="testimonial-new-card__quote">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="testimonial-new-card__author">
                    <div className="testimonial-new-card__avatar">
                      {t.avatar ? (
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={44}
                          height={44}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                        />
                      ) : (
                        <div className="testimonial-new-card__initials">{t.initials}</div>
                      )}
                    </div>
                    <div>
                      <span className="testimonial-new-card__name">{t.name}</span>
                      <span className="testimonial-new-card__company">{t.title}, {t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" />
        </div>

        {/* Nav */}
        <div className="testimonials-new__nav" aria-label="Testimonial navigation">
          <button ref={prevRef} className="swiper-btn-new" id="testimonials-prev" aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button ref={nextRef} className="swiper-btn-new" id="testimonials-next" aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
