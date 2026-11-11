"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ShaderHeroBackground from "./shader-hero-bg";
import SiteNavbar from "./site-navbar";
import TextRollButton from "./text-roll-button";

// Viewport-aware video player that pauses decoding when scrolled out of view
function ViewportVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}

// Chain / Link SVG Icon
function LinkChainIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-900 dark:text-white shrink-0"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function AxionLandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-gray-100 selection:bg-[#0CABA3] selection:text-white font-inter antialiased relative transition-colors duration-300">
      {/* ════════════════════════════════════════════════════════════
          SECTION 1: HERO (Full viewport height)
          ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-x-clip bg-[#EFEFEF] dark:bg-[#070709] transition-colors duration-300">
        
        {/* Full-Screen Animated Shader Overlay */}
        <ShaderHeroBackground />

        {/* Shared Pill Navigation Bar & Mobile Sheet */}
        <SiteNavbar />

        {/* ── Hero Content (z-20, bottom-aligned via flex-1 spacer) ── */}
        <div className="flex-1" />

        <div className="relative z-20 w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-14 sm:pb-16 lg:pb-20">
          
          {/* Headline & Action Buttons with HAZSOLS content */}
          <div className="max-w-4xl">
            {/* Small Label from Codebase */}
            <div className="text-[13px] sm:text-[14px] text-gray-900 dark:text-white tracking-wide font-medium mb-5 sm:mb-8 flex items-center gap-2">
              <span className="font-semibold">HAZSOLS</span>
              <span className="text-gray-400 dark:text-gray-600">·</span>
              <span className="text-gray-600 dark:text-gray-400 font-normal">Web, Mobile &amp; Software Studio</span>
            </div>

            {/* Headline H1 */}
            <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 dark:text-white">
              Websites, Mobile Apps<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              &amp; Custom Software<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Built for Real Businesses.
            </h1>

            {/* CTA Row (mt-8 sm:mt-12) */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
              <TextRollButton
                text="Start a project"
                href="/contact"
                theme="orange"
                fullWidthOnMobile
              />
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2: ABOUT (Light & Dark obsidian editorial contrast)
          ════════════════════════════════════════════════════════════ */}
      <section id="about" className="relative w-full bg-white dark:bg-[#0C0D10] pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden border-t border-gray-100 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          
          {/* Badge Row */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
              1
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium border border-gray-200 dark:border-white/15 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-900 dark:text-white/90 dark:bg-white/[0.04]">
              Introducing Hazsols
            </div>
          </div>

          {/* Heading H2 */}
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white mb-12 sm:mb-16 lg:mb-28 max-w-4xl">
            Software designed and built around<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            how your team actually works.
          </h2>

          {/* Content Area (Mobile/Tablet Stacked vs Desktop Grid) */}
          
          {/* MOBILE / TABLET LAYOUT (lg:hidden) */}
          <div className="lg:hidden flex flex-col gap-8">
            <div className="space-y-6">
              <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 dark:text-gray-300 max-w-xl">
                We work directly with founders and operators to ship fast websites, mobile apps, and internal business tools without unnecessary overhead.
              </p>
              <div className="w-full sm:w-auto">
                <TextRollButton
                  text="About our studio"
                  href="/about"
                  theme="orange"
                  fullWidthOnMobile
                />
              </div>
            </div>

            {/* Two Images from Codebase with Fallbacks */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-4">
              <div className="relative sm:w-[45%] aspect-[438/346] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#16181F] shadow-sm">
                <Image
                  src="/images/web-development.jpg"
                  alt="Hazsols Web Development"
                  fill
                  sizes="(max-width: 640px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="relative sm:w-[55%] aspect-[900/600] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#16181F] shadow-sm">
                <Image
                  src="/images/mobile-development-cover.jpg"
                  alt="Hazsols Mobile Development Studio"
                  fill
                  sizes="(max-width: 640px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT (hidden lg:grid) */}
          <div className="hidden lg:grid grid-cols-[24%_minmax(0,1fr)_44%] xl:grid-cols-[26%_minmax(0,1fr)_46%] items-end gap-4 lg:gap-6 xl:gap-8 w-full max-w-full">
            
            {/* Left Column: Small Image (self-end) */}
            <div className="relative self-end w-full min-w-0 aspect-[438/346] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#16181F] shadow-sm">
              <Image
                src="/images/web-development.jpg"
                alt="Hazsols Digital Engineering"
                fill
                sizes="(max-width: 1280px) 24vw, 26vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Center Column: Paragraph + Orange Button (self-start, flex justify-end) */}
            <div className="self-start min-w-0 w-full flex flex-col justify-end items-start xl:items-end text-left xl:text-right pb-4">
              <p className="text-[15px] xl:text-[17.5px] leading-[1.6] xl:leading-[1.65] font-medium text-gray-900 dark:text-gray-300 max-w-[340px]">
                We work directly with founders and operators to build websites, apps, and software that solve real problems.
              </p>
              <div className="mt-6 xl:mt-8">
                <TextRollButton
                  text="About our studio"
                  href="/about"
                  theme="orange"
                />
              </div>
            </div>

            {/* Right Column: Large Image (self-end) */}
            <div className="relative self-end w-full min-w-0 aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#16181F] shadow-sm">
              <Image
                src="/images/mobile-development-cover.jpg"
                alt="Hazsols Mobile & Cloud Engineering"
                fill
                sizes="(max-width: 1280px) 44vw, 46vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3: CASE STUDIES (Light gray / dark obsidian secondary)
          ════════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative w-full bg-[#F5F5F5] dark:bg-[#101115] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 border-t border-gray-200 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          
          {/* Badge Row */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
              2
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium border border-gray-300 dark:border-white/15 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-900 dark:text-white/90 dark:bg-white/[0.04]">
              Featured client work
            </div>
          </div>

          {/* Heading H2 + All Projects Link */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14 lg:mb-16">
            <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 dark:text-white">
              Our top projects
            </h2>

            <TextRollButton
              text="All projects"
              href="/projects"
              theme="outline"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            
            {/* Card 1: PharmFlow UK Pharmacy OS Showcase */}
            <div className="flex flex-col">
              <a
                href="https://pharmflow.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-[329/246] rounded-2xl overflow-hidden bg-[#030B17] group relative cursor-pointer shadow-sm block border border-transparent dark:border-white/[0.08]"
              >
                <ViewportVideo
                  src="/videos/pharmflow-showcase.mp4"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover button: Expands from w-9 to w-[164px] */}
                <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[164px] bg-white dark:bg-[#181A20] dark:border dark:border-white/15 rounded-full flex items-center justify-between px-2.5 overflow-hidden shadow-lg transition-all duration-300 ease-in-out">
                  <span className="text-[13px] font-medium text-gray-900 dark:text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-1">
                    pharmflow.co.uk
                  </span>
                  <div className="shrink-0 transition-transform duration-300 group-hover:rotate-0 -rotate-45">
                    <LinkChainIcon />
                  </div>
                </div>
              </a>

              {/* Description & Title */}
              <p className="text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-normal">
                Clinical consultation triage, red-flag safety screening, live OTC inventory, and team performance analytics for 500+ UK pharmacies.
              </p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 dark:text-white mt-1">
                PharmFlow · UK Pharmacy Consultation &amp; Performance OS
              </h3>
            </div>

            {/* Card 2: Stroud Green Windows Showcase */}
            <div className="flex flex-col">
              <a
                href="https://stroudgreenwindows.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-2xl overflow-hidden bg-[#050B09] group relative cursor-pointer shadow-sm block border border-transparent dark:border-white/[0.08]"
              >
                <ViewportVideo
                  src="/videos/stroud-green-showcase.mp4"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover button: Expands from w-9 to w-[205px] */}
                <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[205px] bg-white dark:bg-[#181A20] dark:border dark:border-white/15 rounded-full flex items-center justify-between px-2.5 overflow-hidden shadow-lg transition-all duration-300 ease-in-out">
                  <span className="text-[13px] font-medium text-gray-900 dark:text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-1">
                    stroudgreenwindows.co.uk
                  </span>
                  <div className="shrink-0 transition-transform duration-300 group-hover:rotate-0 -rotate-45">
                    <LinkChainIcon />
                  </div>
                </div>
              </a>

              {/* Description & Title */}
              <p className="text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-normal">
                Handcrafted timber sash, slimline architectural aluminium, and high-performance acoustic glazing for 10,000+ London homes.
              </p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 dark:text-white mt-1">
                Stroud Green Windows · Bespoke London Architectural Joinery
              </h3>
            </div>

            {/* Card 3: NE Sports 3 Competition Power Gear Showcase */}
            <div className="flex flex-col">
              <a
                href="https://www.nesports3.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-2xl overflow-hidden bg-[#070709] group relative cursor-pointer shadow-sm block border border-transparent dark:border-white/[0.08]"
              >
                <ViewportVideo
                  src="/videos/nesports-showcase.mp4"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover button: Expands from w-9 to w-[172px] */}
                <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[172px] bg-white dark:bg-[#181A20] dark:border dark:border-white/15 rounded-full flex items-center justify-between px-2.5 overflow-hidden shadow-lg transition-all duration-300 ease-in-out">
                  <span className="text-[13px] font-medium text-gray-900 dark:text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-1">
                    nesports3.com
                  </span>
                  <div className="shrink-0 transition-transform duration-300 group-hover:rotate-0 -rotate-45">
                    <LinkChainIcon />
                  </div>
                </div>
              </a>

              {/* Description & Title */}
              <p className="text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-normal">
                Competition 13mm lever powerlifting belts, heavy-duty padded lifting straps, and waterproof tactical duffels for elite athletes.
              </p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 dark:text-white mt-1">
                NE Sports 3 · Competition Grade Strength Systems
              </h3>
            </div>

            {/* Card 4: Sportal Sports Venue & Esports Network Showcase */}
            <div className="flex flex-col">
              <a
                href="https://sportal.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-2xl overflow-hidden bg-[#07080B] group relative cursor-pointer shadow-sm block border border-transparent dark:border-white/[0.08]"
              >
                <ViewportVideo
                  src="/videos/sportal-showcase.mp4"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover button: Expands from w-9 to w-[152px] */}
                <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[152px] bg-white dark:bg-[#181A20] dark:border dark:border-white/15 rounded-full flex items-center justify-between px-2.5 overflow-hidden shadow-lg transition-all duration-300 ease-in-out">
                  <span className="text-[13px] font-medium text-gray-900 dark:text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-1">
                    sportal.pk
                  </span>
                  <div className="shrink-0 transition-transform duration-300 group-hover:rotate-0 -rotate-45">
                    <LinkChainIcon />
                  </div>
                </div>
              </a>

              {/* Description & Title */}
              <p className="text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-normal">
                Real-time sports turf booking, smart matchmaking squad finder, and tournament management for 100+ premier venues.
              </p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 dark:text-white mt-1">
                Sportal · Sports Venue &amp; Esports Matchmaking Network
              </h3>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
