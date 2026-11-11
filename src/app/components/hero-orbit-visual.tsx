"use client";

import React from "react";
import {
  Bot,
  BrainCircuit,
  CalendarClock,
  CloudCog,
  Code2,
  Compass,
  Cpu,
  Database,
  Figma,
  Globe,
  Layers,
  Lock,
  Mail,
  MessageCircle,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import HazsolsLogo from "./hazsols-logo";

export type OrbitPreset =
  | "web"
  | "app"
  | "ai"
  | "custom-software"
  | "projects"
  | "about"
  | "process"
  | "contact"
  | "services"
  | "legal";

interface OrbitNode {
  label: string;
  accent: string;
  iconKey: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  code: Code2,
  zap: Zap,
  layers: Layers,
  database: Database,
  terminal: Terminal,
  shield: ShieldCheck,
  cpu: Cpu,
  smartphone: Smartphone,
  rocket: Rocket,
  cloud: CloudCog,
  sparkles: Sparkles,
  brain: BrainCircuit,
  bot: Bot,
  workflow: Workflow,
  server: Server,
  lock: Lock,
  compass: Compass,
  figma: Figma,
  mail: Mail,
  message: MessageCircle,
  calendar: CalendarClock,
};

const ORBIT_PRESETS: Record<
  OrbitPreset,
  { outer: OrbitNode[]; inner: OrbitNode[] }
> = {
  web: {
    outer: [
      { label: "Next.js", accent: "#0CABA3", iconKey: "globe" },
      { label: "React", accent: "#38BDF8", iconKey: "code" },
      { label: "TypeScript", accent: "#3B82F6", iconKey: "terminal" },
      { label: "PostgreSQL", accent: "#6366F1", iconKey: "database" },
      { label: "Speed SEO", accent: "#10B981", iconKey: "zap" },
      { label: "Edge Cloud", accent: "#0EA5E9", iconKey: "cloud" },
    ],
    inner: [
      { label: "UI Systems", accent: "#14B8A6", iconKey: "layers" },
      { label: "SSL Security", accent: "#F59E0B", iconKey: "shield" },
      { label: "CI / Launch", accent: "#EC4899", iconKey: "rocket" },
    ],
  },
  app: {
    outer: [
      { label: "iOS & Android", accent: "#0CABA3", iconKey: "smartphone" },
      { label: "Flutter", accent: "#38BDF8", iconKey: "layers" },
      { label: "React Native", accent: "#60A5FA", iconKey: "code" },
      { label: "Offline Sync", accent: "#8B5CF6", iconKey: "database" },
      { label: "Store Launch", accent: "#10B981", iconKey: "rocket" },
      { label: "Native Speed", accent: "#F59E0B", iconKey: "zap" },
    ],
    inner: [
      { label: "Mobile UX", accent: "#EC4899", iconKey: "figma" },
      { label: "Biometrics", accent: "#06B6D4", iconKey: "lock" },
      { label: "Push Cloud", accent: "#6366F1", iconKey: "cloud" },
    ],
  },
  ai: {
    outer: [
      { label: "AI Workflows", accent: "#0CABA3", iconKey: "bot" },
      { label: "ML Pipelines", accent: "#8B5CF6", iconKey: "brain" },
      { label: "Automation", accent: "#10B981", iconKey: "workflow" },
      { label: "Vector Search", accent: "#3B82F6", iconKey: "database" },
      { label: "Inference API", accent: "#F59E0B", iconKey: "cpu" },
      { label: "GenAI UX", accent: "#EC4899", iconKey: "sparkles" },
    ],
    inner: [
      { label: "Python ML", accent: "#38BDF8", iconKey: "terminal" },
      { label: "Guardrails", accent: "#14B8A6", iconKey: "shield" },
      { label: "Cloud GPU", accent: "#6366F1", iconKey: "cloud" },
    ],
  },
  "custom-software": {
    outer: [
      { label: "Enterprise APIs", accent: "#0CABA3", iconKey: "server" },
      { label: "Cloud Ops", accent: "#3B82F6", iconKey: "cloud" },
      { label: "Zero Trust", accent: "#10B981", iconKey: "lock" },
      { label: "Architecture", accent: "#8B5CF6", iconKey: "layers" },
      { label: "Microservices", accent: "#F59E0B", iconKey: "cpu" },
      { label: "ERP / CRM", accent: "#06B6D4", iconKey: "workflow" },
    ],
    inner: [
      { label: "Data Store", accent: "#6366F1", iconKey: "database" },
      { label: "Audit Trails", accent: "#EC4899", iconKey: "shield" },
      { label: "Fast Scale", accent: "#14B8A6", iconKey: "zap" },
    ],
  },
  about: {
    outer: [
      { label: "Strategy", accent: "#0CABA3", iconKey: "compass" },
      { label: "Design Craft", accent: "#EC4899", iconKey: "figma" },
      { label: "Engineering", accent: "#3B82F6", iconKey: "code" },
      { label: "Quality", accent: "#10B981", iconKey: "shield" },
      { label: "Speed", accent: "#F59E0B", iconKey: "zap" },
      { label: "Scale", accent: "#8B5CF6", iconKey: "rocket" },
    ],
    inner: [
      { label: "AI Ready", accent: "#06B6D4", iconKey: "sparkles" },
      { label: "Systems", accent: "#6366F1", iconKey: "layers" },
      { label: "Support", accent: "#14B8A6", iconKey: "message" },
    ],
  },
  process: {
    outer: [
      { label: "01 Discovery", accent: "#0CABA3", iconKey: "compass" },
      { label: "02 Prototype", accent: "#EC4899", iconKey: "figma" },
      { label: "03 Build", accent: "#3B82F6", iconKey: "code" },
      { label: "04 QA Audit", accent: "#F59E0B", iconKey: "shield" },
      { label: "05 Launch", accent: "#10B981", iconKey: "rocket" },
      { label: "06 Iterate", accent: "#8B5CF6", iconKey: "workflow" },
    ],
    inner: [
      { label: "Architecture", accent: "#06B6D4", iconKey: "layers" },
      { label: "CI / CD", accent: "#6366F1", iconKey: "terminal" },
      { label: "Speed", accent: "#14B8A6", iconKey: "zap" },
    ],
  },
  services: {
    outer: [
      { label: "Web Apps", accent: "#0CABA3", iconKey: "globe" },
      { label: "Mobile Apps", accent: "#38BDF8", iconKey: "smartphone" },
      { label: "AI Tools", accent: "#8B5CF6", iconKey: "brain" },
      { label: "Backends", accent: "#3B82F6", iconKey: "server" },
      { label: "Security", accent: "#10B981", iconKey: "shield" },
      { label: "Hosting", accent: "#F59E0B", iconKey: "rocket" },
    ],
    inner: [
      { label: "UI / UX", accent: "#EC4899", iconKey: "figma" },
      { label: "APIs", accent: "#06B6D4", iconKey: "workflow" },
      { label: "Testing", accent: "#14B8A6", iconKey: "zap" },
    ],
  },
  projects: {
    outer: [
      { label: "Web Platforms", accent: "#0CABA3", iconKey: "globe" },
      { label: "Mobile Apps", accent: "#38BDF8", iconKey: "smartphone" },
      { label: "Automation", accent: "#8B5CF6", iconKey: "bot" },
      { label: "Backends", accent: "#3B82F6", iconKey: "server" },
      { label: "Storefronts", accent: "#10B981", iconKey: "layers" },
      { label: "Live Launches", accent: "#F59E0B", iconKey: "rocket" },
    ],
    inner: [
      { label: "Next.js", accent: "#14B8A6", iconKey: "code" },
      { label: "Databases", accent: "#6366F1", iconKey: "database" },
      { label: "Reliable Ops", accent: "#EC4899", iconKey: "shield" },
    ],
  },
  contact: {
    outer: [
      { label: "Direct Email", accent: "#0CABA3", iconKey: "mail" },
      { label: "WhatsApp", accent: "#10B981", iconKey: "message" },
      { label: "24h Reply", accent: "#38BDF8", iconKey: "calendar" },
      { label: "Scoped Quote", accent: "#8B5CF6", iconKey: "layers" },
      { label: "NDA Safe", accent: "#F59E0B", iconKey: "lock" },
      { label: "Kickoff", accent: "#EC4899", iconKey: "rocket" },
    ],
    inner: [
      { label: "Engineers", accent: "#3B82F6", iconKey: "code" },
      { label: "Global", accent: "#14B8A6", iconKey: "globe" },
      { label: "Verified", accent: "#6366F1", iconKey: "shield" },
    ],
  },
  legal: {
    outer: [
      { label: "SSL Encrypted", accent: "#0CABA3", iconKey: "lock" },
      { label: "Data Rights", accent: "#3B82F6", iconKey: "shield" },
      { label: "IP Protected", accent: "#8B5CF6", iconKey: "layers" },
      { label: "Compliance", accent: "#10B981", iconKey: "globe" },
    ],
    inner: [
      { label: "Privacy", accent: "#14B8A6", iconKey: "database" },
      { label: "Clear Terms", accent: "#F59E0B", iconKey: "compass" },
    ],
  },
};

interface HeroOrbitVisualProps {
  preset?: OrbitPreset;
  size?: "md" | "lg";
}

export default function HeroOrbitVisual({
  preset = "services",
  size = "lg",
}: HeroOrbitVisualProps) {
  const { outer, inner } = ORBIT_PRESETS[preset];
  const isCompact = size === "md";

  return (
    <div
      className={`hero-orbit-stage relative mx-auto flex items-center justify-center select-none ${
        isCompact
          ? "w-[260px] h-[260px] sm:w-[300px] sm:h-[300px]"
          : "w-[310px] h-[310px] sm:w-[390px] sm:h-[390px] xl:w-[440px] xl:h-[440px]"
      }`}
      aria-hidden="true"
    >
      {/* Ambient Radial Aura Behind Center Core */}
      <div className="absolute inset-[18%] rounded-full bg-[#0CABA3]/20 dark:bg-[#0CABA3]/18 blur-[65px] pointer-events-none" />

      {/* Outer Track Ring */}
      <div className="absolute inset-[4%] rounded-full border border-black/[0.08] dark:border-white/[0.11] pointer-events-none" />

      {/* Mid Dashed Guide Track */}
      <div className="absolute inset-[18%] rounded-full border border-dashed border-black/[0.08] dark:border-white/[0.1] pointer-events-none" />

      {/* Inner Track Ring */}
      <div className="absolute inset-[28%] rounded-full border border-black/[0.07] dark:border-white/[0.09] pointer-events-none" />

      {/* Outer Rotating Ring Container */}
      <div className="hero-orbit-ring-cw absolute inset-[4%] rounded-full">
        {outer.map((node, index) => {
          const angleDeg = (360 / outer.length) * index - 90;
          const rad = (angleDeg * Math.PI) / 180;
          const xPct = 50 + 50 * Math.cos(rad);
          const yPct = 50 + 50 * Math.sin(rad);
          const IconComponent = ICON_MAP[node.iconKey] || Code2;

          return (
            <div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
            >
              <div className="hero-orbit-counter-item group/node relative flex items-center justify-center">
                <div
                  className="w-11 h-11 sm:w-13 sm:h-13 xl:w-14 xl:h-14 rounded-full bg-white/95 dark:bg-[#141720]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/15 flex items-center justify-center shadow-[0_10px_28px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover/node:scale-115"
                  style={{
                    boxShadow: `0 10px 26px ${node.accent}25`,
                  }}
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full"
                    style={{
                      backgroundColor: `${node.accent}1e`,
                      color: node.accent,
                    }}
                  >
                    <IconComponent className="w-4 h-4 sm:w-[18px] sm-[18px]" />
                  </span>
                </div>

                {/* Hover Tooltip Pill */}
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-2.5 py-0.5 text-[10px] font-mono font-semibold opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 shadow-lg">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inner Counter-Rotating Ring Container */}
      <div className="hero-orbit-ring-ccw absolute inset-[28%] rounded-full">
        {inner.map((node, index) => {
          const angleDeg = (360 / inner.length) * index - 45;
          const rad = (angleDeg * Math.PI) / 180;
          const xPct = 50 + 50 * Math.cos(rad);
          const yPct = 50 + 50 * Math.sin(rad);
          const IconComponent = ICON_MAP[node.iconKey] || Sparkles;

          return (
            <div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
            >
              <div className="hero-orbit-counter-item-inner group/node relative flex items-center justify-center">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-[#171A24]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/15 flex items-center justify-center shadow-md transition-transform duration-300 group-hover/node:scale-115"
                  style={{
                    color: node.accent,
                  }}
                >
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-2 py-0.5 text-[9.5px] font-mono font-semibold opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 shadow-lg">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Hazsols Logo Medallion */}
      <div className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 xl:w-28 xl:h-28 rounded-full bg-white/95 dark:bg-[#101219]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 flex items-center justify-center shadow-[0_18px_50px_rgba(12,171,163,0.22)] dark:shadow-[0_18px_60px_rgba(12,171,163,0.32)]">
        <div className="absolute inset-0 rounded-full bg-[#0CABA3]/10 animate-pulse pointer-events-none" />
        <HazsolsLogo
          size={isCompact ? 42 : 52}
          surface="auto"
          animation="hover"
          ariaLabel="Hazsols Center Emblem"
        />
      </div>
    </div>
  );
}
