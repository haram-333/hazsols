"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import SubpageHero from "@/app/components/subpage-hero";
import ContactForm from "@/app/components/contact-form";
import Footer from "@/app/components/footer";
import VisitorClock from "@/app/components/visitor-clock";
import BentoCard from "@/app/components/bento-card";
import TextRollButton from "@/app/components/text-roll-button";

const SERVICE_SCOPES = [
  {
    label: "Web Development",
    href: "/services/web",
  },
  {
    label: "Mobile App Development",
    href: "/services/app",
  },
  {
    label: "AI & Machine Learning",
    href: "/services/ai",
  },
  {
    label: "Custom Software & APIs",
    href: "/services/custom-software",
  },
];

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hazsolssolution@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable; ignore gracefully
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-gray-100 overflow-x-clip transition-colors duration-300">
      {/* ── Orbital Hub Hero ── */}
      <SubpageHero
        compact
        eyebrow="Connect With Hazsols"
        orbitPreset="contact"
        title={
          <>
            Get In Touch.
            <br className="hidden sm:block" />{" "}
            <span className="text-gray-500 dark:text-white/45 font-normal">
              Let&apos;s Build Something Great.
            </span>
          </>
        }
        description="Ready to start a project or have a quick question? Reach us on email or WhatsApp below, or fill out the form—we reply within 24 hours."
        actions={
          <>
            <TextRollButton
              text="Send project brief"
              href="#contact"
              theme="orange"
              fullWidthOnMobile
            />
            <TextRollButton
              text="Explore capabilities"
              href="/services"
              theme="outline"
              fullWidthOnMobile
            />
          </>
        }
      />

      {/* ── Direct Contact Channels (Full-Width Asymmetric Bento Band) ── */}
      <section className="relative w-full bg-white dark:bg-[#0C0D10] py-12 sm:py-16 border-b border-black/10 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Email Direct Card (5 cols) */}
            <BentoCard className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0CABA3]/12 border border-[#0CABA3]/25 text-[#0CABA3] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Direct Email
                    </div>
                    <a
                      href="mailto:hazsolssolution@gmail.com"
                      className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-[#0CABA3] transition-colors break-all"
                    >
                      hazsolssolution@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#0CABA3] hover:border-[#0CABA3] transition-colors shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Messages go straight to the people building your project—no sales handoffs.
              </p>
            </BentoCard>

            {/* WhatsApp Direct Line Card (4 cols) */}
            <BentoCard className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <a
                href="https://wa.me/923434147056"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 group/wa"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0CABA3]/12 border border-[#0CABA3]/25 text-[#0CABA3] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      WhatsApp &amp; Direct Line
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover/wa:text-[#0CABA3] transition-colors">
                      +92 343 414 7056
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover/wa:text-[#0CABA3] transition-colors" />
              </a>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Fast voice notes or quick scoping chats during global working
                hours.
              </p>
            </BentoCard>

            {/* Response SLA & Local Timezone Bento Card (3 cols Dark Accent) */}
            <BentoCard
              surface="dark"
              className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between gap-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Replies Under 24h
                </span>
                <Sparkles className="w-4 h-4 text-[#0CABA3]" />
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/45 mb-1.5">
                  Your Local Time
                </div>
                <VisitorClock
                  className="flex items-center gap-1.5 text-sm text-white font-medium"
                  iconClassName="w-4 h-4 text-[#0CABA3]"
                  placeholderWidthClassName="w-28"
                />
              </div>
            </BentoCard>

            {/* Full-Width Scope Quick Bar (12 cols) */}
            <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#13151C] border border-black/[0.06] dark:border-white/[0.08] px-5 py-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5 text-[#0CABA3]" />
                Need details on a specific service first?
              </div>
              <div className="flex flex-wrap gap-2">
                {SERVICE_SCOPES.map((srv) => (
                  <Link
                    key={srv.href}
                    href={srv.href}
                    className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] dark:border-white/10 bg-white dark:bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:border-[#0CABA3] hover:text-[#0CABA3] transition-colors"
                  >
                    <span>{srv.label}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Flagship Engineering Contact Form ── */}
      <ContactForm />

      <Footer />
    </main>
  );
}
