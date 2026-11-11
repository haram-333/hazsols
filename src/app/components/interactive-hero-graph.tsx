"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Activity, ArrowUpRight, BarChart3 } from "lucide-react";

export default function InteractiveHeroGraph() {
  const [activeTab, setActiveTab] = useState<"conversion" | "velocity" | "growth">("conversion");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [metricValue, setMetricValue] = useState(38.4);
  const [bars, setBars] = useState([42, 68, 55, 84, 62, 91, 78]);

  // Gentle real-time ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setMetricValue((prev) => {
        const delta = (Math.random() * 0.6 - 0.25);
        return parseFloat((prev + delta).toFixed(1));
      });
      setBars((prev) =>
        prev.map((val) => {
          const shift = Math.floor(Math.random() * 7) - 3;
          return Math.min(95, Math.max(30, val + shift));
        })
      );
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[340px] sm:max-w-[380px] rounded-2xl bg-white/90 backdrop-blur-xl border border-black/[0.06] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0CABA3]/10 flex items-center justify-center text-[#0CABA3]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Live Performance
            </div>
            <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span>{metricValue}%</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +12.4%
              </span>
            </div>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-[10px] font-medium text-gray-600">
          <button
            onClick={() => setActiveTab("conversion")}
            className={`px-2 py-0.5 rounded transition-all ${
              activeTab === "conversion"
                ? "bg-white text-gray-900 shadow-sm font-semibold"
                : "hover:text-gray-900"
            }`}
          >
            CR
          </button>
          <button
            onClick={() => setActiveTab("velocity")}
            className={`px-2 py-0.5 rounded transition-all ${
              activeTab === "velocity"
                ? "bg-white text-gray-900 shadow-sm font-semibold"
                : "hover:text-gray-900"
            }`}
          >
            Vel
          </button>
          <button
            onClick={() => setActiveTab("growth")}
            className={`px-2 py-0.5 rounded transition-all ${
              activeTab === "growth"
                ? "bg-white text-gray-900 shadow-sm font-semibold"
                : "hover:text-gray-900"
            }`}
          >
            AOV
          </button>
        </div>
      </div>

      {/* Interactive Graph Visualization */}
      <div className="relative h-28 sm:h-32 flex items-end justify-between gap-1.5 sm:gap-2 pt-4 px-1 border-b border-gray-100 pb-2">
        {/* Horizontal reference threshold line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b border-dashed border-gray-200 pointer-events-none" />

        {bars.map((height, i) => {
          const isHovered = hoveredBar === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
              className="relative flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
            >
              {/* Tooltip on Hover */}
              <div
                className={`absolute -top-7 px-1.5 py-0.5 rounded bg-gray-900 text-white text-[10px] font-bold transition-all duration-200 pointer-events-none z-20 whitespace-nowrap ${
                  isHovered ? "opacity-100 scale-100 -translate-y-1" : "opacity-0 scale-90 translate-y-1"
                }`}
              >
                {height}%
              </div>

              {/* Bar Fill */}
              <div
                style={{ height: `${height}%` }}
                className={`w-full rounded-full transition-all duration-500 ease-out ${
                  isHovered
                    ? "bg-[#0CABA3] shadow-[0_4px_12px_rgba(12,171,163,0.4)] scale-x-110"
                    : i % 2 === 0
                    ? "bg-[#0CABA3]/85 hover:bg-[#0CABA3]"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Footer */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-500 font-medium pt-1">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Interactive Studio Telemetry
        </span>
        <span className="text-gray-900 font-semibold flex items-center gap-0.5 hover:text-[#0CABA3] cursor-pointer">
          Detailed metrics <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
