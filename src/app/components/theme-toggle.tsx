"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * Compact circular or pill Light/Dark mode toggle synced with ThemeProvider.
 */
export default function ThemeToggle({
  className = "",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = mounted && theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.08] dark:border-white/15 bg-gray-100/80 dark:bg-white/[0.08] hover:bg-gray-200/80 dark:hover:bg-white/[0.16] text-gray-800 dark:text-white transition-all duration-300 cursor-pointer select-none active:scale-95 ${
        showLabel ? "h-9 px-3.5 text-xs font-medium" : "w-9 h-9"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#0CABA3] transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-gray-800 dark:text-white transition-transform duration-300" />
      )}
      {showLabel && <span>{isDark ? "Light" : "Dark"}</span>}
    </button>
  );
}

