"use client";

import React from "react";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function TestimonialsSection() {
  return (
    <section 
      id="testimonials"
      className="relative w-full max-w-full bg-white dark:bg-[#0C0D10] text-[#141414] dark:text-white py-24 sm:py-32 lg:py-36 overflow-x-clip select-none border-t border-b border-[#141414]/10 dark:border-white/[0.08] transition-colors duration-300"
    >
      {/* Background Subtle Paper Dot Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* ── Section Header (Axion Studio Standard - Theme Adaptive) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            {/* Numbered Pill Badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#141414] dark:bg-white text-white dark:text-gray-900 text-[11px] sm:text-[12px] font-bold flex items-center justify-center">
                5
              </div>
              <div className="text-[12px] sm:text-[13px] font-mono font-semibold tracking-wider border border-[#141414]/15 dark:border-white/15 rounded-full px-4 py-1 text-[#141414] dark:text-white/90 bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-md">
                CLIENT FEEDBACK &amp; RESULTS
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.04] tracking-[-0.03em] text-[#141414] dark:text-white">
              Trusted By Teams That Move Fast.<br className="hidden sm:block" />
              <span className="text-[#6D6A63] dark:text-white/40 font-normal"> What clients say about working with Hazsols.</span>
            </h2>
          </div>

          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#555555] dark:text-gray-400 max-w-md font-normal pb-1">
            Real feedback from founders, product managers, and engineering leaders who trusted us with their web, mobile, and custom software builds.
          </p>
        </div>

        {/* ── Stagger Testimonials Interactive Carousel ── */}
        <div className="w-full">
          <StaggerTestimonials />
        </div>

      </div>
    </section>
  );
}
