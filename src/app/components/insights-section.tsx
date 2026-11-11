"use client";

import React from "react";
import {
  Cpu,
  HeartHandshake,
  Landmark,
  LayoutGrid,
  RefreshCw,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import BentoCard from "./bento-card";

interface InsightCard {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const insightCards: InsightCard[] = [
  {
    id: "modern-stack",
    title: "Modern, Proven Stack",
    description:
      "We stick to battle-tested frameworks your future developers can easily work on.",
    category: "Technology",
    icon: Cpu,
  },
  {
    id: "quality",
    title: "Thorough Testing",
    description:
      "Every page and flow is checked across desktop and mobile before launch.",
    category: "QA",
    icon: RefreshCw,
  },
  {
    id: "clean-code",
    title: "Clean, Readable Code",
    description:
      "Type-safe schemas, clear naming, and zero messy shortcuts that slow you down later.",
    category: "Engineering",
    icon: Wrench,
  },
  {
    id: "weekly-demos",
    title: "Weekly Staging Previews",
    description:
      "You get live preview links every week so there are no surprises at handover.",
    category: "Process",
    icon: LayoutGrid,
  },
  {
    id: "direct-support",
    title: "Direct Builder Access",
    description:
      "You talk directly with the engineers building your product—no account-manager telephone.",
    category: "Communication",
    icon: Users,
  },
  {
    id: "room-to-grow",
    title: "Built to Grow With You",
    description:
      "Clean structure so adding features or handling more traffic later stays straightforward.",
    category: "Scale",
    icon: Landmark,
  },
  {
    id: "collaboration",
    title: "Straightforward Feedback",
    description:
      "Honest timelines, plain answers, and fast turnarounds when priorities shift.",
    category: "Partnership",
    icon: HeartHandshake,
  },
  {
    id: "security",
    title: "Sensible Security Basics",
    description:
      "Validated inputs, proper user roles, HTTPS, and regular database backups.",
    category: "Security",
    icon: ShieldCheck,
  },
];

export default function InsightsSection() {
  return (
    <section className="relative w-full bg-[#08080a] text-white py-20 sm:py-28 lg:py-32 overflow-x-clip border-b border-white/[0.08]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[360px] bg-[#0CABA3]/[0.04] blur-[150px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Sticky Editorial Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] font-bold flex items-center justify-center">
                6
              </div>
              <div className="text-[12px] sm:text-[13px] font-mono font-semibold tracking-wider uppercase border border-white/10 rounded-full px-4 py-1 text-white/90 bg-white/[0.04] backdrop-blur-md">
                How We Work
              </div>
            </div>

            <h2 className="text-[clamp(2.2rem,5vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.03em] text-white mb-6">
              Software Built
              <br />
              <span className="text-[#0CABA3]">To Last.</span>
            </h2>

            <p className="text-[15.5px] sm:text-[16.5px] text-gray-400 leading-relaxed max-w-md border-l-2 border-[#0CABA3]/40 pl-4">
              Practical engineering habits we stick to on every website, app, and backend system we ship.
            </p>
          </div>

          {/* Right Asymmetric 12-Col Bento Mosaic */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
            {insightCards.map((card, idx) => {
              const Icon = card.icon;
              const isWide =
                idx === 0 || idx === 3 || idx === 4 || idx === 7;
              return (
                <BentoCard
                  key={card.id}
                  surface="dark"
                  className={`${
                    isWide ? "sm:col-span-7" : "sm:col-span-5"
                  } p-6 sm:p-7 flex flex-col justify-between min-h-[210px]`}
                >
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#0CABA3]/12 border border-[#0CABA3]/25 text-[#0CABA3] flex items-center justify-center group-hover:bg-[#0CABA3] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/45">
                      [{String(idx + 1).padStart(2, "0")}] {card.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#0CABA3] transition-colors tracking-tight mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </BentoCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
