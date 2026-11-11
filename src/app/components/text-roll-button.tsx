"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface TextRollButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  theme?: "dark" | "orange" | "outline";
  className?: string;
  fullWidthOnMobile?: boolean;
}

export default function TextRollButton({
  text,
  onClick,
  href,
  theme = "dark",
  className = "",
  fullWidthOnMobile = false,
}: TextRollButtonProps) {
  const isOrange = theme === "orange";
  const isOutline = theme === "outline";

  const surfaceStyles = isOrange
    ? "bg-[#0CABA3] hover:bg-[#098f88] text-white text-[14px] font-medium shadow-[0_8px_20px_rgba(12,171,163,0.25)] hover:shadow-[0_12px_28px_rgba(12,171,163,0.38)] hover:-translate-y-0.5 active:translate-y-0"
    : isOutline
      ? "bg-white/80 hover:bg-white text-gray-900 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white border border-black/10 dark:border-white/15 backdrop-blur-md text-[14px] font-medium shadow-xs hover:-translate-y-0.5 active:translate-y-0"
      : "bg-gray-900 hover:bg-black text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-[13px] font-medium shadow-sm hover:-translate-y-0.5 active:translate-y-0";

  const circleStyles = isOrange
    ? "w-8 h-8 bg-white text-[#0CABA3]"
    : isOutline
      ? "w-8 h-8 bg-gray-900 text-white dark:bg-white dark:text-gray-900"
      : "w-6 h-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white";

  const buttonInner = (
    <div
      className={`group cursor-pointer items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] select-none ${
        fullWidthOnMobile
          ? "w-full sm:w-auto flex justify-between sm:justify-start gap-3 pl-6 pr-2.5 py-2.5 sm:py-2 min-h-[50px] sm:min-h-0"
          : "inline-flex items-center gap-3 pl-5 sm:pl-6 pr-2 py-2"
      } ${surfaceStyles} ${className}`}
    >
      <div className="overflow-hidden h-[20px] flex flex-col justify-start">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
          <span className="h-[20px] flex items-center whitespace-nowrap leading-none">
            {text}
          </span>
          <span className="h-[20px] flex items-center whitespace-nowrap leading-none font-medium">
            {text}
          </span>
        </div>
      </div>

      <div
        className={`rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${circleStyles}`}
      >
        <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
      </div>
    </div>
  );

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a
          href={href}
          className={fullWidthOnMobile ? "w-full sm:w-auto block sm:inline-block" : "inline-block"}
        >
          {buttonInner}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={fullWidthOnMobile ? "w-full sm:w-auto block sm:inline-block" : "inline-block"}
      >
        {buttonInner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={fullWidthOnMobile ? "w-full sm:w-auto block sm:inline-block" : "inline-block"}
    >
      {buttonInner}
    </button>
  );
}

