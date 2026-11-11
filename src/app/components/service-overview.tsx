"use client";

import React from "react";
import {
  Activity,
  Bot,
  Boxes,
  CheckCircle2,
  CloudCog,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import BentoCard from "./bento-card";

interface ServiceOverviewProps {
  serviceType: "web" | "app" | "ai" | "custom-software";
}

interface OverviewFeature {
  badge: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface OverviewConfig {
  eyebrow: string;
  headingPrefix: string;
  headingAccent: string;
  lead: string;
  kpiLabel: string;
  kpiValue: string;
  schematicTitle: string;
  schematicBadge: string;
  schematicNodes: { label: string; status: string }[];
  pillars: string[];
  features: OverviewFeature[];
}

const OVERVIEW_DATA: Record<ServiceOverviewProps["serviceType"], OverviewConfig> =
  {
    web: {
      eyebrow: "Web Development",
      headingPrefix: "Websites Built to",
      headingAccent: "Load Fast & Convert.",
      lead: "A slow website loses visitors before they even read your offer. We build fast Next.js sites and full-stack web apps designed to rank on Google and turn visitors into customers.",
      kpiLabel: "Core Focus",
      kpiValue: "Speed & Clarity",
      schematicTitle: "How Your Site Runs",
      schematicBadge: "next.js · cdn · postgres",
      schematicNodes: [
        { label: "Server-Rendered Pages", status: "Fast load" },
        { label: "Clean APIs & Database", status: "Type-safe" },
        { label: "SEO & Page Structure", status: "Search ready" },
      ],
      pillars: [
        "Clean React & Next.js code your team can maintain",
        "Responsive layouts tested across phones and desktops",
        "Weekly staging links so you see real progress",
      ],
      features: [
        {
          badge: "01 / SPEED",
          title: "Fast Page Loads",
          description:
            "Server rendering, lean bundles, and compressed images keep every page responsive on mobile and desktop connections.",
          tags: ["Next.js", "Edge Caching", "Image Optimization"],
          icon: Zap,
        },
        {
          badge: "02 / BACKEND",
          title: "Reliable APIs & Databases",
          description:
            "End-to-end TypeScript validation between your interface, authentication, server logic, and PostgreSQL database.",
          tags: ["TypeScript", "PostgreSQL", "REST & GraphQL"],
          icon: Database,
        },
        {
          badge: "03 / SEO",
          title: "Built for Search & Leads",
          description:
            "Clean HTML structure, metadata, OpenGraph social cards, and analytics tracking wired in properly from launch.",
          tags: ["Technical SEO", "JSON-LD", "Analytics"],
          icon: Globe,
        },
        {
          badge: "04 / SECURITY",
          title: "Secure Auth & Hosting",
          description:
            "Role-based permissions, safe session handling, rate limiting, and automated backups before your site goes live.",
          tags: ["OAuth / Roles", "HTTPS", "Backups"],
          icon: ShieldCheck,
        },
      ],
    },
    app: {
      eyebrow: "Mobile App Development",
      headingPrefix: "Mobile Apps People",
      headingAccent: "Enjoy Using Every Day.",
      lead: "People judge a mobile app within seconds. We build iOS and Android apps with smooth screens, offline support where it counts, and a handled App Store and Google Play launch.",
      kpiLabel: "Platforms",
      kpiValue: "iOS & Android",
      schematicTitle: "Mobile App Setup",
      schematicBadge: "ios · android · offline sync",
      schematicNodes: [
        { label: "Smooth Screens & Gestures", status: "Native feel" },
        { label: "Local Offline Storage", status: "Auto-sync" },
        { label: "Store Signing & Builds", status: "Handled" },
      ],
      pillars: [
        "Shared business logic paired with native mobile feel",
        "Tested on real phones across slow or flaky networks",
        "Handled TestFlight, App Store, and Play Store rollout",
      ],
      features: [
        {
          badge: "01 / NATIVE FEEL",
          title: "Natural Gestures & Responsive Screens",
          description:
            "Smooth screen transitions, haptics, and light/dark mobile layouts tailored for thumb navigation on iOS and Android.",
          tags: ["React Native", "Flutter", "Swift / Kotlin"],
          icon: Smartphone,
        },
        {
          badge: "02 / OFFLINE",
          title: "Works Even When Signal Drops",
          description:
            "Local storage saves user actions offline and syncs cleanly with your server once the connection comes back.",
          tags: ["SQLite", "Offline Sync", "Background Jobs"],
          icon: Layers,
        },
        {
          badge: "03 / STABILITY",
          title: "Crash Tracking & App Health",
          description:
            "Real error monitoring catches bugs and slow screens quickly so fixes go out before negative reviews pile up.",
          tags: ["Sentry Mobile", "OTA Updates", "Biometrics"],
          icon: Activity,
        },
        {
          badge: "04 / RELEASE",
          title: "App Store & Play Store Releases",
          description:
            "We handle store certificates, privacy forms, TestFlight beta builds, and staged rollouts across both stores.",
          tags: ["Fastlane CI", "TestFlight", "Google Play"],
          icon: Rocket,
        },
      ],
    },
    ai: {
      eyebrow: "Applied AI Systems",
      headingPrefix: "Practical AI Wired Into",
      headingAccent: "Your Real Operations.",
      lead: "Toy chatbots break the moment they touch real business data. We build document search tools, workflow automations, and assistants wired safely into your internal systems with clear human checks.",
      kpiLabel: "Approach",
      kpiValue: "Source-Cited",
      schematicTitle: "How Your AI Setup Runs",
      schematicBadge: "search · tools · checks",
      schematicNodes: [
        { label: "Document Search (RAG)", status: "Cited answers" },
        { label: "CRM & Webhook Actions", status: "Schema checked" },
        { label: "Cost & Quality Logs", status: "Tracked" },
      ],
      pillars: [
        "Answers link straight back to your source documents",
        "Human approval steps before high-stakes actions run",
        "Private setup — your data never trains public models",
      ],
      features: [
        {
          badge: "01 / KNOWLEDGE",
          title: "Company Document Search",
          description:
            "Search across PDFs, SQL tables, Notion, and help tickets with clear source links and proper staff access permissions.",
          tags: ["pgvector", "Hybrid Search", "Source Links"],
          icon: BrainIconWrapper,
        },
        {
          badge: "02 / WORKFLOWS",
          title: "Workflow & Triage Assistants",
          description:
            "Automate repetitive intake, sorting, invoice reading, and CRM updates with clear review steps for your team.",
          tags: ["Structured Outputs", "Tool Calling", "Approvals"],
          icon: Bot,
        },
        {
          badge: "03 / DOCUMENTS",
          title: "OCR, Extraction & Voice Tools",
          description:
            "Turn messy scans, invoices, and forms into clean database records, or build responsive voice and support tools.",
          tags: ["PyTorch", "Document OCR", "Whisper"],
          icon: Cpu,
        },
        {
          badge: "04 / CONTROLS",
          title: "Safety Checks & Spend Limits",
          description:
            "Automated accuracy tests, PII redaction, and token budget caps so prompts stay dependable and costs never spike.",
          tags: ["Eval Suites", "PII Masking", "Spend Caps"],
          icon: Lock,
        },
      ],
    },
    "custom-software": {
      eyebrow: "Custom Software",
      headingPrefix: "Software Shaped Around Your",
      headingAccent: "Actual Business.",
      lead: "Off-the-shelf tools force your team into clunky workarounds and per-seat fees. We build internal portals, booking systems, custom ERPs, and APIs owned outright by your company.",
      kpiLabel: "Ownership",
      kpiValue: "100% Your IP",
      schematicTitle: "Core System Setup",
      schematicBadge: "portals · queues · audit log",
      schematicNodes: [
        { label: "Staff & Client Portals", status: "Role-scoped" },
        { label: "Background Job Queues", status: "Retry-safe" },
        { label: "Change & Audit History", status: "Logged" },
      ],
      pillars: [
        "Full repository ownership with zero per-seat fees",
        "Clean links to your accounting, payment, and shipping tools",
        "Clear documentation and handover for your team",
      ],
      features: [
        {
          badge: "01 / PORTALS",
          title: "Custom Operations & Admin Systems",
          description:
            "Replace tangled spreadsheets with one clear dashboard covering orders, inventory, staff approvals, and billing.",
          tags: ["Role Portals", "Custom Workflows", "Reporting"],
          icon: Boxes,
        },
        {
          badge: "02 / INTEGRATIONS",
          title: "API Bridges & Legacy Sync",
          description:
            "Connect payment providers, warehouses, CRMs, and older databases with proper error handling and automatic retries.",
          tags: ["Webhooks", "REST & GraphQL", "Data Sync"],
          icon: Workflow,
        },
        {
          badge: "03 / INFRASTRUCTURE",
          title: "Scalable Backends & Job Queues",
          description:
            "Containerized cloud services, indexed PostgreSQL queries, and Redis queues that handle heavy reports smoothly.",
          tags: ["AWS / GCP", "Docker & CI", "Redis Queues"],
          icon: CloudCog,
        },
        {
          badge: "04 / ACCESS",
          title: "Multi-Tenant Security & Audit Logs",
          description:
            "Keep client workspaces separated, manage staff permissions cleanly, and track every critical account action.",
          tags: ["SSO / Auth", "Permissions", "Audit Logs"],
          icon: Terminal,
        },
      ],
    },
  };

function BrainIconWrapper({ className }: { className?: string }) {
  return <Sparkles className={className} />;
}

const BENTO_SPAN_CLASSES = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export default function ServiceOverview({ serviceType }: ServiceOverviewProps) {
  const data = OVERVIEW_DATA[serviceType];

  return (
    <section className="w-full py-16 sm:py-24 bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-white transition-colors duration-300">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Top Section Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/80 dark:bg-white/[0.05] border border-black/[0.07] dark:border-white/[0.1] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-[#0CABA3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0CABA3]" />
            {data.eyebrow}
          </div>
          <span className="text-xs font-mono text-gray-500 dark:text-white/45 uppercase tracking-wider">
            How We Build It
          </span>
        </div>

        {/* Hero Overview Asymmetric 12-Col Bento Row (7 + 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {/* Left Narrative Card (7 cols) */}
          <BentoCard className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.08] text-gray-900 dark:text-white mb-5">
                {data.headingPrefix}{" "}
                <span className="text-[#0CABA3]">{data.headingAccent}</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-white/65 leading-relaxed max-w-3xl">
                {data.lead}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-black/[0.07] dark:border-white/[0.08]">
              {data.pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-start gap-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] p-3.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0CABA3] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13px] text-gray-700 dark:text-white/80 leading-snug">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Right Dark Schematic Wireframe Card (5 cols - replaces stock photo!) */}
          <BentoCard
            surface="dark"
            className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between gap-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[#35dbd3]">
                <Code2 className="w-4 h-4" />
                Architecture Overview
              </span>
              <span className="rounded-full bg-white/[0.07] border border-white/[0.1] px-2.5 py-1 text-[10px] font-mono text-white/65">
                {data.schematicBadge}
              </span>
            </div>

            <div className="space-y-3 my-auto">
              <p className="text-sm font-semibold text-white/90 mb-3">
                {data.schematicTitle}
              </p>
              {data.schematicNodes.map((node, i) => (
                <div
                  key={node.label}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0CABA3]/20 text-[10px] font-mono font-bold text-[#35dbd3]">
                      0{i + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white/85 truncate">
                      {node.label}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-400/25 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-300">
                    {node.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-white/[0.08] flex items-end justify-between gap-4">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-white/45 mb-1">
                  {data.kpiLabel}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {data.kpiValue}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#35dbd3]">
                <span className="h-2 w-2 rounded-full bg-[#0CABA3] animate-pulse" />
                Production Ready
              </span>
            </div>
          </BentoCard>
        </div>

        {/* Lower 4-Tile Asymmetric Bento Mosaic (7+5, 5+7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {data.features.map((feature, index) => {
            const Icon = feature.icon;
            const spanClass = BENTO_SPAN_CLASSES[index] || "lg:col-span-6";

            return (
              <BentoCard
                key={feature.title}
                className={`${spanClass} p-7 sm:p-8 flex flex-col justify-between gap-6`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#0CABA3] mb-2">
                      {feature.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0CABA3]/12 border border-[#0CABA3]/25 text-[#0CABA3] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 dark:text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] px-2.5 py-1 text-[11px] font-mono text-gray-700 dark:text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </BentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
