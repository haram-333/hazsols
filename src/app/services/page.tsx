"use client";

import React from "react";
import SubpageHero from "@/app/components/subpage-hero";
import TextRollButton from "@/app/components/text-roll-button";
import ServiceCards from "@/app/components/service-cards";
import FAQSection from "@/app/components/faq-section";
import ContactForm from "@/app/components/contact-form";
import Footer from "@/app/components/footer";

export default function ServicesOverviewPage() {
  return (
    <main className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-gray-100 overflow-x-clip transition-colors duration-300">
      {/* ── Services Hero ── */}
      <SubpageHero
        indexLabel="01"
        eyebrow="Services"
        orbitPreset="services"
        title={
          <>
            Software Built For
            <br className="hidden sm:block" />{" "}
            <span className="text-gray-500 dark:text-white/45 font-normal">
              Real Businesses.
            </span>
          </>
        }
        description="See what we build across websites, web apps, iOS & Android apps, custom internal software, and practical AI integrations."
        actions={
          <>
            <TextRollButton
              text="Start a project"
              href="#contact"
              theme="orange"
              fullWidthOnMobile
            />
            <TextRollButton
              text="Our process"
              href="/process"
              theme="outline"
              fullWidthOnMobile
            />
          </>
        }
      />

      {/* ── Flagship Dark Bento Directory ── */}
      <section className="relative w-full bg-[#08080a] text-white py-20 sm:py-28 lg:py-32 overflow-x-clip border-b border-white/[0.08]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0CABA3]/[0.04] blur-[140px] pointer-events-none" />

        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] font-bold flex items-center justify-center">
                  1
                </div>
                <div className="text-[12px] sm:text-[13px] font-mono font-semibold tracking-wider border border-white/10 rounded-full px-4 py-1 text-white/90 bg-white/[0.04] backdrop-blur-md">
                  PICK A SERVICE
                </div>
              </div>

              <h2 className="text-[clamp(2rem,5vw,3.8rem)] font-medium leading-[1.06] tracking-[-0.03em] text-white">
                What we design and build.
              </h2>
            </div>

            <p className="text-[15px] text-gray-400 max-w-md leading-relaxed">
              Click any card below to see how we work on it, what tech we use,
              and how a typical project runs.
            </p>
          </div>

          <ServiceCards />
        </div>
      </section>

      <FAQSection />
      <ContactForm />
      <Footer />
    </main>
  );
}

