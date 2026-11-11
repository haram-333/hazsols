"use client";

import React from "react";
import ServiceCards from "./service-cards";

export default function Expertise() {
  return (
    <section 
      id="expertise"
      className="relative w-full max-w-full bg-[#08080a] text-white py-24 sm:py-32 lg:py-36 overflow-x-clip select-none border-t border-b border-white/[0.08]"
    >
      {/* Background Radial Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Atmospheric Ambient Stage Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#c8f04a]/[0.02] blur-[140px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* ── Section Header (Axion Studio Standard) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-20">
          <div>
            {/* Numbered Pill Badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] sm:text-[12px] font-bold flex items-center justify-center">
                4
              </div>
              <div className="text-[12px] sm:text-[13px] font-mono font-semibold tracking-wider border border-white/10 rounded-full px-4 py-1 text-white/90 bg-white/[0.04] backdrop-blur-md">
                SERVICES &amp; CAPABILITIES
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.04] tracking-[-0.03em] text-white">
              Software built for your business.<br className="hidden sm:block" />
              <span className="text-white/40 font-normal"> Reliable, fast, and easy to use.</span>
            </h2>
          </div>

          <p className="text-[15px] sm:text-[16px] leading-relaxed text-gray-400 max-w-md font-normal pb-1">
            We design, build, and support websites, mobile apps, and custom software systems that help businesses run smoothly and grow.
          </p>
        </div>

        {/* ── True Bento Grid Component ── */}
        <ServiceCards />

      </div>
    </section>
  );
}
