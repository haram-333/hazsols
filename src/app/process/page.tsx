"use client";

import React, { useState } from "react";
import {
  GitBranch,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import SubpageHero from "@/app/components/subpage-hero";
import TextRollButton from "@/app/components/text-roll-button";
import ProcessArcTimeline, {
  ProcessStepItem,
} from "@/app/components/process-arc-timeline";
import BentoCard from "@/app/components/bento-card";
import ContactForm from "@/app/components/contact-form";
import Footer from "@/app/components/footer";

const PROCESS_ARC_STEPS: ProcessStepItem[] = [
  {
    number: "01",
    phase: "Scope & Plan",
    title: "Discovery & Planning",
    duration: "Week 1",
    description:
      "We start by learning how your business works, who uses the product, and what needs to be built first. From there, we map out features and timeline cleanly.",
    deliverables: [
      "Feature Scope & Requirements",
      "Technical Plan & Stack",
      "Weekly Build Schedule",
    ],
    icon: "compass",
    metricLabel: "Outcome",
    metricValue: "Written Scope",
  },
  {
    number: "02",
    phase: "Design",
    title: "Design & Prototyping",
    duration: "Weeks 1–2",
    description:
      "We design wireframes and full Figma screens so you can click through your site or app and sign off on every screen before code starts.",
    deliverables: [
      "Clickable Figma Screens",
      "Colors & Component Library",
      "Mobile & Desktop Views",
    ],
    icon: "design",
    metricLabel: "Design Output",
    metricValue: "Figma System",
  },
  {
    number: "03",
    phase: "Build & Test",
    title: "Development & Testing",
    duration: "Weeks 2–5",
    description:
      "We build your product in weekly sprints and share live staging URLs every week so you can review progress, request changes early, and see features working.",
    deliverables: [
      "Weekly Staging Links",
      "Responsive & Cross-Browser QA",
      "Clean, Documented Code",
    ],
    icon: "code",
    metricLabel: "Check-Ins",
    metricValue: "Weekly Previews",
  },
  {
    number: "04",
    phase: "Launch",
    title: "Deployment & Support",
    duration: "Launch & Care",
    description:
      "We handle hosting, domain setup, monitoring, and app store submissions, then walk your team through managing everything cleanly.",
    deliverables: [
      "Live Production Launch",
      "Error Monitoring & Backups",
      "Team Handover & Support",
    ],
    icon: "rocket",
    metricLabel: "Ownership",
    metricValue: "100% Your IP",
  },
];

const METHODOLOGY_CARDS = [
  {
    index: "01",
    title: "Weekly Builds",
    description:
      "Work runs in short weekly cycles with live preview links, so priorities can adjust without derailing the whole schedule.",
    icon: GitBranch,
    spanClass: "lg:col-span-7",
  },
  {
    index: "02",
    title: "Real Testing",
    description:
      "Every page and API flow gets checked on actual phones and desktop browsers before anything goes live.",
    icon: ShieldCheck,
    spanClass: "lg:col-span-5",
  },
  {
    index: "03",
    title: "Direct Collaboration",
    description:
      "Quick feedback loops directly with the engineers writing your code—no endless middleman meetings.",
    icon: Users,
    spanClass: "lg:col-span-5",
  },
  {
    index: "04",
    title: "Fast, Practical Delivery",
    description:
      "We ship core features quickly without piling up messy shortcuts you have to pay to rewrite later.",
    icon: Zap,
    spanClass: "lg:col-span-7",
  },
];

type ToolCategory = "All" | "Development" | "Design" | "DevOps";

const TOOL_GROUPS: Array<{
  category: Exclude<ToolCategory, "All">;
  spanClass: string;
  description: string;
  tools: string[];
}> = [
  {
    category: "Development",
    spanClass: "md:col-span-5",
    description:
      "Frameworks and languages we use for web apps, APIs, and mobile builds.",
    tools: ["React", "Next.js", "TypeScript", "Node.js", "Python", "Django"],
  },
  {
    category: "Design",
    spanClass: "md:col-span-3",
    description:
      "Tools we use for UI systems, clickable prototypes, and brand assets.",
    tools: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"],
  },
  {
    category: "DevOps",
    spanClass: "md:col-span-4",
    description:
      "Hosting, containers, automated deploys, and uptime monitoring.",
    tools: ["Docker", "AWS", "GitHub", "CI/CD", "Monitoring"],
  },
];

const TOOL_TABS: ToolCategory[] = ["All", "Development", "Design", "DevOps"];

export default function ProcessPage() {
  const [activeToolTab, setActiveToolTab] = useState<ToolCategory>("All");

  const visibleGroups =
    activeToolTab === "All"
      ? TOOL_GROUPS
      : TOOL_GROUPS.filter((g) => g.category === activeToolTab);

  return (
    <main className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-gray-100 overflow-x-clip transition-colors duration-300">
      {/* ── Orbital Hub Hero ── */}
      <SubpageHero
        indexLabel="02"
        eyebrow="How We Do It"
        orbitPreset="process"
        title={
          <>
            How We Work.
            <br className="hidden sm:block" />{" "}
            <span className="text-gray-500 dark:text-white/45 font-normal">
              From First Call To Launch.
            </span>
          </>
        }
        description="A clear four-stage workflow so you always know what we are building, when you can test it, and when it goes live."
        actions={
          <>
            <TextRollButton
              text="Start a project"
              href="#contact"
              theme="orange"
              fullWidthOnMobile
            />
            <TextRollButton
              text="Explore services"
              href="/services"
              theme="outline"
              fullWidthOnMobile
            />
          </>
        }
      />

      {/* ── Section 1: Curved Orbital Arc How-It-Works Flow ── */}
      <ProcessArcTimeline
        eyebrow="01 / Four Stages"
        titlePrefix="Four Steps From Brief to"
        titleHighlight="Launch."
        subtitle="Hover or click any stage to see what happens during that phase and what we hand over."
        steps={PROCESS_ARC_STEPS}
        ctaHref="#contact"
        ctaLabel="Book A Call"
      />

      {/* ── Section 2: Our Methodology (Full-Width Asymmetric Dark Bento) ── */}
      <section className="relative w-full bg-[#08080a] text-white py-20 sm:py-28 lg:py-32 overflow-x-clip border-b border-white/[0.08]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[640px] h-[300px] bg-[#0CABA3]/[0.05] blur-[130px] pointer-events-none" />

        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] font-bold flex items-center justify-center">
                  2
                </div>
                <div className="text-[12px] sm:text-[13px] font-mono font-semibold tracking-wider uppercase border border-white/10 rounded-full px-4 py-1 text-white/90 bg-white/[0.04] backdrop-blur-md">
                  How We Execute
                </div>
              </div>

              <h2 className="text-[clamp(1.9rem,4.6vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                How We Run Projects
              </h2>
            </div>

            <p className="text-[15px] text-gray-400 max-w-md leading-relaxed">
              Four practical commitments we stick to across every sprint and delivery
              milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {METHODOLOGY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <BentoCard
                  key={card.index}
                  surface="dark"
                  className={`${card.spanClass} p-7 sm:p-9 flex flex-col justify-between min-h-[230px]`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-semibold text-white/40">
                      [{card.index}]
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#0CABA3]/12 border border-[#0CABA3]/25 text-[#0CABA3] flex items-center justify-center group-hover:bg-[#0CABA3] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2.5 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl">
                      {card.description}
                    </p>
                  </div>
                </BentoCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Tools & Technologies (Full-Width Asymmetric Bento) ── */}
      <section className="relative w-full bg-[#EDEBE6] dark:bg-[#101115] py-20 sm:py-28 border-b border-black/10 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-semibold flex items-center justify-center">
                  3
                </div>
                <div className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider border border-gray-300 dark:border-white/15 rounded-full px-3.5 py-1 text-gray-900 dark:text-white/90 bg-white/60 dark:bg-white/[0.04]">
                  Tech Stack
                </div>
              </div>

              <h2 className="text-[clamp(1.9rem,4.6vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 dark:text-white">
                Tools &amp; Technologies
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter tool categories"
              className="inline-flex flex-wrap items-center gap-1.5 bg-white dark:bg-[#181A20] p-1.5 rounded-full border border-black/10 dark:border-white/10 shadow-xs self-start"
            >
              {TOOL_TABS.map((tab) => {
                const active = activeToolTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveToolTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-gray-900 dark:bg-[#0CABA3] text-white shadow-xs"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`grid gap-6 ${
              visibleGroups.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-12"
            }`}
          >
            {visibleGroups.map((group) => (
              <BentoCard
                key={group.category}
                className={`${
                  visibleGroups.length === 1 ? "w-full" : group.spanClass
                } p-7 sm:p-9 flex flex-col justify-between gap-6`}
              >
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0CABA3]">
                    {group.category}
                  </span>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F5F5F5] dark:bg-white/[0.06] text-gray-900 dark:text-gray-100 border border-black/[0.06] dark:border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </main>
  );
}
