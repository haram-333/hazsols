"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShaderHeroBackground from "./shader-hero-bg";
import SiteNavbar from "./site-navbar";
import HeroOrbitVisual, { OrbitPreset } from "./hero-orbit-visual";

export interface SubpageHeroProps {
  indexLabel?: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  orbitPreset?: OrbitPreset;
  aside?: React.ReactNode;
  compact?: boolean;
}

export default function SubpageHero({
  indexLabel,
  eyebrow,
  title,
  description,
  backHref = "/",
  backLabel = "Back to Home",
  actions,
  orbitPreset,
  aside,
  compact = false,
}: SubpageHeroProps) {
  const rightContent =
    aside ??
    (orbitPreset ? (
      <HeroOrbitVisual preset={orbitPreset} size={compact ? "md" : "lg"} />
    ) : null);

  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-x-clip bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-white transition-colors duration-300 flex flex-col justify-between"
    >
      {/* Full-Bleed Prismatic Diagonal Shader Backdrop */}
      <ShaderHeroBackground />

      {/* Top Hero Navbar + Portal Scroll-Down Dock */}
      <SiteNavbar />

      {/* Hero Foreground Grid */}
      <div
        className={`relative z-20 w-full flex-1 flex items-center px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 ${
          compact
            ? "py-10 sm:py-14 lg:py-16"
            : "py-10 sm:py-14 lg:py-20"
        }`}
      >
        <div
          className={`w-full grid grid-cols-1 gap-10 lg:gap-12 items-center ${
            rightContent ? "lg:grid-cols-12" : ""
          }`}
        >
          {/* Left Content Column */}
          <div className={rightContent ? "lg:col-span-7" : "max-w-5xl"}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-7">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.12] px-3.5 py-1.5 text-xs font-medium text-gray-800 dark:text-white/80 hover:border-[#0CABA3]/50 hover:text-gray-950 dark:hover:text-white backdrop-blur-md transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#0CABA3]" />
                {backLabel}
              </Link>

              {indexLabel && (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold">
                  {indexLabel}
                </span>
              )}

              <span className="inline-flex items-center rounded-full bg-white/75 dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.12] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-700 dark:text-white/80 backdrop-blur-md">
                {eyebrow}
              </span>
            </div>

            <h1 className="text-[clamp(2rem,4.5vw,3.9rem)] font-bold tracking-[-0.03em] leading-[1.06] text-gray-900 dark:text-white mb-5 sm:mb-6">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl leading-relaxed mb-7 sm:mb-9">
              {description}
            </p>

            {actions && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                {actions}
              </div>
            )}
          </div>

          {/* Right Orbital Hub Visual or Custom Aside */}
          {rightContent && (
            <div className="lg:col-span-5 flex items-center justify-center">
              {rightContent}
            </div>
          )}
        </div>
      </div>

      {/* Subtle Bottom Hairline Divider */}
      <div className="relative z-10 w-full h-px bg-black/[0.06] dark:bg-white/[0.08]" />
    </section>
  );
}
