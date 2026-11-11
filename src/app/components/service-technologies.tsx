"use client";

import React from "react";
import {
  Bot,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Rocket,
  Server,
  Shield,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import BentoCard from "./bento-card";

interface ServiceTechnologiesProps {
  serviceType: "web" | "app" | "ai" | "custom-software";
}

interface TechCardModule {
  code: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  metricLabel: string;
  metricValue: string;
  icon: React.ComponentType<{ className?: string }>;
  spanClass: string;
}

const SERVICE_MODULES: Record<
  ServiceTechnologiesProps["serviceType"],
  {
    eyebrow: string;
    heading: string;
    highlight: string;
    subtitle: string;
    modules: TechCardModule[];
  }
> = {
  web: {
    eyebrow: "What We Build",
    heading: "Web Applications Across",
    highlight: "Frontend & Backend.",
    subtitle:
      "From high-converting business sites to multi-user web platforms, written cleanly without template bloat.",
    modules: [
      {
        code: "01 · WEB APPS",
        title: "Full-Stack Next.js & SaaS Platforms",
        tagline: "App Router · Middleware · Role Portals",
        description:
          "Customer dashboards, booking platforms, and collaborative web tools built with React, TypeScript, and PostgreSQL.",
        capabilities: [
          "Server Actions & SSR",
          "Stripe Billing",
          "Role-Based Logins",
          "Real-Time Updates",
        ],
        metricLabel: "Stack",
        metricValue: "Next.js & SQL",
        icon: Code2,
        spanClass: "lg:col-span-7",
      },
      {
        code: "02 · STORES",
        title: "Online Stores & Custom Checkouts",
        tagline: "Shopify · Stripe · Inventory Sync",
        description:
          "Fast-loading storefronts built for easy mobile checkout, quick catalog filtering, and stock syncing.",
        capabilities: [
          "Custom Storefronts",
          "Multi-Currency Pay",
          "Stock Sync Webhooks",
        ],
        metricLabel: "Focus",
        metricValue: "Checkout Speed",
        icon: ShoppingBag,
        spanClass: "lg:col-span-5",
      },
      {
        code: "03 · CONTENT",
        title: "CMS & Marketing Sites",
        tagline: "Sanity · Payload · MDX",
        description:
          "Let your team update pages, publish articles, and launch campaigns themselves with live previews before publishing.",
        capabilities: [
          "Live Draft Previews",
          "Multi-Region Copy",
          "Clean Sitemaps",
        ],
        metricLabel: "Publishing",
        metricValue: "Self-Serve",
        icon: Globe,
        spanClass: "lg:col-span-5",
      },
      {
        code: "04 · HOSTING",
        title: "Deployment, Security & Monitoring",
        tagline: "Vercel · AWS · Automated Backups",
        description:
          "Preview links on every code change, proper security headers, uptime checks, and automated database backups.",
        capabilities: [
          "Rate Limiting",
          "Preview Environments",
          "Error Monitoring",
          "Daily DB Backups",
        ],
        metricLabel: "Workflow",
        metricValue: "CI/CD Ready",
        icon: Shield,
        spanClass: "lg:col-span-7",
      },
    ],
  },
  app: {
    eyebrow: "What We Build",
    heading: "iOS & Android Apps Built for",
    highlight: "Real Users.",
    subtitle:
      "Every step of mobile development covered—from smooth screen design and offline sync to App Store approval.",
    modules: [
      {
        code: "01 · MOBILE",
        title: "Consumer & Business Mobile Apps",
        tagline: "React Native · Flutter · Native Modules",
        description:
          "Customer apps, booking tools, and field team software tuned to open quickly and respond naturally on both platforms.",
        capabilities: [
          "FaceID & Passkeys",
          "Location Services",
          "Camera & Bluetooth",
          "Dark & Light Modes",
        ],
        metricLabel: "Targets",
        metricValue: "iOS & Android",
        icon: Smartphone,
        spanClass: "lg:col-span-7",
      },
      {
        code: "02 · OFFLINE",
        title: "Offline Storage & Background Sync",
        tagline: "SQLite · Local Queues · Reconnect Sync",
        description:
          "Field teams and users on poor connections can keep working offline and sync updates cleanly when signal returns.",
        capabilities: [
          "Local Database",
          "Queued Actions",
          "Conflict Handling",
        ],
        metricLabel: "Reliability",
        metricValue: "Offline Safe",
        icon: Database,
        spanClass: "lg:col-span-5",
      },
      {
        code: "03 · MESSAGING",
        title: "Push Notifications & Live Updates",
        tagline: "APNs · FCM · WebSockets",
        description:
          "Order tracking, chat threads, instant alerts, and deep links that open straight to the right screen inside your app.",
        capabilities: [
          "Deep Linking",
          "Actionable Alerts",
          "Live Status Updates",
        ],
        metricLabel: "Updates",
        metricValue: "Real-Time",
        icon: Layers,
        spanClass: "lg:col-span-5",
      },
      {
        code: "04 · LAUNCH",
        title: "Store Submission & Updates",
        tagline: "Fastlane · TestFlight · Play Console",
        description:
          "Automated app signing, internal beta testing tracks, staged rollouts, and crash reports handled cleanly.",
        capabilities: [
          "Beta TestFlight",
          "Staged Rollouts",
          "Crash Reporting",
          "Store Compliance",
        ],
        metricLabel: "Release Ops",
        metricValue: "Automated CI",
        icon: Rocket,
        spanClass: "lg:col-span-7",
      },
    ],
  },
  ai: {
    eyebrow: "What We Build",
    heading: "Search Tools, Automations &",
    highlight: "Practical AI.",
    subtitle:
      "AI features built to give checked answers, respect permissions, and stay predictable on cost.",
    modules: [
      {
        code: "01 · SEARCH",
        title: "Private Document Search (RAG)",
        tagline: "Vector + Keyword · Source Links",
        description:
          "Turn internal docs, contracts, support tickets, and SQL tables into searchable tools where every answer shows its source.",
        capabilities: [
          "Semantic + Keyword Search",
          "Clickable Source Links",
          "User Access Rules",
          "Scheduled Doc Sync",
        ],
        metricLabel: "Grounding",
        metricValue: "Source Cited",
        icon: Sparkles,
        spanClass: "lg:col-span-7",
      },
      {
        code: "02 · WORKFLOWS",
        title: "Task & Inbox Automation",
        tagline: "CRM Sync · Webhooks · Human Checks",
        description:
          "Triage incoming leads, extract order details, update records, and hold sensitive steps for quick human sign-off.",
        capabilities: [
          "Typed JSON Outputs",
          "Retry Handling",
          "Approval Gates",
        ],
        metricLabel: "Safety",
        metricValue: "Human Reviewed",
        icon: Bot,
        spanClass: "lg:col-span-5",
      },
      {
        code: "03 · EXTRACTION",
        title: "Document Reading & OCR",
        tagline: "PDFs · Invoices · Scanned Forms",
        description:
          "Pull structured rows out of invoices, receipts, and scanned forms directly into your database with confidence flags.",
        capabilities: [
          "PDF & Image Parsing",
          "Field Validation",
          "Exception Queue",
        ],
        metricLabel: "Format",
        metricValue: "Clean Data",
        icon: Cpu,
        spanClass: "lg:col-span-5",
      },
      {
        code: "04 · CONTROLS",
        title: "Evaluations, Guardrails & Routing",
        tagline: "Multi-Provider · Cost Caps · Privacy",
        description:
          "Switch cleanly between model providers, mask sensitive user fields, and run accuracy checks before shipping changes.",
        capabilities: [
          "PII Masking",
          "Accuracy Test Runs",
          "Spend Limits",
          "Provider Fallback",
        ],
        metricLabel: "Lock-In",
        metricValue: "Model Agnostic",
        icon: Lock,
        spanClass: "lg:col-span-7",
      },
    ],
  },
  "custom-software": {
    eyebrow: "What We Build",
    heading: "Custom Systems Built for",
    highlight: "Your Operations.",
    subtitle:
      "Replace fragile spreadsheets and disconnected apps with software built directly around how your business works.",
    modules: [
      {
        code: "01 · PORTALS",
        title: "Custom Internal Tools & ERPs",
        tagline: "Workflows · Reporting · Portals",
        description:
          "Centralize orders, inventory, billing cycles, client onboarding, and staff approvals in one fast internal system.",
        capabilities: [
          "Staff & Client Views",
          "Approval Workflows",
          "Billing & Invoicing",
          "CSV / PDF Exports",
        ],
        metricLabel: "Codebase",
        metricValue: "100% Owned",
        icon: Boxes,
        spanClass: "lg:col-span-7",
      },
      {
        code: "02 · APIS",
        title: "Integrations & Legacy Sync",
        tagline: "REST · GraphQL · ERP Webhooks",
        description:
          "Bridge accounting software, shipping providers, payment rails, and older databases with dependable queue retries.",
        capabilities: [
          "Idempotent Webhooks",
          "Failed-Job Retries",
          "Typed Contracts",
        ],
        metricLabel: "Sync",
        metricValue: "Retry Safe",
        icon: Workflow,
        spanClass: "lg:col-span-5",
      },
      {
        code: "03 · BACKEND",
        title: "Background Workers & Heavy Jobs",
        tagline: "Node.js · Python · Go · Queues",
        description:
          "Run batch exports, scheduled reports, and data imports in background queues so user screens always stay fast.",
        capabilities: [
          "Async Job Workers",
          "Query Indexing",
          "Container Deploy",
        ],
        metricLabel: "Processing",
        metricValue: "Async Queues",
        icon: Server,
        spanClass: "lg:col-span-5",
      },
      {
        code: "04 · SECURITY",
        title: "Permissions, SSO & Audit History",
        tagline: "Role Scopes · Workspace Isolation · Logs",
        description:
          "Keep customer accounts separated, support company single sign-on, and store exportable logs of important edits.",
        capabilities: [
          "Company SSO",
          "Workspace Isolation",
          "Encrypted Secrets",
          "Activity History",
        ],
        metricLabel: "Governance",
        metricValue: "Audit Ready",
        icon: Cloud,
        spanClass: "lg:col-span-7",
      },
    ],
  },
};

export default function ServiceTechnologies({
  serviceType,
}: ServiceTechnologiesProps) {
  const section = SERVICE_MODULES[serviceType];

  return (
    <section
      id="technologies"
      className="w-full py-16 sm:py-24 bg-[#050608] text-white border-y border-white/[0.06] overflow-x-clip"
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.1] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[#35dbd3] mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0CABA3]" />
              {section.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              {section.heading}{" "}
              <span className="text-[#0CABA3]">{section.highlight}</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/60 max-w-md leading-relaxed">
            {section.subtitle}
          </p>
        </div>

        {/* Asymmetric 12-Col Obsidian Bento Grid (7+5, 5+7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {section.modules.map((mod) => {
            const Icon = mod.icon;

            return (
              <BentoCard
                key={mod.code}
                surface="dark"
                className={`${mod.spanClass} p-7 sm:p-9 flex flex-col justify-between gap-7`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-[#35dbd3] mb-1.5">
                        {mod.code}
                      </span>
                      <span className="text-xs font-mono text-white/45">
                        {mod.tagline}
                      </span>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0CABA3]/15 border border-[#0CABA3]/35 text-[#35dbd3] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Copy */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                    {mod.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
                    {mod.description}
                  </p>
                </div>

                {/* Bottom Capabilities + Metric Pill */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {mod.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-lg bg-white/[0.045] border border-white/[0.08] px-2.5 py-1 text-[11px] font-medium text-white/80"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="shrink-0 sm:text-right">
                    <span className="block text-[10px] font-mono uppercase tracking-[0.16em] text-white/40">
                      {mod.metricLabel}
                    </span>
                    <span className="text-base font-bold font-mono text-[#35dbd3]">
                      {mod.metricValue}
                    </span>
                  </div>
                </div>
              </BentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
