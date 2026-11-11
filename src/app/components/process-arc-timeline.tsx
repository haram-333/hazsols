"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  PenTool,
  Layers,
  Code2,
  ShieldCheck,
  Rocket,
  Cpu,
  Smartphone,
  Workflow,
  Terminal,
  Sparkles,
  CheckCircle2,
  Clock,
  Activity,
  GitBranch,
  ArrowUpRight,
} from "lucide-react";

export type ProcessIconKey =
  | "compass"
  | "design"
  | "layers"
  | "code"
  | "shield"
  | "rocket"
  | "cpu"
  | "mobile"
  | "workflow"
  | "terminal"
  | "sparkles";

export interface ProcessStepItem {
  number: string;
  title: string;
  phase?: string;
  duration?: string;
  description: string;
  deliverables?: string[];
  icon?: ProcessIconKey;
  metricLabel?: string;
  metricValue?: string;
}

interface ProcessArcTimelineProps {
  eyebrow?: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle?: string;
  steps: ProcessStepItem[];
  surface?: "auto" | "dark";
  id?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

function getStepIcon(icon?: ProcessIconKey) {
  switch (icon) {
    case "compass":
      return Compass;
    case "design":
      return PenTool;
    case "layers":
      return Layers;
    case "code":
      return Code2;
    case "shield":
      return ShieldCheck;
    case "rocket":
      return Rocket;
    case "cpu":
      return Cpu;
    case "mobile":
      return Smartphone;
    case "workflow":
      return Workflow;
    case "terminal":
      return Terminal;
    case "sparkles":
    default:
      return Sparkles;
  }
}

function StepStageIllustration({
  step,
  index,
  total,
}: {
  step: ProcessStepItem;
  index: number;
  total: number;
}) {
  const Icon = getStepIcon(step.icon);
  const progressPct = Math.round(((index + 1) / total) * 100);

  return (
    <div className="relative flex flex-col justify-between h-full min-h-[360px] lg:min-h-[430px] p-6 sm:p-8 rounded-[28px] bg-[#0a0c0e] border border-white/[0.1] shadow-[0_28px_80px_-24px_rgba(0,0,0,0.65)] overflow-hidden text-white select-none">
      {/* Subtle Blueprint Grid + Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(rgba(12,171,163,0.45) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-35 blur-3xl transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(12,171,163,0.48) 0%, rgba(12,171,163,0) 70%)",
        }}
      />

      {/* Top Window Chrome & Telemetry Status */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#0CABA3]" />
          <span className="ml-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/50">
            Stage {step.number} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0CABA3]/15 border border-[#0CABA3]/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#35dbd3]">
          <Activity className="w-3 h-3" />
          {step.duration || "Sprint Cadence"}
        </span>
      </div>

      {/* Center Animated Schematic Visual */}
      <div className="relative z-10 my-6 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.number + step.title}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            {/* Central Node Card */}
            <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.09] p-5 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#0CABA3]/15 border border-[#0CABA3]/40 text-[#35dbd3] shadow-[0_0_28px_rgba(12,171,163,0.28)]">
                    <Icon className="w-6 h-6" />
                    <span className="absolute -inset-1 rounded-2xl border border-[#0CABA3]/20 animate-pulse pointer-events-none" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#35dbd3]">
                      {step.phase || `Step ${step.number}`}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-white leading-tight mt-0.5">
                      {step.title}
                    </h4>
                  </div>
                </div>

                {step.metricValue && (
                  <div className="text-right shrink-0">
                    <span className="block text-base font-bold text-[#35dbd3]">
                      {step.metricValue}
                    </span>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-white/45">
                      {step.metricLabel || "Target"}
                    </span>
                  </div>
                )}
              </div>

              {/* Simulated Pipeline Flow Bars */}
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {["Scope", "Build", "Review"].map((node, i) => {
                  const active = i <= (index % 3);
                  return (
                    <div
                      key={node}
                      className={`rounded-xl px-3 py-2 border text-[11px] font-medium flex items-center justify-between transition-colors ${
                        active
                          ? "bg-[#0CABA3]/12 border-[#0CABA3]/35 text-white"
                          : "bg-white/[0.025] border-white/[0.06] text-white/45"
                      }`}
                    >
                      <span className="truncate">{node}</span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ml-1 ${
                          active ? "bg-[#0CABA3]" : "bg-white/25"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deliverables Preview Pills */}
            {step.deliverables && step.deliverables.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                  <GitBranch className="w-3 h-3 text-[#0CABA3]" />
                  <span>What You Get</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] px-2.5 py-1.5 text-[11px] font-medium text-white/85"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#0CABA3]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Progress Rail */}
      <div className="relative z-10 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-2">
          <span>Stage Progress</span>
          <span className="text-[#35dbd3] font-semibold">{progressPct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#0CABA3] to-[#35dbd3]"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProcessArcTimeline({
  eyebrow = "How We Deliver",
  titlePrefix,
  titleHighlight,
  subtitle,
  steps,
  surface = "auto",
  id,
  ctaHref,
  ctaLabel = "Start a Discovery Sprint",
}: ProcessArcTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStep = steps[activeIndex] ?? steps[0];

  const isDarkSection = surface === "dark";

  // SVG curved arc coordinates (vertical viewBox 0..100 x 0..460)
  // Arc sweeps out towards the right slightly like the Aivora reference
  const viewBoxWidth = 110;
  const viewBoxHeight = 460;
  const getNodePoint = (idx: number, count: number) => {
    const t = count <= 1 ? 0.5 : (idx + 0.5) / count;
    // Quadratic bezier from (14, 20) -> control (102, 230) -> (14, 440)
    const p0 = { x: 14, y: 20 };
    const p1 = { x: 102, y: 230 };
    const p2 = { x: 14, y: 440 };
    const oneMinusT = 1 - t;
    const x =
      oneMinusT * oneMinusT * p0.x +
      2 * oneMinusT * t * p1.x +
      t * t * p2.x;
    const y =
      oneMinusT * oneMinusT * p0.y +
      2 * oneMinusT * t * p1.y +
      t * t * p2.y;
    return { x, y, t };
  };

  return (
    <section
      id={id}
      className={`w-full py-16 md:py-24 transition-colors duration-300 ${
        isDarkSection
          ? "bg-[#050608] text-white border-y border-white/[0.06]"
          : "bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-white border-y border-black/[0.05] dark:border-white/[0.06]"
      }`}
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0CABA3]" />
              <span
                className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                  isDarkSection ? "text-white/55" : "text-gray-500 dark:text-white/55"
                }`}
              >
                {eyebrow}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
                isDarkSection ? "text-white" : "text-gray-900 dark:text-white"
              }`}
            >
              {titlePrefix}{" "}
              <span className="text-[#0CABA3]">{titleHighlight}</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:text-right">
            {subtitle && (
              <p
                className={`text-sm sm:text-base max-w-md ${
                  isDarkSection ? "text-white/60" : "text-gray-600 dark:text-white/60"
                }`}
              >
                {subtitle}
              </p>
            )}
            {ctaHref && (
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 rounded-full bg-[#0CABA3] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_30px_-8px_rgba(12,171,163,0.45)] hover:bg-[#09918a] transition-all"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Main 3-Zone Interactive Curved Arc Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-stretch">
          {/* LEFT STAGE: Interactive Architectural Illustration Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <StepStageIllustration
              step={currentStep}
              index={activeIndex}
              total={steps.length}
            />
          </div>

          {/* CENTER ORBITAL ARC CONNECTOR (Desktop 1 col - SVG Bezier Curve + Clickable Numbered Nodes) */}
          <div
            className="hidden lg:flex lg:col-span-1 relative items-stretch justify-center select-none"
            aria-hidden="false"
          >
            <svg
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              preserveAspectRatio="none"
              className="w-full h-full min-h-[420px] overflow-visible"
            >
              <defs>
                <linearGradient id="hazsolsArcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0CABA3" stopOpacity="0.18" />
                  <stop offset="50%" stopColor="#0CABA3" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0CABA3" stopOpacity="0.18" />
                </linearGradient>
              </defs>

              {/* Base Curved Arc Path */}
              <path
                d="M 14 20 Q 102 230 14 440"
                fill="none"
                stroke={
                  isDarkSection
                    ? "rgba(255,255,255,0.14)"
                    : "rgba(15,23,42,0.16)"
                }
                strokeWidth="1.6"
                strokeDasharray="4 4"
              />

              {/* Highlighted Arc Overlay */}
              <path
                d="M 14 20 Q 102 230 14 440"
                fill="none"
                stroke="url(#hazsolsArcGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Clickable Circular Number Nodes Positioned Along the Curve */}
              {steps.map((step, idx) => {
                const { x, y } = getNodePoint(idx, steps.length);
                const isActive = idx === activeIndex;

                return (
                  <g
                    key={step.number}
                    transform={`translate(${x}, ${y})`}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className="cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect step ${step.number}: ${step.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIndex(idx);
                      }
                    }}
                  >
                    {isActive && (
                      <circle
                        r="24"
                        fill="rgba(12,171,163,0.18)"
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      r={isActive ? "19" : "16"}
                      className={
                        isActive
                          ? "fill-[#0CABA3] stroke-[#35dbd3]"
                          : isDarkSection
                          ? "fill-[#111418] stroke-white/25"
                          : "fill-white dark:fill-[#111418] stroke-slate-300 dark:stroke-white/25"
                      }
                      strokeWidth="1.8"
                      style={{ transition: "all 0.25s ease" }}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="monospace"
                      className={
                        isActive
                          ? "fill-white"
                          : isDarkSection
                          ? "fill-white/80"
                          : "fill-slate-900 dark:fill-white/80"
                      }
                    >
                      {step.number}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* RIGHT STEP LIST: Clean Minimal Rows Along the Curve (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-3">
            {steps.map((step, idx) => {
              const Icon = getStepIcon(step.icon);
              const isActive = idx === activeIndex;
              const isLast = idx === steps.length - 1;

              return (
                <div key={step.number} className="relative">
                  {/* Mobile / Tablet Dashed Connector (ShipBob style) */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className={`lg:hidden pointer-events-none absolute left-7 top-14 -bottom-4 w-px border-l-2 border-dashed ${
                        isActive
                          ? "border-[#0CABA3]/70"
                          : isDarkSection
                          ? "border-white/15"
                          : "border-black/15 dark:border-white/15"
                      }`}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`group w-full text-left rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex items-start gap-4 ${
                      isActive
                        ? isDarkSection
                          ? "bg-white/[0.06] border-[#0CABA3]/50 shadow-[0_18px_45px_-20px_rgba(12,171,163,0.45)] translate-x-0 lg:translate-x-1"
                          : "bg-white dark:bg-[#13151C] border-[#0CABA3]/55 shadow-[0_18px_45px_-20px_rgba(12,171,163,0.3)] translate-x-0 lg:translate-x-1"
                        : isDarkSection
                        ? "bg-white/[0.02] border-white/[0.07] hover:border-white/[0.18] hover:bg-white/[0.04]"
                        : "bg-white/75 dark:bg-[#101218] border-black/[0.07] dark:border-white/[0.08] hover:border-[#0CABA3]/35 hover:bg-white dark:hover:bg-[#141720]"
                    }`}
                  >
                    {/* Step Number / Mobile Circle Badge */}
                    <div className="flex items-center gap-3 shrink-0 pt-0.5">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-mono font-bold transition-colors ${
                          isActive
                            ? "bg-[#0CABA3] text-white shadow-[0_0_20px_rgba(12,171,163,0.4)]"
                            : isDarkSection
                            ? "bg-white/[0.06] text-white/60 group-hover:text-white"
                            : "bg-[#EFEFEF] dark:bg-white/[0.06] text-gray-500 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white border border-black/[0.06] dark:border-white/[0.08]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-[#0CABA3] lg:hidden">
                            {step.number}
                          </span>
                          <h3
                            className={`text-base sm:text-lg font-bold transition-colors ${
                              isActive
                                ? isDarkSection
                                  ? "text-white"
                                  : "text-gray-900 dark:text-white"
                                : isDarkSection
                                ? "text-white/80 group-hover:text-white"
                                : "text-gray-800 dark:text-white/85"
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>

                        {step.duration && (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                              isActive
                                ? "bg-[#0CABA3]/15 text-[#0CABA3] border border-[#0CABA3]/30"
                                : isDarkSection
                                ? "bg-white/[0.05] text-white/45"
                                : "bg-black/[0.05] dark:bg-white/[0.06] text-gray-500 dark:text-white/50"
                            }`}
                          >
                            <Clock className="w-2.5 h-2.5" />
                            {step.duration}
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDarkSection
                            ? "text-white/60"
                            : "text-gray-600 dark:text-white/60"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
