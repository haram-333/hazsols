'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Aurora from '@/components/ui/aurora';
import HazsolsLogo from './hazsols-logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/axion';
  const hasInlineContact =
    isHome ||
    pathname === '/about' ||
    pathname === '/process' ||
    pathname === '/contact' ||
    (pathname?.startsWith('/services') ?? false);

  return (
    <footer className="relative w-full h-screen min-h-[700px] bg-[#08080a] overflow-hidden select-none border-t border-white/[0.08]">
      
      {/* ── Background Subtle Radial Grid (Matching Sections 4, 6 & 7) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ── Dynamic Aurora WebGL Moving Element (Hazsols Teal Theme) ── */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#065e59', '#0CABA3', '#4be0d8', '#0CABA3', '#065e59']}
          amplitude={1}
          blend={0.5}
          height={0.5}
          speed={3}
          glow={0.6}
          layers={3}
          direction="bottom"
        />
      </div>

      {/* ── Top-Aligned Floating Dark Luxury Footer Card Container ── */}
      <div className="relative z-10 w-full pt-12 md:pt-20 lg:pt-16 pb-16 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* The Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-[#0c0c0e]/90 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.75)] border border-white/[0.08] rounded-2xl md:rounded-3xl overflow-hidden"
        >
          {/* Top Half: Logo + Link Columns */}
          <div className="flex flex-col lg:flex-row justify-between p-8 sm:p-12 lg:p-14 gap-10 lg:gap-16">
            
            {/* Logo Area */}
            <div className="max-w-sm flex flex-col gap-4">
              <Link href="/" className="group inline-flex items-center w-fit">
                <HazsolsLogo
                  variant="horizontal"
                  showSublabel
                  size={46}
                  surface="dark"
                  animation="hover"
                  className="gap-3.5"
                  wordmarkClassName="text-xl md:text-2xl tracking-[0.14em]"
                />
              </Link>

              <p className="text-sm text-white/55 leading-relaxed font-normal">
                Websites, mobile apps, and custom business software designed and built by our dedicated team.
              </p>
            </div>

            {/* Links Columns (3 Columns: Services, Company, Direct) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-14">
              
              {/* Column 1: Services */}
              <div className="flex flex-col gap-3.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white/90">
                  Services
                </h4>
                <ul className="flex flex-col gap-2.5 text-sm font-medium text-white/55">
                  <li>
                    <Link href="/services/web" className="hover:text-[#0CABA3] transition-colors">
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/app" className="hover:text-[#0CABA3] transition-colors">
                      Mobile Apps
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/custom-software" className="hover:text-[#0CABA3] transition-colors">
                      Custom Software
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/ai" className="hover:text-[#0CABA3] transition-colors">
                      AI &amp; Automation
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Company */}
              <div className="flex flex-col gap-3.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white/90">
                  Company
                </h4>
                <ul className="flex flex-col gap-2.5 text-sm font-medium text-white/55">
                  <li>
                    <Link href="/projects" className="hover:text-[#0CABA3] transition-colors">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-[#0CABA3] transition-colors">
                      About Hazsols
                    </Link>
                  </li>
                  <li>
                    <Link href="/process" className="hover:text-[#0CABA3] transition-colors">
                      Our Process
                    </Link>
                  </li>
                  <li>
                    <Link href={isHome ? '#testimonials' : '/#testimonials'} className="hover:text-[#0CABA3] transition-colors">
                      Client Feedback
                    </Link>
                  </li>
                  <li>
                    <Link href={isHome ? '#faq' : '/#faq'} className="hover:text-[#0CABA3] transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Direct */}
              <div className="flex flex-col gap-3.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white/90">
                  Direct
                </h4>
                <ul className="flex flex-col gap-2.5 text-sm font-medium text-white/55">
                  <li>
                    <a 
                      href="mailto:hazsolssolution@gmail.com" 
                      className="hover:text-[#0CABA3] transition-colors break-all"
                    >
                      hazsolssolution@gmail.com
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://wa.me/923434147056" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-[#0CABA3] transition-colors"
                    >
                      +92 343 414 7056
                    </a>
                  </li>
                  <li>
                    <Link href={hasInlineContact ? '#contact' : '/contact'} className="hover:text-[#0CABA3] transition-colors">
                      Project Inquiry
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Copyright + Terms & Privacy + Social Icons */}
          <div className="border-t border-white/[0.08] bg-[#09090b]/90 px-8 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm text-white/45 font-medium">
              <span>&copy; {currentYear} Hazsols. All Rights Reserved.</span>
              <div className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-4 text-xs font-mono tracking-wider uppercase text-white/45">
                <Link href="/terms" className="hover:text-[#0CABA3] transition-colors">
                  Terms
                </Link>
                <span>&bull;</span>
                <Link href="/privacy" className="hover:text-[#0CABA3] transition-colors">
                  Privacy
                </Link>
              </div>
            </div>

            {/* Social Icons Array (40x40px Circles, Hover to Brand Color) */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61574012697327&sk=about"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:bg-[#0CABA3] hover:text-white hover:border-[#0CABA3] hover:shadow-[0_0_20px_rgba(12,171,163,0.4)] transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://x.com/hazsols"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:bg-[#0CABA3] hover:text-white hover:border-[#0CABA3] hover:shadow-[0_0_20px_rgba(12,171,163,0.4)] transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/hazsols/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:bg-[#0CABA3] hover:text-white hover:border-[#0CABA3] hover:shadow-[0_0_20px_rgba(12,171,163,0.4)] transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/hazsols-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:bg-[#0CABA3] hover:text-white hover:border-[#0CABA3] hover:shadow-[0_0_20px_rgba(12,171,163,0.4)] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

          </div>

        </motion.div>

      </div>
    </footer>
  );
}
