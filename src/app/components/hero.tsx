"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  // Live Real-Time Updating State for Coded Stat Cards
  const [profitValue, setProfitValue] = useState(34718);
  const [leadGrowth, setLeadGrowth] = useState(39);
  const [bars, setBars] = useState([62, 74, 34, 63]);

  // Real-time stat updater: updates metrics gently every 2.6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProfitValue((prev) => prev + (Math.floor(Math.random() * 25) - 10));
      setLeadGrowth((prev) => {
        const next = prev + (Math.random() > 0.6 ? 1 : 0);
        return next > 45 ? 35 : next;
      });
      setBars([
        58 + Math.floor(Math.random() * 8),
        70 + Math.floor(Math.random() * 8),
        32 + Math.floor(Math.random() * 6),
        60 + Math.floor(Math.random() * 8),
      ]);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  // 6 Live Coded Cards with Responsive Proportions, Tall Heights & Prominent Box Shadows
  const cards = [
    // Card 1: Conversion Rate with Chevron Button & 4 Yellow Capsule Bars Crossing Dashed Line
    {
      id: "conversion",
      content: (
        <div className="w-[260px] sm:w-[280px] md:w-[290px] h-[260px] sm:h-[280px] md:h-[285px] p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] bg-white shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12),0_8px_20px_-6px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col justify-between shrink-0">
          {/* Top Row: Title + Circular Chevron Button */}
          <div className="flex items-start justify-between">
            <div className="font-outfit font-semibold text-sm sm:text-base text-[#111827] leading-tight">
              <div>Conversion</div>
              <div>Rate</div>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center text-xs sm:text-sm font-semibold shadow-inner hover:bg-gray-200 transition-colors">
              ›
            </div>
          </div>

          {/* Chart Area with Dashed Centerline and 4 Yellow Capsule Bars */}
          <div className="relative w-full h-28 sm:h-32 flex items-center justify-between px-2 sm:px-3 my-auto">
            {/* Dashed Horizontal Line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b border-dashed border-[#E5E7EB] z-0" />

            {/* 4 Yellow Pills with Percentages inside */}
            <div className="relative z-10 w-full flex items-center justify-between">
              {/* Bar 1 */}
              <div 
                className="w-8 sm:w-9 rounded-full bg-[#FDE047] flex items-center justify-center text-[10px] sm:text-xs font-bold text-[#713F12] transition-all duration-700 shadow-sm"
                style={{ height: `${bars[0] * 1.25}px`, transform: "translateY(4px)" }}
              >
                {bars[0]}%
              </div>
              {/* Bar 2 */}
              <div 
                className="w-8 sm:w-9 rounded-full bg-[#FACC15] flex items-center justify-center text-[10px] sm:text-xs font-bold text-[#713F12] transition-all duration-700 shadow-sm"
                style={{ height: `${bars[1] * 1.25}px`, transform: "translateY(-8px)" }}
              >
                {bars[1]}%
              </div>
              {/* Bar 3 */}
              <div 
                className="w-8 sm:w-9 rounded-full bg-[#FDE047] flex items-center justify-center text-[10px] sm:text-xs font-bold text-[#713F12] transition-all duration-700 shadow-sm"
                style={{ height: `${bars[2] * 1.25}px`, transform: "translateY(16px)" }}
              >
                {bars[2]}%
              </div>
              {/* Bar 4 */}
              <div 
                className="w-8 sm:w-9 rounded-full bg-[#FACC15] flex items-center justify-center text-[10px] sm:text-xs font-bold text-[#713F12] transition-all duration-700 shadow-sm"
                style={{ height: `${bars[3] * 1.25}px`, transform: "translateY(-4px)" }}
              >
                {bars[3]}%
              </div>
            </div>
          </div>

          <div className="h-1" />
        </div>
      ),
    },

    // Card 2: Market Donut (Compact Floating Square)
    {
      id: "market-donut",
      content: (
        <div className="w-[200px] sm:w-[220px] md:w-[230px] h-[215px] sm:h-[230px] md:h-[235px] p-4 sm:p-5 rounded-[28px] sm:rounded-[32px] bg-white shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12),0_8px_20px_-6px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col justify-center items-center shrink-0 relative self-center">
          {/* Donut Chart */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            <svg className="w-28 h-28 sm:w-32 sm:h-32 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="transparent"
                stroke="#E2E8F0"
                strokeWidth="5.5"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="transparent"
                stroke="#60A5FA"
                strokeWidth="5.5"
                strokeDasharray="65 100"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute font-outfit font-bold text-xs sm:text-sm text-[#64748B]">91</span>
          </div>

          {/* Floating Pill Badge on bottom-left */}
          <div className="absolute -bottom-2 -left-2 bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.09)] border border-black/[0.04] px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 z-10">
            <span className="w-2.5 h-2.5 rounded-[4px] bg-[#60A5FA]" />
            <span className="font-outfit font-bold text-[11px] sm:text-xs text-[#1E293B]">65%</span>
          </div>
        </div>
      ),
    },

    // Card 3: Processed Leads with Teal Arc Gauge
    {
      id: "processed-leads",
      content: (
        <div className="w-[260px] sm:w-[280px] md:w-[290px] h-[260px] sm:h-[280px] md:h-[285px] p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] bg-white shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12),0_8px_20px_-6px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col justify-between shrink-0">
          <div className="font-outfit font-semibold text-sm sm:text-base text-[#111827] leading-tight">
            <div>Processed</div>
            <div>Leads</div>
          </div>

          <div className="flex items-center justify-center py-2 my-auto">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
              <svg className="w-32 h-32 sm:w-36 sm:h-36 -rotate-90" viewBox="0 0 42 42">
                <circle
                  cx="21"
                  cy="21"
                  r="16"
                  fill="transparent"
                  stroke="#ccf2f0"
                  strokeWidth="3.6"
                />
                <circle
                  cx="21"
                  cy="21"
                  r="16"
                  fill="transparent"
                  stroke="#0CABA3"
                  strokeWidth="3.6"
                  strokeDasharray="100"
                  strokeDashoffset="62"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex items-center gap-1 sm:gap-1.5 font-outfit font-bold text-lg sm:text-xl text-[#111827]">
                <span className="text-base sm:text-lg">↑</span>
                <span>{leadGrowth} %</span>
              </div>
            </div>
          </div>

          <div className="h-1" />
        </div>
      ),
    },

    // Card 4: Sales Cycle Length with Avatar Daniel R., Email & Emerald Green Progress Bar
    {
      id: "sales-cycle",
      content: (
        <div className="w-[270px] sm:w-[295px] md:w-[305px] h-[260px] sm:h-[280px] md:h-[285px] p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] bg-white shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12),0_8px_20px_-6px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col justify-between shrink-0">
          <div className="font-outfit font-semibold text-sm sm:text-base text-[#111827] leading-tight">
            <div>Sales Cycle</div>
            <div>Length</div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 my-auto">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 bg-[#E5E7EB] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Daniel R."
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10B981] border-2 border-white" />
            </div>
            <div className="min-w-0">
              <div className="font-outfit font-bold text-xs sm:text-sm text-[#111827]">Daniel R.</div>
              <div className="font-inter text-[10px] sm:text-[11px] text-[#9CA3AF] truncate">daniel@sixtechnologies.com</div>
            </div>
          </div>

          <div className="pt-2">
            <div className="font-inter text-[11px] sm:text-xs text-[#6B7280] mb-1.5 sm:mb-2 font-medium">
              Contract: $25, 457
            </div>
            <div className="relative w-full h-2 sm:h-2.5 rounded-full bg-[#DCFCE7] overflow-hidden flex items-center">
              <div className="h-full bg-[#10B981] rounded-full transition-all duration-1000 flex items-center justify-end pr-1" style={{ width: "75%" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Card 5: You Gained $34 718,00 with Profitability Index
    {
      id: "you-gained",
      content: (
        <div className="w-[260px] sm:w-[280px] md:w-[290px] h-[255px] sm:h-[275px] md:h-[280px] p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] bg-white shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12),0_8px_20px_-6px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col justify-center shrink-0">
          <div className="font-outfit font-medium text-xs sm:text-sm text-[#6B7280] mb-2 sm:mb-3">
            You gained
          </div>
          <div className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#111827] tracking-tight mb-2 sm:mb-3 leading-none">
            ${profitValue.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="font-inter text-xs sm:text-sm text-[#9CA3AF]">
            Profitability Index
          </div>
        </div>
      ),
    },

    // Card 6: Total Gained $456,00 with Velocity Index
    {
      id: "total-gained",
      content: (
        <div className="w-[245px] sm:w-[265px] md:w-[275px] h-[255px] sm:h-[275px] md:h-[280px] p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] bg-white shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12),0_8px_20px_-6px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col justify-center shrink-0">
          <div className="font-outfit font-medium text-xs sm:text-sm text-[#6B7280] mb-2 sm:mb-3">
            Total gained
          </div>
          <div className="font-outfit font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#111827] tracking-tight mb-2 sm:mb-3 leading-none">
            $456,00
          </div>
          <div className="font-inter text-xs sm:text-sm text-[#9CA3AF]">
            Velocity Index
          </div>
        </div>
      ),
    },
  ];

  // Double the cards inside each set so each set is ~3600px wide (100% wider than any 4K/Ultrawide screen)
  const fullSet = [...cards, ...cards];

  return (
    <section className="relative w-full min-h-[100dvh] bg-white text-[#261A66] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6 border-b border-gray-100 overflow-hidden select-none">
      
      {/* PURE UNIFORM WHITE CANVAS */}

      {/* TOP & CENTER: MINIMALIST CENTER LAYOUT (CLEAN TEXTUAL HEADLINE & #0CABA3 CENTERED CONTACT BUTTON) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex-1 flex flex-col items-center justify-center text-center my-auto pt-4 pb-2">
        
        {/* Main Claim Heading - Responsive scaling across mobile, tablet & desktop */}
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="font-inter font-medium sm:font-semibold text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[4.25rem] text-[#261A66] tracking-[-0.03em] leading-[1.14] select-none [hyphens:none]">
            Software & Digital Products
          </h1>

          <div className="font-inter font-medium sm:font-semibold text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[4.25rem] text-[#261A66] tracking-[-0.03em] leading-[1.14] mt-1 sm:mt-1.5 md:mt-2 select-none [hyphens:none]">
            <span>That Drive </span>
            <span className="text-[#0CABA3]">Results</span>
          </div>
        </div>

        {/* Centered #0CABA3 Contact Button (User Reference Image 1) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center w-full">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-9 sm:px-11 py-3.5 sm:py-4 rounded-full bg-[#0CABA3] hover:bg-[#098f88] text-white hover:text-white font-inter font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_8px_25px_rgba(12,171,163,0.32)] hover:shadow-[0_12px_32px_rgba(12,171,163,0.45)] hover:-translate-y-0.5 active:translate-y-0 select-none group"
          >
            <span className="text-white group-hover:text-white font-semibold">Contact Us</span>
          </Link>
        </div>

      </div>

      {/* LOWER SECTION: TALL CARDS WITH FULLY VISIBLE ELEVATED SHADOWS (ZERO CLIPPING, RESPONSIVE SHELF) */}
      <div className="relative z-10 w-full overflow-hidden pt-2 pb-2 mt-auto select-none">
        
        {/* Dynamic Diagonal Tilt (-2deg on mobile, -3deg on desktop) */}
        <div className="w-[130%] -ml-[15%] sm:w-[125%] sm:-ml-[12.5%] [transform:rotate(-2deg)] sm:[transform:rotate(-3deg)] py-3">
          
          {/* Marquee Wrapper with User's Exact mask-image CSS */}
          <div className="marquee-wrapper w-full overflow-hidden">
            
            {/* The Track: Uses pt-2 pb-12 so the drop shadows are 100% visible with zero clipping */}
            <div className="marquee-track flex w-max items-center hover:[animation-play-state:paused] pt-2 pb-12">
              
              {/* Set 1: 12 Cards */}
              <div className="flex shrink-0 items-center gap-5 sm:gap-7 pr-5 sm:pr-7">
                {fullSet.map((c, i) => (
                  <div key={`set1-${c.id}-${i}`} className="shrink-0">
                    {c.content}
                  </div>
                ))}
              </div>

              {/* Set 2: Pixel-Identical Duplicate Set for Truly 100% Seamless Infinite Loop */}
              <div className="flex shrink-0 items-center gap-5 sm:gap-7 pr-5 sm:pr-7">
                {fullSet.map((c, i) => (
                  <div key={`set2-${c.id}-${i}`} className="shrink-0">
                    {c.content}
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Hardware-accelerated Seamless Infinite Linear Marquee CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .marquee-wrapper {
          mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: slideInfinite 42s linear infinite;
          will-change: transform;
        }
        @keyframes slideInfinite {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}} />

    </section>
  );
}
