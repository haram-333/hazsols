"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Cpu,
  Eye,
  GitBranch,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageHero from "@/app/components/subpage-hero";
import TextRollButton from "@/app/components/text-roll-button";
import ContactForm from "@/app/components/contact-form";
import Footer from "@/app/components/footer";
import BentoCard from "@/app/components/bento-card";

const CORE_VALUES = [
  {
    index: "01",
    title: "Ship Every Week",
    description:
      "We share working staging links regularly instead of disappearing for months at a time.",
    icon: Zap,
    spanClass: "lg:col-span-7",
  },
  {
    index: "02",
    title: "Dependable Delivery",
    description:
      "When we commit to a feature or deadline, we stay on top of it through launch and beyond.",
    icon: ShieldCheck,
    spanClass: "lg:col-span-5",
  },
  {
    index: "03",
    title: "Do The Details Right",
    description:
      "Clean mobile views, proper error states, and solid code—even on parts clients never see.",
    icon: Sparkles,
    spanClass: "lg:col-span-5",
  },
  {
    index: "04",
    title: "Plain, Honest Updates",
    description:
      "Direct, clear communication with no jargon or hidden surprises along the way.",
    icon: MessageSquare,
    spanClass: "lg:col-span-7",
  },
];

const CAPABILITY_LINKS = [
  {
    tag: "01",
    title: "Web Development",
    summary: "Fast websites, client portals, and Next.js web applications.",
    href: "/services/web",
    spanClass: "lg:col-span-7",
  },
  {
    tag: "02",
    title: "Mobile Applications",
    summary: "iOS and Android apps built with Flutter and React Native.",
    href: "/services/app",
    spanClass: "lg:col-span-5",
  },
  {
    tag: "03",
    title: "AI & Automation",
    summary: "Document search, customer support assistants, and workflow automation.",
    href: "/services/ai",
    spanClass: "lg:col-span-5",
  },
  {
    tag: "04",
    title: "Custom Software",
    summary: "Internal tools, custom ERPs, APIs, and cloud backends you own outright.",
    href: "/services/custom-software",
    spanClass: "lg:col-span-7",
  },
];

const STUDIO_TELEMETRY = [
  { label: "Weekly Staging Links", detail: "See live builds every week as work progresses", icon: GitBranch },
  { label: "Full Code Ownership", detail: "Everything sits in your GitHub repository", icon: Terminal },
  { label: "Clean Architecture", detail: "Typed APIs, responsive screens & accessible UI", icon: Layers },
  { label: "Modern Web, Mobile & AI", detail: "Next.js, React Native, Flutter & Python", icon: Cpu },
];

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-gray-100 overflow-x-clip transition-colors duration-300">
      {/* ── Orbital Hub Hero ── */}
      <SubpageHero
        indexLabel="01"
        eyebrow="About Hazsols"
        orbitPreset="about"
        title={
          <>
            Real Engineers.
            <br className="hidden sm:block" />{" "}
            <span className="text-gray-500 dark:text-white/45 font-normal">
              Software That Works.
            </span>
          </>
        }
        description="Hazsols is a web, mobile, and custom software studio. We work directly with founders and business teams to design, build, and maintain reliable software."
        actions={
          <>
            <TextRollButton
              text="Get in touch"
              href="#contact"
              theme="orange"
              fullWidthOnMobile
            />
            <TextRollButton
              text="See how we work"
              href="/process"
              theme="outline"
              fullWidthOnMobile
            />
          </>
        }
      />

      {/* ── Section 1: Our Philosophy (Full-Width Asymmetric Bento) ── */}
      <section className="relative w-full bg-white dark:bg-[#0C0D10] py-16 sm:py-24 lg:py-28 border-b border-black/10 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
              1
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider border border-gray-200 dark:border-white/15 rounded-full px-3.5 py-1 text-gray-900 dark:text-white/90 dark:bg-white/[0.04]">
              Our Philosophy
            </div>
          </div>

          <h2 className="text-[clamp(1.65rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.025em] text-gray-900 dark:text-white mb-10 sm:mb-14 max-w-5xl">
            Good software comes from clarity, direct collaboration, and careful work.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Left Narrative Bento Card (7 cols) */}
            <BentoCard className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between gap-8">
              <div>
                <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0CABA3] mb-3">
                  Who We Are
                </span>
                <p className="text-base sm:text-xl leading-[1.68] text-gray-700 dark:text-gray-200 font-normal">
                  We started Hazsols with a simple goal: build websites and software
                  that actually help businesses run better and win customers—without
                  the agency fluff, slow turnarounds, or messy codebases.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Compass className="w-3.5 h-3.5 text-[#0CABA3]" />
                    Talk Direct To Engineers
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Zap className="w-3.5 h-3.5 text-[#0CABA3]" />
                    Clients Across UK, US &amp; Beyond
                  </span>
                </div>

                <div>
                  <TextRollButton
                    text="Work with us"
                    href="#contact"
                    theme="orange"
                  />
                </div>
              </div>
            </BentoCard>

            {/* Right Dark Studio Schematic Bento Card (5 cols - no filler stock photos) */}
            <BentoCard
              surface="dark"
              className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between gap-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#35dbd3]">
                  Operating Standard
                </span>
                <span className="rounded-full bg-white/[0.07] border border-white/[0.1] px-2.5 py-0.5 text-[10px] font-mono text-white/60">
                  HAZSOLS CORE
                </span>
              </div>

              <div className="space-y-3">
                {STUDIO_TELEMETRY.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-3.5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0CABA3]/15 border border-[#0CABA3]/30 text-[#35dbd3]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {item.label}
                        </div>
                        <div className="text-xs text-white/55 mt-0.5">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── Section 2: Mission & Vision (Full-Width Asymmetric Obsidian Bento) ── */}
      <section className="relative w-full bg-[#08080a] text-white py-20 sm:py-28 lg:py-32 overflow-x-clip border-b border-white/[0.08]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-[#0CABA3]/[0.06] blur-[140px] pointer-events-none" />

        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] font-bold flex items-center justify-center">
                  2
                </div>
                <div className="text-[12px] sm:text-[13px] font-mono font-semibold tracking-wider uppercase border border-white/10 rounded-full px-4 py-1 text-white/90 bg-white/[0.04] backdrop-blur-md">
                  Mission &amp; Vision
                </div>
              </div>

              <h2 className="text-[clamp(1.9rem,4.8vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                Why We Do This Work.
              </h2>
            </div>

            <p className="text-[15px] text-gray-400 max-w-md leading-relaxed">
              Every project is built so your team owns a fast, dependable product
              you won&apos;t need to rebuild a year later.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Mission Card (7 cols) */}
            <BentoCard
              surface="dark"
              className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[300px]"
            >
              <div className="flex items-center justify-between gap-4 mb-10">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0CABA3]">
                  [01] OUR MISSION
                </span>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#0CABA3] group-hover:bg-[#0CABA3] group-hover:text-white transition-colors duration-300">
                  <Target className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
                  Our Mission
                </h3>
                <p className="text-[16px] sm:text-[18px] text-gray-300 leading-relaxed font-normal max-w-2xl">
                  Build websites, apps, and custom tools that look sharp, run fast,
                  and solve genuine business problems—delivered cleanly and on time.
                </p>
              </div>
            </BentoCard>

            {/* Vision Card (5 cols) */}
            <BentoCard
              surface="dark"
              className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[300px]"
            >
              <div className="flex items-center justify-between gap-4 mb-10">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0CABA3]">
                  [02] OUR VISION
                </span>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#0CABA3] group-hover:bg-[#0CABA3] group-hover:text-white transition-colors duration-300">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
                  Our Vision
                </h3>
                <p className="text-[16px] sm:text-[18px] text-gray-300 leading-relaxed font-normal">
                  Be the engineering team businesses come back to project after
                  project because the work is reliable and straightforward.
                </p>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── Section 3: Our Core Values (Full-Width Asymmetric 12-Col Bento) ── */}
      <section className="relative w-full bg-[#F5F5F5] dark:bg-[#101115] py-20 sm:py-28 border-b border-black/10 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-semibold flex items-center justify-center">
                  3
                </div>
                <div className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider border border-gray-300 dark:border-white/15 rounded-full px-3.5 py-1 text-gray-900 dark:text-white/90 dark:bg-white/[0.04]">
                  Our Values
                </div>
              </div>

              <h2 className="text-[clamp(1.9rem,4.8vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 dark:text-white">
                How We Work Day to Day.
              </h2>
            </div>

            <p className="text-[15px] text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              Four simple standards we follow on every project from kick-off to
              launch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <BentoCard
                  key={val.index}
                  className={`${val.spanClass} p-7 sm:p-9 flex flex-col justify-between min-h-[240px]`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-semibold text-gray-400 dark:text-gray-500">
                      [{val.index}]
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#0CABA3]/10 border border-[#0CABA3]/20 text-[#0CABA3] flex items-center justify-center group-hover:bg-[#0CABA3] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2.5 tracking-tight">
                      {val.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                      {val.description}
                    </p>
                  </div>
                </BentoCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: Explore Services Asymmetric Bento Strip ── */}
      <section className="relative w-full bg-[#EDEBE6] dark:bg-[#0C0D10] py-16 sm:py-24 border-b border-black/10 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#0CABA3] font-semibold mb-2">
                WHAT WE BUILD
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 dark:text-white">
                Explore our specialized engineering services.
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-[#0CABA3] transition-colors"
            >
              <span>View all services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {CAPABILITY_LINKS.map((cap) => (
              <BentoCard
                key={cap.href}
                href={cap.href}
                wrapperClassName={cap.spanClass}
                className="p-6 sm:p-8 flex flex-col justify-between gap-5 h-full"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#0CABA3]">
                    {cap.tag}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/[0.06] group-hover:bg-[#0CABA3] text-gray-900 dark:text-white group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#0CABA3] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {cap.summary}
                  </p>
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
