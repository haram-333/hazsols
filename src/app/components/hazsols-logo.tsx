import React from "react";

export type HazsolsLogoSurface = "light" | "dark" | "auto";
export type HazsolsLogoAnimation = "hover" | "volt-snap" | "none";
export type HazsolsLogoVariant = "mark" | "horizontal" | "stacked";

interface HazsolsLogoProps {
  /** Pixel width and height of the SVG emblem */
  size?: number;
  /** Surface background polarity so the H pillars retain maximum contrast */
  surface?: HazsolsLogoSurface;
  /** Motion behavior: hover split across the site, volt-snap for the loader */
  animation?: HazsolsLogoAnimation;
  /** Lockup layout: emblem only, horizontal pill, or vertical stacked lockup */
  variant?: HazsolsLogoVariant;
  /** Show the tracked SOLUTIONS sub-label alongside/below HAZSOLS */
  showSublabel?: boolean;
  /** Optional class override for the outer container */
  className?: string;
  /** Optional class override for the wordmark text */
  wordmarkClassName?: string;
  /** Accessible label when used as a standalone emblem without visible text */
  ariaLabel?: string;
}

const TEAL = "#0CABA3";

const ANIMATION_CLASS: Record<HazsolsLogoAnimation, string> = {
  hover: "hazsols-logo--hover",
  "volt-snap": "hazsols-logo--volt-snap",
  none: "",
};

/**
 * Reusable Hazsols Solutions (#3 Velocity Optical H-S Lock) brand mark and
 * Montserrat wordmark lockup.
 */
export default function HazsolsLogo({
  size = 36,
  surface = "light",
  animation = "hover",
  variant = "mark",
  showSublabel = false,
  className = "",
  wordmarkClassName = "",
  ariaLabel = "Hazsols Solutions Logo",
}: HazsolsLogoProps) {
  const isLight = surface === "light";
  const isAuto = surface === "auto";
  const inkHex = isLight ? "#0F172A" : "#FFFFFF";
  const pillarFillProps = isAuto ? {} : { fill: inkHex, stroke: inkHex };

  const textColorClass = isAuto
    ? "text-[var(--text-color)]"
    : isLight
      ? "text-gray-900"
      : "text-white";

  const animClass = ANIMATION_CLASS[animation];
  const hasVisibleText = variant !== "mark";

  const svgMark = (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`hazsols-logo shrink-0 ${animClass}`}
      style={{ width: size, height: size }}
      aria-hidden={hasVisibleText ? true : undefined}
      role={hasVisibleText ? undefined : "img"}
      aria-label={hasVisibleText ? undefined : ariaLabel}
    >
      <path
        data-part="volt-s-shear"
        className="hazsols-part hazsols-core"
        d="M62.7 19 L22.7 19 L19.4 43 L36.1 66.2 L82.1 66.2 L78.8 90 L62.8 90 L57.3 101 L97.3 101 L100.6 77 L83.9 53.8 L37.9 53.8 L41.2 30 L57.2 30 Z"
        fill={TEAL}
        stroke={TEAL}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path
        data-part="h-shear-tr"
        className={`hazsols-part hazsols-tr ${isAuto ? "hazsols-ink-auto" : ""}`}
        d="M88.7 19 L108.7 19 L102.1 66.5 L85.4 43.2 Z"
        {...pillarFillProps}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path
        data-part="h-shear-bl"
        className={`hazsols-part hazsols-bl ${isAuto ? "hazsols-ink-auto" : ""}`}
        d="M31.3 101 L11.3 101 L17.9 53.5 L34.6 76.8 Z"
        {...pillarFillProps}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "mark") {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        {svgMark}
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        {svgMark}
        <div className="mt-4 flex flex-col items-center leading-none">
          <span
            className={`font-montserrat font-extrabold uppercase tracking-[0.14em] ${textColorClass} ${wordmarkClassName || "text-2xl sm:text-[28px]"}`}
          >
            HAZSOLS
          </span>
          {showSublabel && (
            <span className="font-montserrat font-semibold uppercase text-[11px] sm:text-xs tracking-[0.38em] text-[#0CABA3] mt-2">
              SOLUTIONS
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {svgMark}
      <div className="flex flex-col leading-none">
        <span
          className={`font-montserrat font-extrabold uppercase tracking-[0.12em] ${textColorClass} ${wordmarkClassName || "text-sm"}`}
        >
          HAZSOLS
        </span>
        {showSublabel && (
          <span className="font-montserrat font-semibold uppercase text-[9px] tracking-[0.34em] text-[#0CABA3] mt-1">
            SOLUTIONS
          </span>
        )}
      </div>
    </div>
  );
}
