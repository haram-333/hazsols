"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Mail, MessageCircle, Scale, ShieldCheck } from "lucide-react";
import SubpageHero from "./subpage-hero";
import Footer from "./footer";
import BentoCard from "./bento-card";

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  subsectionTitle?: string;
  bullets?: Array<{ label?: string; text: string }>;
  contactBox?: {
    email: string;
    phone: string;
    note?: string;
  };
}

interface LegalDocumentLayoutProps {
  docType: "privacy" | "terms";
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
}

export default function LegalDocumentLayout({
  docType,
  eyebrow,
  title,
  description,
  sections,
}: LegalDocumentLayoutProps) {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    setLastUpdated(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const isPrivacy = docType === "privacy";

  return (
    <main className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-gray-100 overflow-x-clip transition-colors duration-300">
      {/* ── Legal Orbital Hero Band ── */}
      <SubpageHero
        compact
        orbitPreset="legal"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      {/* ── Full-Width Swiss Editorial Reader ── */}
      <section className="relative w-full bg-white dark:bg-[#0C0D10] py-16 sm:py-24 transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Table of Contents + Document Metadata Switcher */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start flex flex-col gap-5">
              <BentoCard className="p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#0CABA3]">
                    {isPrivacy ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : (
                      <Scale className="w-4 h-4" />
                    )}
                    Legal Docs
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-[#0CABA3]" />
                    {lastUpdated ? `Updated ${lastUpdated}` : "Effective Today"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-white/10">
                  <Link
                    href="/privacy"
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold text-center transition-colors ${
                      isPrivacy
                        ? "bg-gray-900 dark:bg-[#0CABA3] text-white"
                        : "bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 hover:text-[#0CABA3]"
                    }`}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold text-center transition-colors ${
                      !isPrivacy
                        ? "bg-gray-900 dark:bg-[#0CABA3] text-white"
                        : "bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 hover:text-[#0CABA3]"
                    }`}
                  >
                    Terms &amp; Conditions
                  </Link>
                </div>
              </BentoCard>

              <BentoCard className="p-6">
                <div className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#0CABA3] mb-4">
                  CONTENTS INDEX
                </div>
                <nav aria-label="Document Sections" className="flex flex-col gap-1.5">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.05] hover:text-[#0CABA3] transition-colors"
                    >
                      <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500">
                        {sec.number}
                      </span>
                      <span className="font-medium truncate">{sec.title}</span>
                    </a>
                  ))}
                </nav>
              </BentoCard>
            </aside>

            {/* Legal Clauses Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {sections.map((sec) => (
                <BentoCard
                  key={sec.id}
                  enableTilt={false}
                  className="p-7 sm:p-9"
                >
                  <article id={sec.id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-mono font-bold">
                      {sec.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                      {sec.title}
                    </h2>
                  </div>

                  {sec.paragraphs?.map((para, idx) => (
                    <p
                      key={idx}
                      className="text-[15px] sm:text-[16px] leading-[1.7] text-gray-600 dark:text-gray-300 mb-4 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}

                  {sec.subsectionTitle && (
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white mt-5 mb-3">
                      {sec.subsectionTitle}
                    </h3>
                  )}

                  {sec.bullets && (
                    <ul className="mt-3 space-y-2.5">
                      {sec.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0CABA3] mt-2 shrink-0" />
                          <span>
                            {bullet.label && (
                              <strong className="text-gray-900 dark:text-white font-semibold">
                                {bullet.label}:{" "}
                              </strong>
                            )}
                            {bullet.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.contactBox && (
                    <div className="mt-5 rounded-2xl bg-white dark:bg-[#0C0D10] border border-black/[0.07] dark:border-white/10 p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                      <a
                        href={`mailto:${sec.contactBox.email}`}
                        className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:text-[#0CABA3] transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[#0CABA3]" />
                        <span>{sec.contactBox.email}</span>
                      </a>

                      <a
                        href="https://wa.me/923434147056"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:text-[#0CABA3] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-[#0CABA3]" />
                        <span>{sec.contactBox.phone}</span>
                      </a>
                    </div>
                  )}
                  </article>
                </BentoCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

