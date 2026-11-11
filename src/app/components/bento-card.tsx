"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  href?: string;
  onClick?: () => void;
  surface?: "dark" | "light" | "auto";
  enableTilt?: boolean;
  spotlightColor?: string;
}

export default function BentoCard({
  children,
  className = "",
  wrapperClassName = "",
  href,
  onClick,
  surface = "auto",
  enableTilt = true,
  spotlightColor = "rgba(12, 171, 163, 0.16)",
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50, rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // Gentle 3D perspective tilt capped at +/-4deg for crisp UI feel
    const ry = enableTilt ? ((x / rect.width - 0.5) * 7) : 0;
    const rx = enableTilt ? ((0.5 - y / rect.height) * 7) : 0;

    setCoords({ x: px, y: py, rx, ry });
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setCoords((prev) => ({ ...prev, rx: 0, ry: 0 }));
  };

  const surfaceClasses =
    surface === "dark"
      ? "bg-[#0c0c0e] text-white border border-white/[0.08] shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
      : surface === "light"
        ? "bg-white text-gray-900 border border-black/[0.07] shadow-xs"
        : "bg-white dark:bg-[#13151C] text-gray-900 dark:text-white border border-black/[0.07] dark:border-white/[0.08] shadow-xs dark:shadow-[0_18px_45px_rgba(0,0,0,0.45)]";

  const cardContent = (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{
        transform: isHovered
          ? `perspective(1100px) rotateX(${coords.rx.toFixed(2)}deg) rotateY(${coords.ry.toFixed(2)}deg) translateY(-4px) scale3d(1.008, 1.008, 1)`
          : "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 350ms ease"
          : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease",
      }}
      className={`group relative isolate overflow-hidden rounded-[26px] will-change-transform ${surfaceClasses} ${
        onClick || href ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Layer 1: Cursor-Tracking Radial Ambient Spotlight (underneath content inside isolate stack) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(460px circle at ${coords.x}% ${coords.y}%, ${spotlightColor}, transparent 58%)`,
        }}
      />

      {/* Layer 2: Masked Gradient Border Beam Following Pointer */}
      <div
        aria-hidden="true"
        className="bento-border-mask pointer-events-none absolute inset-0 z-20 rounded-[26px] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}% ${coords.y}%, rgba(12, 171, 163, 0.85), rgba(75, 224, 216, 0.35) 38%, transparent 72%)`,
        }}
      />

      {/* Layer 3: Subtle Diagonal Specular Sheen Sweep on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 z-20 skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/[0.08] dark:via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[340%] transition-all duration-1000 ease-out"
      />

      {children}
    </div>
  );

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={`block h-full ${wrapperClassName}`}>
          {cardContent}
        </a>
      );
    }
    return (
      <Link href={href} className={`block h-full ${wrapperClassName}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
