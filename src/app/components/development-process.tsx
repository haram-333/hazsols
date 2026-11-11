"use client";

import React from "react";
import ProcessArcTimeline, { ProcessStepItem } from "./process-arc-timeline";

interface DevelopmentProcessProps {
  serviceType: "web" | "app" | "ai" | "custom-software";
}

const PROCESS_STEPS: Record<
  DevelopmentProcessProps["serviceType"],
  {
    subtitle: string;
    steps: ProcessStepItem[];
  }
> = {
  web: {
    subtitle:
      "Click through each step—from initial scope and Figma designs through testing and launch.",
    steps: [
      {
        number: "01",
        phase: "Scope & Plan",
        title: "Goals, Pages & Data Structure",
        duration: "Week 1",
        description:
          "Map out your goals, user flows, key SEO pages, and integrations into a clear build plan.",
        deliverables: ["Page Map", "Data Plan", "Weekly Schedule"],
        icon: "compass",
        metricLabel: "Outcome",
        metricValue: "Clear Scope",
      },
      {
        number: "02",
        phase: "Design",
        title: "UI Design & Interactive Prototype",
        duration: "Weeks 1–2",
        description:
          "Design mobile and desktop screens in Figma along with typography, buttons, and light/dark themes for sign-off.",
        deliverables: ["UI Kit", "Desktop & Mobile Views", "Clickable Prototype"],
        icon: "design",
        metricLabel: "Output",
        metricValue: "Figma System",
      },
      {
        number: "03",
        phase: "Frontend Build",
        title: "Next.js & TypeScript Build",
        duration: "Weeks 2–4",
        description:
          "Turn approved screens into clean, responsive Next.js pages with live preview links shared each week.",
        deliverables: ["Preview URLs", "Responsive Pages", "Animations"],
        icon: "code",
        metricLabel: "Visibility",
        metricValue: "Weekly Previews",
      },
      {
        number: "04",
        phase: "Backend & Data",
        title: "Database, Auth & Integrations",
        duration: "Weeks 3–5",
        description:
          "Connect PostgreSQL, CMS collections, Stripe payments, and user login permissions.",
        deliverables: ["Typed APIs", "CMS Setup", "User Roles"],
        icon: "layers",
        metricLabel: "Code",
        metricValue: "Type-Safe",
      },
      {
        number: "05",
        phase: "Testing",
        title: "Browser QA, SEO & Security Checks",
        duration: "Week 5",
        description:
          "Test speed, color contrast, metadata, mobile responsiveness, and every form or checkout flow before launch.",
        deliverables: ["QA Checklist", "SEO Metadata", "Security Pass"],
        icon: "shield",
        metricLabel: "Check",
        metricValue: "Cross-Browser",
      },
      {
        number: "06",
        phase: "Launch",
        title: "Deployment & Handover",
        duration: "Launch Week",
        description:
          "Go live on your domain cleanly, set up error monitoring and backups, and hand over full repository access.",
        deliverables: ["Live Site", "Monitoring Setup", "Team Handover"],
        icon: "rocket",
        metricLabel: "Access",
        metricValue: "Full Repo IP",
      },
    ],
  },
  app: {
    subtitle:
      "How we take a mobile app from wireframes and local storage through App Store and Google Play approval.",
    steps: [
      {
        number: "01",
        phase: "Product Framing",
        title: "Mobile Flows & Offline Plan",
        duration: "Week 1",
        description:
          "Agree on screens, notifications, offline caching requirements, and hardware features like camera or biometrics upfront.",
        deliverables: ["Screen Flows", "Sync Plan", "Milestone Schedule"],
        icon: "compass",
        metricLabel: "Platforms",
        metricValue: "iOS + Android",
      },
      {
        number: "02",
        phase: "Mobile UI",
        title: "Screen Design & Mobile Ergonomics",
        duration: "Weeks 1–2",
        description:
          "Design thumb-friendly navigation, gestures, and dark/light views tested on actual phone screen sizes.",
        deliverables: ["Mobile UI Kit", "Gesture Spec", "Screen Flows"],
        icon: "design",
        metricLabel: "Focus",
        metricValue: "Native Feel",
      },
      {
        number: "03",
        phase: "Core Build",
        title: "React Native / Flutter Build",
        duration: "Weeks 2–5",
        description:
          "Build modular screens, local SQLite storage, biometric login, and native bridges with regular TestFlight builds.",
        deliverables: ["TestFlight Builds", "Android APK", "Offline Storage"],
        icon: "mobile",
        metricLabel: "Cadence",
        metricValue: "Test Builds",
      },
      {
        number: "04",
        phase: "Sync & Alerts",
        title: "Backend APIs, Push & Crash Logs",
        duration: "Weeks 4–6",
        description:
          "Connect APNs/FCM push notifications, live sync APIs, analytics events, and mobile crash monitoring.",
        deliverables: ["Push Alerts", "Sync Endpoints", "Crash Logs"],
        icon: "layers",
        metricLabel: "Updates",
        metricValue: "Real-Time",
      },
      {
        number: "05",
        phase: "Device Testing",
        title: "Real Phone & Poor Network QA",
        duration: "Week 6",
        description:
          "Test gestures, weak connections, battery impact, and screen notches across real iOS and Android devices.",
        deliverables: ["Device Test Log", "Offline Check", "Privacy Forms"],
        icon: "shield",
        metricLabel: "Coverage",
        metricValue: "Real Hardware",
      },
      {
        number: "06",
        phase: "Store Release",
        title: "App Store & Google Play Launch",
        duration: "Launch Week",
        description:
          "Handle Apple and Google review requirements, release tracks, and over-the-air patch pipelines.",
        deliverables: ["Store Listings", "Signing Setup", "OTA Patches"],
        icon: "rocket",
        metricLabel: "Rollout",
        metricValue: "Managed Launch",
      },
    ],
  },
  ai: {
    subtitle:
      "A grounded way to ship AI—connecting your real company data safely with accuracy checks before launch.",
    steps: [
      {
        number: "01",
        phase: "Use-Case Audit",
        title: "Workflow Selection & Data Check",
        duration: "Week 1",
        description:
          "Pick workflows where automation clearly saves hours, check source document quality, and write test examples.",
        deliverables: ["Test Questions", "Data Audit", "Privacy Rules"],
        icon: "compass",
        metricLabel: "Goal",
        metricValue: "Clear Value",
      },
      {
        number: "02",
        phase: "Knowledge Base",
        title: "Document Parsing & Hybrid Search",
        duration: "Weeks 1–2",
        description:
          "Split documents cleanly, run OCR on scans if needed, apply user permissions, and index vectors alongside keywords.",
        deliverables: ["Search Index", "Access Filters", "Doc Sync"],
        icon: "layers",
        metricLabel: "Search",
        metricValue: "Hybrid Index",
      },
      {
        number: "03",
        phase: "Workflow Logic",
        title: "Tool Actions & Approval Gates",
        duration: "Weeks 2–4",
        description:
          "Wire structured JSON responses, CRM/ERP lookups, human approval steps, and provider fallback routing.",
        deliverables: ["Workflow Graph", "Tool Schemas", "Fallback Routing"],
        icon: "cpu",
        metricLabel: "Replies",
        metricValue: "Source Cited",
      },
      {
        number: "04",
        phase: "Workspace UI",
        title: "Streaming Interface & Source Drawer",
        duration: "Weeks 3–5",
        description:
          "Build fast streaming screens where staff can inspect exact cited pages, review drafts, and confirm actions.",
        deliverables: ["Chat / Copilot UI", "Source Preview", "Review Actions"],
        icon: "sparkles",
        metricLabel: "Transparency",
        metricValue: "Inline Sources",
      },
      {
        number: "05",
        phase: "Safety & Evals",
        title: "Accuracy Checks, PII Rules & Cost Caps",
        duration: "Week 5",
        description:
          "Test prompts against edge cases, redact private fields where required, and put token spend ceilings in place.",
        deliverables: ["Test Results", "PII Filters", "Budget Alerts"],
        icon: "shield",
        metricLabel: "Verification",
        metricValue: "Eval Tested",
      },
      {
        number: "06",
        phase: "Production",
        title: "Go Live & Ongoing Tuning",
        duration: "Launch Week",
        description:
          "Deploy with trace logging and spend alerts so prompts and retrieval keep improving as your docs grow.",
        deliverables: ["Trace Logs", "Prompt History", "Team Handover"],
        icon: "rocket",
        metricLabel: "Lock-In",
        metricValue: "Model Agnostic",
      },
    ],
  },
  "custom-software": {
    subtitle:
      "Six practical stages taking messy manual workflows cleanly into software your team owns and relies on daily.",
    steps: [
      {
        number: "01",
        phase: "Workflow Audit",
        title: "Process Mapping & Data Model",
        duration: "Week 1",
        description:
          "Walk through your current spreadsheets and bottlenecks, cut duplicate steps, and map out tables and APIs clearly.",
        deliverables: ["Data Diagram", "Workflow Notes", "Project Plan"],
        icon: "compass",
        metricLabel: "Clarity",
        metricValue: "Written Spec",
      },
      {
        number: "02",
        phase: "Interface Design",
        title: "Portal Screens & Role Permissions",
        duration: "Weeks 1–2",
        description:
          "Design practical admin tables, bulk actions, filters, and role access screens reviewed with your day-to-day users.",
        deliverables: ["Screen Prototypes", "Role Matrix", "UI Layouts"],
        icon: "design",
        metricLabel: "Usability",
        metricValue: "Built for Staff",
      },
      {
        number: "03",
        phase: "Core Backend",
        title: "Database, Queues & Integrations",
        duration: "Weeks 2–5",
        description:
          "Build tenant tables, retry-safe background jobs, change logs, and connections into accounting or payment tools.",
        deliverables: ["Typed Backend", "Job Queues", "Sync Bridges"],
        icon: "terminal",
        metricLabel: "Reliability",
        metricValue: "Retry Safe",
      },
      {
        number: "04",
        phase: "Application UI",
        title: "Dashboards, Forms & Reporting",
        duration: "Weeks 3–6",
        description:
          "Wire up fast filterable tables, real-time notifications, PDF/CSV exports, and billing or approval flows.",
        deliverables: ["Staff Portals", "Filters & Search", "PDF / CSV Exports"],
        icon: "workflow",
        metricLabel: "Workflow",
        metricValue: "Single System",
      },
      {
        number: "05",
        phase: "Verification",
        title: "Integration Tests & Staff Dry Runs",
        duration: "Week 6",
        description:
          "Test permission boundaries, data imports, and real everyday tasks alongside your team on staging.",
        deliverables: ["Integration Checks", "Role Testing", "Staging Dry Run"],
        icon: "shield",
        metricLabel: "Access",
        metricValue: "Role Isolated",
      },
      {
        number: "06",
        phase: "Ownership",
        title: "Data Migration & Full IP Handover",
        duration: "Launch Week",
        description:
          "Import clean legacy records safely, verify live health checks, and hand over full repository code and setup docs.",
        deliverables: ["Live Cutover", "Setup Docs", "100% Repo IP"],
        icon: "rocket",
        metricLabel: "Ownership",
        metricValue: "Yours Outright",
      },
    ],
  },
};

export default function DevelopmentProcess({
  serviceType,
}: DevelopmentProcessProps) {
  const config = PROCESS_STEPS[serviceType];

  return (
    <ProcessArcTimeline
      eyebrow="Our Process"
      titlePrefix="How We"
      titleHighlight="Build It."
      subtitle={config.subtitle}
      steps={config.steps}
      ctaHref="#contact"
      ctaLabel="Discuss Your Project"
    />
  );
}
