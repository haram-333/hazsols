"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import SubpageHero from "@/app/components/subpage-hero";
import TextRollButton from "@/app/components/text-roll-button";
import BentoCard from "@/app/components/bento-card";
import TestimonialsSection from "@/app/components/testimonials-section";
import ContactForm from "@/app/components/contact-form";
import Footer from "@/app/components/footer";

type ProjectCategory =
  | "All"
  | "SaaS & Healthcare"
  | "Business Websites"
  | "E-Commerce"
  | "Booking & Community";

interface ProjectEntry {
  id: string;
  index: string;
  title: string;
  domain: string;
  href: string;
  category: Exclude<ProjectCategory, "All">;
  summary: string;
  built: string[];
  deliverables: string[];
  videoSrc: string;
  posterBg: string;
  spanClass: string;
}

const PROJECTS: ProjectEntry[] = [
  {
    id: "pharmflow",
    index: "01",
    title: "PharmFlow",
    domain: "pharmflow.co.uk",
    href: "https://pharmflow.co.uk/",
    category: "SaaS & Healthcare",
    summary:
      "Consultation triage, safety screening, live OTC stock tracking, and branch analytics used across 500+ UK pharmacies.",
    built: [
      "Built multi-branch consultation workflows and red-flag patient screening screens",
      "Connected live OTC inventory checks directly into pharmacist triage queues",
      "Added team reporting dashboards for regional pharmacy operators",
    ],
    deliverables: ["Web Platform", "Branch Portals", "Next.js & PostgreSQL"],
    videoSrc: "/videos/pharmflow-showcase.mp4",
    posterBg: "bg-[#030B17]",
    spanClass: "lg:col-span-7",
  },
  {
    id: "stroud-green",
    index: "02",
    title: "Stroud Green Windows",
    domain: "stroudgreenwindows.co.uk",
    href: "https://stroudgreenwindows.co.uk/",
    category: "Business Websites",
    summary:
      "Showcase site and quote funnel for bespoke London timber sash windows, slimline aluminium frames, and acoustic glazing across 10,000+ homes.",
    built: [
      "Redesigned product galleries around acoustic ratings and architectural finishes",
      "Built direct quote request flows routed to the measuring and installation team",
      "Structured local London landing pages for clean organic search traffic",
    ],
    deliverables: ["Custom Website", "Quote Funnel", "Technical SEO"],
    videoSrc: "/videos/stroud-green-showcase.mp4",
    posterBg: "bg-[#050B09]",
    spanClass: "lg:col-span-5",
  },
  {
    id: "nesports3",
    index: "03",
    title: "NE Sports 3",
    domain: "nesports3.com",
    href: "https://www.nesports3.com/",
    category: "E-Commerce",
    summary:
      "Online store and custom product showcase for competition 13mm lever powerlifting belts, heavy-duty lifting straps, and tactical training bags.",
    built: [
      "Built fast catalog filtering across competition belt weights, sizes, and hardware",
      "Streamlined cart and mobile checkout for strength athletes buying on phones",
      "Set up order management and inventory sync for direct-to-consumer fulfilment",
    ],
    deliverables: ["Online Store", "Mobile Checkout", "Catalog Management"],
    videoSrc: "/videos/nesports-showcase.mp4",
    posterBg: "bg-[#070709]",
    spanClass: "lg:col-span-5",
  },
  {
    id: "sportal",
    index: "04",
    title: "Sportal",
    domain: "sportal.pk",
    href: "https://sportal.pk/",
    category: "Booking & Community",
    summary:
      "Real-time sports turf booking, squad matchmaking, and tournament brackets linking players with 100+ active venues.",
    built: [
      "Engineered live slot availability and instant venue booking without double-booking",
      "Added squad finder matchmaking and player stats profiles",
      "Built tournament brackets and venue admin scheduling dashboards",
    ],
    deliverables: ["Booking App", "Matchmaking Engine", "Venue Dashboard"],
    videoSrc: "/videos/sportal-showcase.mp4",
    posterBg: "bg-[#07080B]",
    spanClass: "lg:col-span-7",
  },
];

const PROJECT_TABS: ProjectCategory[] = [
  "All",
  "SaaS & Healthcare",
  "Business Websites",
  "E-Commerce",
  "Booking & Community",
];

function ProjectVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("All");

  const visibleProjects =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <main className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-gray-100 overflow-x-clip transition-colors duration-300">
      {/* ── Full-Height Orbital Work Hero ── */}
      <SubpageHero
        indexLabel="01"
        eyebrow="Selected Work"
        orbitPreset="projects"
        title={
          <>
            Products We Have
            <br className="hidden sm:block" />{" "}
            <span className="text-gray-500 dark:text-white/45 font-normal">
              Designed &amp; Shipped.
            </span>
          </>
        }
        description="Real client websites, operational software, online stores, and booking platforms running in production today."
        actions={
          <>
            <TextRollButton
              text="Start your project"
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

      {/* ── Full-Width Asymmetric Bento Portfolio Grid ── */}
      <section className="relative w-full bg-white dark:bg-[#0C0D10] py-16 sm:py-24 border-b border-black/10 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {/* Header + Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
            <div>
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#0CABA3] mb-3">
                Case Studies &amp; Launches
              </span>
              <h2 className="text-[clamp(1.85rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.025em] text-gray-900 dark:text-white">
                Built for real customers.
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filter projects by type"
              className="inline-flex flex-wrap items-center gap-1.5 bg-[#F5F5F5] dark:bg-[#161820] p-1.5 rounded-full border border-black/[0.08] dark:border-white/10 self-start"
            >
              {PROJECT_TABS.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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

          {/* 12-Col Asymmetric Bento Mosaic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
            {visibleProjects.map((project) => (
              <BentoCard
                key={project.id}
                className={`${
                  visibleProjects.length === 1
                    ? "lg:col-span-12"
                    : project.spanClass
                } p-6 sm:p-8 flex flex-col justify-between gap-6`}
              >
                <div>
                  {/* Live Video Showcase Frame */}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative block w-full aspect-[16/10] rounded-2xl overflow-hidden ${project.posterBg} border border-black/[0.06] dark:border-white/[0.08] mb-6`}
                  >
                    <ProjectVideo src={project.videoSrc} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-mono text-white">
                        <Globe className="w-3 h-3 text-[#0CABA3]" />
                        {project.domain}
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition-transform duration-300 group-hover:scale-110">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </a>

                  {/* Meta Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0CABA3]">
                      [{project.index}] {project.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.deliverables.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] px-2.5 py-0.5 text-[11px] font-mono text-gray-700 dark:text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2.5">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed mb-5">
                    {project.summary}
                  </p>

                  {/* Concrete What We Built Bullets */}
                  <ul className="space-y-2 border-t border-black/[0.06] dark:border-white/[0.08] pt-4">
                    {project.built.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-white/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0CABA3] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white hover:text-[#0CABA3] transition-colors"
                  >
                    <span>Visit live site</span>
                    <ArrowUpRight className="w-4 h-4 text-[#0CABA3]" />
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 dark:text-white/55 hover:text-[#0CABA3] transition-colors"
                  >
                    Build something similar →
                  </Link>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <ContactForm />
      <Footer />
    </main>
  );
}

