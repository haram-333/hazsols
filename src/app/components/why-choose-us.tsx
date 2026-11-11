"use client";

import React from "react";
import {
  Activity,
  Award,
  CheckCircle2,
  Clock,
  Cpu,
  Headphones,
  Layers,
  Lock,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import BentoCard from "./bento-card";

interface WhyChooseUsProps {
  serviceType: "web" | "app" | "ai" | "custom-software";
}

interface AdvantageItem {
  code: string;
  title: string;
  description: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
  darkSurface?: boolean;
  spanClass: string;
}

const ADVANTAGE_SETS: Record<WhyChooseUsProps["serviceType"], AdvantageItem[]> = {
  web: [
    {
      code: "01 · PERFORMANCE",
      title: "Built for Fast Loads & Clear Conversions",
      description:
        "Fast pages keep people reading and improve search visibility. We keep bundles lean and layouts straightforward so visitors know what to do next.",
      metric: "Fast Loading",
      icon: TrendingUp,
      darkSurface: true,
      spanClass: "lg:col-span-7",
    },
    {
      code: "02 · DESIGN",
      title: "Custom Design, Never Cookie-Cutter Themes",
      description:
        "Every component is designed around your business instead of forcing your brand into an off-the-shelf template.",
      metric: "Custom UI",
      icon: Layers,
      spanClass: "lg:col-span-5",
    },
    {
      code: "03 · CADENCE",
      title: "Weekly Staging Links",
      description:
        "Click through live progress every week rather than waiting two months for a big reveal.",
      metric: "Weekly Previews",
      icon: Clock,
      spanClass: "lg:col-span-4",
    },
    {
      code: "04 · SECURITY",
      title: "Safe Defaults From Day One",
      description:
        "Validated inputs, proper session handling, and clean role permissions wired in as standard.",
      metric: "Protected Auth",
      icon: Shield,
      spanClass: "lg:col-span-4",
    },
    {
      code: "05 · SUPPORT",
      title: "Direct Access After Launch",
      description:
        "Updates, dependency patches, and new features handled by the same team that built your site.",
      metric: "100% Code Access",
      icon: Headphones,
      spanClass: "lg:col-span-4",
    },
  ],
  app: [
    {
      code: "01 · FEEL",
      title: "Smooth Gestures & Clean Mobile Layouts",
      description:
        "Fast screen transitions, native feel, and offline caching keep users coming back without annoying lag or freezes.",
      metric: "Native Feel",
      icon: Rocket,
      darkSurface: true,
      spanClass: "lg:col-span-7",
    },
    {
      code: "02 · OFFLINE",
      title: "Tested on Real Phones & Weak Signal",
      description:
        "We test on physical devices and patchy mobile data so forms and actions never get silently lost.",
      metric: "Offline Cache",
      icon: Activity,
      spanClass: "lg:col-span-5",
    },
    {
      code: "03 · STORES",
      title: "App Store & Play Store Handled",
      description:
        "We take care of store listings, certificates, privacy checks, and TestFlight releases.",
      metric: "Full Store Ops",
      icon: Award,
      spanClass: "lg:col-span-4",
    },
    {
      code: "04 · DATA SAFETY",
      title: "Secure Tokens & Device Storage",
      description:
        "Keychain / Keystore storage, biometric sign-in, and clean token refresh keep accounts safe.",
      metric: "Encrypted Tokens",
      icon: Lock,
      spanClass: "lg:col-span-4",
    },
    {
      code: "05 · UPDATES",
      title: "Steady Post-Launch Releases",
      description:
        "Crash monitoring, fast fixes, and ongoing feature sprints as user feedback comes in.",
      metric: "Monitored",
      icon: Headphones,
      spanClass: "lg:col-span-4",
    },
  ],
  ai: [
    {
      code: "01 · ACCURACY",
      title: "Answers Grounded in Your Real Records",
      description:
        "Every response pulls from verified company docs with access permissions enforced—no guessing out of thin air.",
      metric: "Source Cited",
      icon: Sparkles,
      darkSurface: true,
      spanClass: "lg:col-span-7",
    },
    {
      code: "02 · FLEXIBILITY",
      title: "No Model Provider Lock-In",
      description:
        "Switch smoothly between OpenAI, Anthropic, Gemini, or self-hosted models as pricing and needs change.",
      metric: "Provider Agnostic",
      icon: Cpu,
      spanClass: "lg:col-span-5",
    },
    {
      code: "03 · CHECKS",
      title: "Tested Before Every Change",
      description:
        "Test cases verify accuracy on real questions before any prompt or index update goes live.",
      metric: "Automated Checks",
      icon: CheckCircle2,
      spanClass: "lg:col-span-4",
    },
    {
      code: "04 · PRIVACY",
      title: "Your Data Stays Private",
      description:
        "PII masking, access boundaries, and private APIs ensure your files never train public models.",
      metric: "Private Data",
      icon: Lock,
      spanClass: "lg:col-span-4",
    },
    {
      code: "05 · VALUE",
      title: "Built Around Saved Time",
      description:
        "Focused strictly on workflows that remove real manual work or speed up customer answers.",
      metric: "Practical Scope",
      icon: TrendingUp,
      spanClass: "lg:col-span-4",
    },
  ],
  "custom-software": [
    {
      code: "01 · OWNERSHIP",
      title: "Full Code Ownership & Zero Seat Fees",
      description:
        "Stop twisting your workflow around rigid SaaS tools. Own clean repositories built directly around your process.",
      metric: "Clean Codebase",
      icon: Award,
      darkSurface: true,
      spanClass: "lg:col-span-7",
    },
    {
      code: "02 · STRUCTURE",
      title: "Maintainable For Years to Come",
      description:
        "Clear module boundaries, typed APIs, and automated tests make it easy for any future developer to jump in.",
      metric: "Typed & Tested",
      icon: Layers,
      spanClass: "lg:col-span-5",
    },
    {
      code: "03 · DIRECT TEAM",
      title: "Talk Straight to the Builders",
      description:
        "Work directly with the engineers writing your software instead of filtering requests through layers of managers.",
      metric: "Direct Builders",
      icon: Clock,
      spanClass: "lg:col-span-4",
    },
    {
      code: "04 · DEPLOYMENT",
      title: "Calm, Predictable Releases",
      description:
        "Tested migrations, health checks, and clean staging previews mean Friday deploys aren't stressful.",
      metric: "Safe Deploys",
      icon: Shield,
      spanClass: "lg:col-span-4",
    },
    {
      code: "05 · HANDOVER",
      title: "Clear Docs & Long-Term Support",
      description:
        "Setup notes, walkthroughs, and flexible ongoing maintenance once your team goes live.",
      metric: "Full Docs",
      icon: Headphones,
      spanClass: "lg:col-span-4",
    },
  ],
};

export default function WhyChooseUs({ serviceType }: WhyChooseUsProps) {
  const items = ADVANTAGE_SETS[serviceType];

  return (
    <section className="w-full py-16 sm:py-24 bg-white dark:bg-[#0C0D10] text-gray-900 dark:text-white border-t border-black/[0.06] dark:border-white/[0.07] transition-colors duration-300">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0CABA3]" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-gray-500 dark:text-white/50">
                Why Hazsols
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Why Teams Work With{" "}
              <span className="text-[#0CABA3]">Hazsols.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-600 dark:text-white/60 max-w-md leading-relaxed">
            Weekly staging previews, clean maintainable code, and direct access
            to the people writing your product.
          </p>
        </div>

        {/* Asymmetric 12-Col Bento Mosaic: 7 + 5 Top, 4 + 4 + 4 Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <BentoCard
                key={item.code}
                surface={item.darkSurface ? "dark" : "auto"}
                className={`${item.spanClass} p-7 sm:p-9 flex flex-col justify-between gap-7`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-[0.2em] ${
                      item.darkSurface ? "text-[#35dbd3]" : "text-[#0CABA3]"
                    }`}
                  >
                    {item.code}
                  </span>

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                      item.darkSurface
                        ? "bg-[#0CABA3]/18 border border-[#0CABA3]/40 text-[#35dbd3]"
                        : "bg-[#0CABA3]/12 border border-[#0CABA3]/25 text-[#0CABA3]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 ${
                      item.darkSurface
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      item.darkSurface
                        ? "text-white/65"
                        : "text-gray-600 dark:text-white/60"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className={`pt-4 border-t flex items-center justify-between ${
                    item.darkSurface
                      ? "border-white/[0.08]"
                      : "border-black/[0.07] dark:border-white/[0.08]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono uppercase tracking-[0.18em] ${
                      item.darkSurface
                        ? "text-white/45"
                        : "text-gray-400 dark:text-white/40"
                    }`}
                  >
                    In Practice
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                      item.darkSurface
                        ? "bg-[#0CABA3]/20 text-[#35dbd3]"
                        : "bg-[#0CABA3]/12 text-[#0CABA3]"
                    }`}
                  >
                    {item.metric}
                  </span>
                </div>
              </BentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
