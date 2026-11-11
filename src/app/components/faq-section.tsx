"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  X, 
  ChevronDown, 
  Code2, 
  CreditCard, 
  Workflow, 
  ShieldCheck,
  HelpCircle
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "dev" | "pricing" | "process" | "support";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // ── 1. Web & Mobile Development ──
  {
    id: "tech-stack",
    category: "dev",
    question: "What tech stack do you use to build our projects?",
    answer: "For web platforms, we build with Next.js, React, TypeScript, and Tailwind CSS. For mobile applications, we develop native iOS apps with Swift, native Android apps with Kotlin, or cross-platform solutions with React Native. Backends are powered by Node.js, Python, or Go, paired with PostgreSQL and Redis. We select battle-tested tools that are reliable, performant, and easy for your team to maintain."
  },
  {
    id: "existing-codebase",
    category: "dev",
    question: "Can you take over or rebuild an existing codebase?",
    answer: "Yes. We start with a technical audit to examine code health, test coverage, and architecture. From there, we either refactor legacy modules in phases or rebuild high-priority features without taking your live product offline. You receive a clear scope and timeline before any code is written."
  },
  {
    id: "mobile-apps",
    category: "dev",
    question: "Do you handle App Store and Google Play submissions?",
    answer: "Yes, entirely. We manage Apple Developer and Google Play account setup, generate test builds for TestFlight, run compliance checks, and prepare store metadata and screenshots. Our engineers stay on standby until your app is officially approved and live."
  },

  // ── 2. Pricing & Contracts ──
  {
    id: "billing-models",
    category: "pricing",
    question: "How do you charge for design and development projects?",
    answer: "We offer two transparent pricing structures based on your project requirements. For projects with well-defined scopes and deliverables, we provide a fixed-price contract with milestone-based payments. For ongoing product development, scaling startups, or teams needing dedicated engineers, we work on weekly or monthly sprint retainers."
  },
  {
    id: "payment-terms",
    category: "pricing",
    question: "Do you require full payment upfront?",
    answer: "No. Standard fixed-scope projects are split across milestones: an initial deposit to begin architecture and design, a progress milestone upon staging deployment, and the final payment after testing and live launch. You only release milestone funds as deliverables are reviewed and verified."
  },
  {
    id: "hidden-fees",
    category: "pricing",
    question: "Are there any hidden fees or surprise maintenance costs?",
    answer: "None. Every proposal clearly specifies development hours, third-party infrastructure requirements (such as hosting, databases, or API keys), and post-launch terms. If your requirements change mid-project, we submit a written estimate for your approval before proceeding."
  },

  // ── 3. Process & Communication ──
  {
    id: "progress-tracking",
    category: "process",
    question: "How will our team track progress during development?",
    answer: "We communicate transparently and frequently. You receive access to a private Slack channel with the engineers working on your codebase, along with a shared linear project board. We run weekly live video demos on a staging URL so you can test features and give feedback continuously."
  },
  {
    id: "kickoff-time",
    category: "process",
    question: "How quickly can Hazsols kick off our build?",
    answer: "Most builds kick off within 5 to 7 business days following agreement on scope and technical architecture. We use the first days to establish repositories, staging environments, design tokens, and project milestones so development begins at full speed."
  },
  {
    id: "code-ownership",
    category: "process",
    question: "Who owns the intellectual property and source code?",
    answer: "You do. 100% of the custom code, designs, database schemas, and documentation created for your project belong exclusively to your company upon final milestone payment. We push code directly to your private GitHub or GitLab repository."
  },

  // ── 4. Launch & Ongoing Support ──
  {
    id: "post-launch-warranty",
    category: "support",
    question: "What happens after our site or app is launched?",
    answer: "Every project includes a complimentary 30-day post-launch warranty. During this period, our team actively monitors error logs, patches unexpected edge-case bugs, and optimizes performance under real traffic. After 30 days, we offer optional monthly maintenance retainers for continuous improvements and security updates."
  },
  {
    id: "hosting-infrastructure",
    category: "support",
    question: "Do you configure hosting, CI/CD pipelines, and cloud databases?",
    answer: "Yes. We configure automated CI/CD deployment pipelines on Vercel, AWS, Google Cloud, or DigitalOcean. We set up SSL encryption, automated database backups, staging preview branches, and server health alerts so your deployment workflow is fully automated."
  },
  {
    id: "emergency-support",
    category: "support",
    question: "What is your protocol if an urgent issue or downtime occurs?",
    answer: "For clients on our maintenance plans, we monitor uptime 24/7 with automated alert triggers. If an outage or breaking issue is detected, our on-call engineers are notified immediately to diagnose the root cause, roll back or patch the service, and provide an incident summary."
  }
];

const CATEGORIES = [
  {
    id: "dev",
    title: "Web & Mobile Development",
    subtitle: "Tech stack, frameworks & apps",
    icon: Code2,
    count: 3
  },
  {
    id: "pricing",
    title: "Pricing & Contracts",
    subtitle: "Milestones, retainers & terms",
    icon: CreditCard,
    count: 3
  },
  {
    id: "process",
    title: "Process & Communication",
    subtitle: "Demos, Slack & kickoff",
    icon: Workflow,
    count: 3
  },
  {
    id: "support",
    title: "Launch & Ongoing Support",
    subtitle: "Warranties, hosting & SLAs",
    icon: ShieldCheck,
    count: 3
  }
];

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string>("tech-stack");

  // Filter FAQ items by search and active category
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory ? item.category === activeCategory : true;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q || 
        item.question.toLowerCase().includes(q) || 
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  const handleCategoryClick = (catId: string) => {
    setActiveCategory((prev) => (prev === catId ? null : catId));
  };

  return (
    <section
      id="faq"
      className="relative w-full max-w-full bg-[#08080a] text-white py-24 sm:py-32 lg:py-36 overflow-hidden select-none border-t border-b border-white/[0.08]"
    >
      {/* ── Background: Axion Standard Subtle Radial Grid & Ambient Bloom ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Atmospheric Ambient Stage Glow matching Expertise and Contact sections */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#c8f04a]/[0.02] blur-[140px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* ── Section Header (Axion Studio Standard) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            {/* Numbered Pill Badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] sm:text-[12px] font-bold flex items-center justify-center">
                6
              </div>
              <div className="text-[12px] sm:text-[13px] font-mono font-semibold tracking-wider border border-white/10 rounded-full px-4 py-1 text-white/90 bg-white/[0.04] backdrop-blur-md">
                FREQUENTLY ASKED QUESTIONS
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.04] tracking-[-0.03em] text-white">
              Everything you need to know.<br className="hidden sm:block" />
              <span className="text-white/40 font-normal"> Clear answers on process, timelines &amp; pricing.</span>
            </h2>
          </div>

          <p className="text-[15px] sm:text-[16px] leading-relaxed text-gray-400 max-w-md font-normal pb-1">
            Common questions about how we structure projects, manage communication, write custom software, and support your team post-launch.
          </p>
        </div>

        {/* ── Glass Search Bar (Hazsols Axion Style) ── */}
        <div className="w-full max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="relative flex items-center w-full h-[60px] sm:h-[68px] rounded-full bg-[#0c0c0e] border border-white/10 hover:border-white/20 backdrop-blur-xl px-6 transition-all duration-300 focus-within:border-[#0CABA3] focus-within:shadow-[0_0_24px_rgba(12,171,163,0.18)]">
            <Search className="w-5 h-5 text-[#0CABA3] shrink-0 mr-3" />
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full bg-transparent text-white placeholder-white/40 text-[15px] sm:text-[16px] focus:outline-none font-normal"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── 4 Category Cards (Matching Bento Card Visual Language) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#0c0c0e] border transition-all duration-300 cursor-pointer text-left ${
                  isSelected
                    ? "border-[#0CABA3] bg-[#111114] shadow-[0_0_24px_rgba(12,171,163,0.18)]"
                    : "border-white/[0.08] hover:border-white/20 hover:bg-[#111114]"
                }`}
              >
                {/* Round Icon Disc */}
                <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 transition-colors border ${
                  isSelected 
                    ? "bg-[#0CABA3] text-white border-[#0CABA3] shadow-[0_0_15px_rgba(12,171,163,0.3)]" 
                    : "bg-white/[0.05] border-white/10 text-white/80"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-white tracking-tight truncate font-outfit">
                      {cat.title}
                    </h3>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0CABA3] bg-[#0CABA3]/10 px-2.5 py-0.5 rounded-full shrink-0 border border-[#0CABA3]/20">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-gray-400 truncate font-normal">
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Filter Pill Status */}
        {activeCategory && (
          <div className="flex items-center justify-between mb-5 px-1">
            <span className="text-xs font-mono text-white/60 tracking-wider uppercase">
              Topic: <strong className="text-[#0CABA3]">{CATEGORIES.find(c => c.id === activeCategory)?.title}</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="text-xs font-mono text-white/50 hover:text-white underline cursor-pointer"
            >
              Show all topics
            </button>
          </div>
        )}

        {/* ── Smooth One-at-a-Time Accordion ── */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#111114] border-[#0CABA3]/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                      : "bg-[#0c0c0e] border-white/[0.08] hover:border-white/20 hover:bg-[#111114]"
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] sm:text-[18px] font-medium text-white tracking-tight leading-snug">
                      {item.question}
                    </span>

                    {/* Circular Chevron Disc */}
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#0CABA3] border-[#0CABA3] text-white rotate-180 shadow-[0_0_15px_rgba(12,171,163,0.3)]"
                        : "bg-white/[0.05] border-white/10 text-white/70"
                    }`}>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </button>

                  {/* Grid-Template-Rows 0fr -> 1fr Smooth CSS Reveal */}
                  <div
                    className="grid transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-gray-300 text-[14.5px] sm:text-[15.5px] leading-relaxed font-normal border-t border-white/[0.08] mt-1">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#0c0c0e] border border-white/[0.08]">
              <HelpCircle className="w-8 h-8 text-[#0CABA3] mx-auto mb-3 opacity-70" />
              <p className="text-white text-lg font-medium mb-1">
                No questions match your search.
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Try searching with different terms or reset your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="px-5 py-2 rounded-full bg-white/[0.06] border border-white/15 hover:border-[#0CABA3] text-white text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
