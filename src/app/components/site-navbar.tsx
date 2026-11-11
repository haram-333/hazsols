"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import HazsolsLogo from "./hazsols-logo";
import VisitorClock from "./visitor-clock";
import ThemeToggle from "./theme-toggle";
import TextRollButton from "./text-roll-button";

const SERVICE_LINKS = [
  {
    href: "/services/web",
    label: "Web Development",
    description: "Fast websites & Next.js apps",
  },
  {
    href: "/services/app",
    label: "Mobile App Development",
    description: "iOS & Android mobile apps",
  },
  {
    href: "/services/ai",
    label: "AI & Automation",
    description: "Workflow automation & AI chat tools",
  },
  {
    href: "/services/custom-software",
    label: "Custom Software & APIs",
    description: "Internal portals, APIs & ERPs",
  },
];

interface SiteNavbarProps {
  floating?: boolean;
}

export default function SiteNavbar({ floating = false }: SiteNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuAnimating, setMenuAnimating] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      setScrolledDown(window.scrollY > 240);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isProjectsActive = pathname?.startsWith("/projects") ?? false;
  const isServicesActive = pathname?.startsWith("/services") ?? false;

  const openMenu = () => {
    setMobileMenuOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMenuAnimating(true);
      });
    });
  };

  const closeMenu = () => {
    setMenuAnimating(false);
    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 500);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinkClass = (active: boolean) =>
    `relative text-[13.5px] xl:text-[14px] transition-colors duration-300 font-medium whitespace-nowrap after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-[#0CABA3] after:transition-all after:duration-300 ${
      active
        ? "text-[#0CABA3] after:w-full"
        : "text-gray-900 dark:text-gray-100 hover:text-[#0CABA3] after:w-0 hover:after:w-full"
    }`;

  const dockLinkClass = (active: boolean) =>
    `px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
      active
        ? "bg-[#0CABA3]/15 text-[#0CABA3]"
        : "text-gray-700 dark:text-gray-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] hover:text-gray-900 dark:hover:text-white"
    }`;

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          1. ANIMATED MOBILE BOTTOM-SHEET MENU DRAWER
          ════════════════════════════════════════════════════════════ */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999999] flex flex-col justify-end pointer-events-auto"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100dvh",
              zIndex: 9999999,
            }}
          >
            {/* Backdrop */}
            <div
              onClick={closeMenu}
              className={`absolute inset-0 bg-black/65 dark:bg-black/75 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                menuAnimating ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Bottom Sheet */}
            <div
              className={`relative z-10 w-full max-w-lg mx-auto bg-white dark:bg-[#131419] rounded-t-[32px] sm:rounded-b-[32px] p-6 sm:p-8 shadow-[0_-15px_50px_rgba(0,0,0,0.35)] border-t border-gray-100 dark:border-white/10 flex flex-col overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${
                menuAnimating ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ maxHeight: "88dvh" }}
            >
              {/* Header (Logo Only + Clock + Close) */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-white/10">
                <Link href="/" onClick={closeMenu} className="group flex items-center gap-3">
                  <div className="w-10 h-10 relative flex items-center justify-center">
                    <HazsolsLogo
                      size={36}
                      surface="auto"
                      animation="hover"
                      ariaLabel="Hazsols Solutions Logo"
                    />
                  </div>
                  <VisitorClock
                    className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400"
                    iconClassName="w-3 h-3 text-[#0CABA3]"
                    placeholderWidthClassName="w-20"
                  />
                </Link>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={closeMenu}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2.5 py-6">
                <Link
                  href="/projects"
                  onClick={closeMenu}
                  className={`text-[24px] sm:text-[28px] font-semibold transition-colors py-1 flex items-center justify-between ${
                    isProjectsActive
                      ? "text-[#0CABA3]"
                      : "text-gray-900 dark:text-white hover:text-[#0CABA3]"
                  }`}
                >
                  <span>Projects</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">[01]</span>
                </Link>

                <Link
                  href="/about"
                  onClick={closeMenu}
                  className={`text-[24px] sm:text-[28px] font-semibold transition-colors py-1 flex items-center justify-between ${
                    pathname === "/about"
                      ? "text-[#0CABA3]"
                      : "text-gray-900 dark:text-white hover:text-[#0CABA3]"
                  }`}
                >
                  <span>About</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">[02]</span>
                </Link>

                {/* Services Accordion */}
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className={`w-full text-[24px] sm:text-[28px] font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      isServicesActive
                        ? "text-[#0CABA3]"
                        : "text-gray-900 dark:text-white hover:text-[#0CABA3]"
                    }`}
                    aria-expanded={mobileServicesOpen}
                  >
                    <span className="flex items-center gap-2">
                      Services
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          mobileServicesOpen ? "rotate-180 text-[#0CABA3]" : ""
                        }`}
                      />
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">[03]</span>
                  </button>

                  {mobileServicesOpen && (
                    <div className="mt-2.5 pl-3 border-l border-gray-200 dark:border-white/10 flex flex-col gap-2">
                      <Link
                        href="/services"
                        onClick={closeMenu}
                        className={`text-sm font-semibold py-1.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                          pathname === "/services"
                            ? "bg-[#0CABA3]/12 text-[#0CABA3]"
                            : "text-gray-700 dark:text-gray-200 hover:text-[#0CABA3]"
                        }`}
                      >
                        <span>All Services Overview</span>
                        <ArrowUpRight className="w-4 h-4 opacity-70" />
                      </Link>
                      {SERVICE_LINKS.map((srv) => (
                        <Link
                          key={srv.href}
                          href={srv.href}
                          onClick={closeMenu}
                          className={`text-sm font-medium py-1.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                            pathname === srv.href
                              ? "bg-[#0CABA3]/12 text-[#0CABA3]"
                              : "text-gray-600 dark:text-gray-300 hover:text-[#0CABA3]"
                          }`}
                        >
                          <span>{srv.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/process"
                  onClick={closeMenu}
                  className={`text-[24px] sm:text-[28px] font-semibold transition-colors py-1 flex items-center justify-between ${
                    pathname === "/process"
                      ? "text-[#0CABA3]"
                      : "text-gray-900 dark:text-white hover:text-[#0CABA3]"
                  }`}
                >
                  <span>How We Do It</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">[04]</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={`text-[24px] sm:text-[28px] font-semibold transition-colors py-1 flex items-center justify-between ${
                    pathname === "/contact"
                      ? "text-[#0CABA3]"
                      : "text-gray-900 dark:text-white hover:text-[#0CABA3]"
                  }`}
                >
                  <span>Connect</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">[05]</span>
                </Link>
              </nav>

              {/* Mobile CTA Button */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="w-full bg-[#0CABA3] hover:bg-[#098f88] text-white py-4 px-6 rounded-full flex items-center justify-between font-semibold text-sm transition-all shadow-[0_10px_25px_rgba(12,171,163,0.35)] active:scale-98"
                >
                  <span>Start a Project</span>
                  <div className="w-8 h-8 rounded-full bg-white text-[#0CABA3] flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>

              {/* Footnote */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                <span>&copy; {new Date().getFullYear()} Hazsols</span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for New Projects
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ════════════════════════════════════════════════════════════
          2. NEW SCROLL-DOWN FLOATING DOCK NAVBAR (Appears when scrolled)
          ════════════════════════════════════════════════════════════ */}
      {mounted &&
        createPortal(
          <div
            className={`fixed top-3.5 inset-x-0 z-[90] flex justify-center px-3 sm:px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolledDown
                ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
                : "-translate-y-6 opacity-0 scale-95 pointer-events-none"
            }`}
            aria-hidden={!scrolledDown}
          >
            <nav
              aria-label="Floating Scroll Navigation"
              className="w-full max-w-5xl bg-white/85 dark:bg-[#111318]/88 backdrop-blur-2xl rounded-full p-1.5 pl-3 sm:pl-4 flex items-center justify-between gap-2 shadow-[0_14px_44px_rgba(0,0,0,0.14)] dark:shadow-[0_18px_52px_rgba(0,0,0,0.72)] border border-black/[0.08] dark:border-white/[0.12]"
            >
              {/* Logo Mark Only */}
              <Link
                href="/"
                className="group flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors shrink-0"
                aria-label="Hazsols Home"
              >
                <HazsolsLogo
                  size={28}
                  surface="auto"
                  animation="hover"
                  ariaLabel="Hazsols Solutions Logo"
                />
              </Link>

              {/* Desktop Compact Links */}
              <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
                <Link href="/projects" className={dockLinkClass(isProjectsActive)}>
                  Projects
                </Link>

                <Link href="/about" className={dockLinkClass(pathname === "/about")}>
                  About
                </Link>

                {/* Scrolled Services Dropdown */}
                <div className="relative group py-1">
                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-1 ${dockLinkClass(isServicesActive)}`}
                  >
                    <span>Services</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </Link>

                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 opacity-0 invisible translate-y-1.5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 z-50">
                    <div className="w-72 rounded-2xl bg-white/95 dark:bg-[#131419]/95 backdrop-blur-2xl border border-black/[0.07] dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.16)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.7)] p-2 flex flex-col gap-1">
                      {SERVICE_LINKS.map((srv) => {
                        const active = pathname === srv.href;
                        return (
                          <Link
                            key={srv.href}
                            href={srv.href}
                            className={`px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                              active
                                ? "bg-[#0CABA3]/12 text-[#0CABA3]"
                                : "hover:bg-gray-100/90 dark:hover:bg-white/[0.06] text-gray-900 dark:text-white"
                            }`}
                          >
                            <div>
                              <div className="text-[13px] font-semibold leading-tight">
                                {srv.label}
                              </div>
                              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                {srv.description}
                              </div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <Link href="/process" className={dockLinkClass(pathname === "/process")}>
                  How We Do It
                </Link>

                <Link href="/contact" className={dockLinkClass(pathname === "/contact")}>
                  Connect
                </Link>
              </div>

              {/* Right Controls */}
              <div className="hidden md:flex items-center gap-2 pr-0.5">
                <ThemeToggle />
                <TextRollButton
                  text="Book a call"
                  href="/contact"
                  theme="orange"
                />
              </div>

              {/* Mobile Compact Controls */}
              <div className="md:hidden flex items-center gap-2 pr-0.5">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openMenu();
                  }}
                  className="min-w-[38px] min-h-[38px] rounded-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="w-4 h-4 pointer-events-none" />
                </button>
              </div>
            </nav>
          </div>,
          document.body
        )}

      {/* ════════════════════════════════════════════════════════════
          3. EXISTING TOP HERO PILL NAVBAR (Full-Width, Logo-Only Brand)
          ════════════════════════════════════════════════════════════ */}
      <div
        className={
          floating
            ? "fixed top-0 inset-x-0 z-50 pointer-events-none"
            : "relative z-40 w-full"
        }
      >
        <div
          className={`w-full px-3 sm:px-5 lg:px-8 xl:px-12 py-2.5 sm:py-3 ${
            floating ? "pointer-events-auto" : ""
          }`}
        >
          <nav
            aria-label="Primary Navigation"
            className="w-full bg-white/95 dark:bg-[#131419]/90 backdrop-blur-xl rounded-full p-[5px] flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)] border border-black/[0.04] dark:border-white/10 transition-colors duration-300"
          >
            {/* LEFT: Logo Mark Only (HAZSOLS text removed) + Desktop Links */}
            <div className="flex items-center">
              <Link
                href="/"
                className="group flex items-center justify-center pl-2 pr-1"
                aria-label="Hazsols Home"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                  <HazsolsLogo
                    size={34}
                    surface="auto"
                    animation="hover"
                    ariaLabel="Hazsols Solutions Logo"
                  />
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-7 pl-3 lg:pl-5 xl:pl-7">
                <Link href="/projects" className={navLinkClass(isProjectsActive)}>
                  Projects
                </Link>

                <Link href="/about" className={navLinkClass(pathname === "/about")}>
                  About
                </Link>

                {/* Services Dropdown */}
                <div className="relative group py-2">
                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-1 ${navLinkClass(isServicesActive)}`}
                  >
                    <span>Services</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </Link>

                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1.5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 z-50">
                    <div className="w-72 rounded-2xl bg-white/95 dark:bg-[#131419]/95 backdrop-blur-2xl border border-black/[0.07] dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.65)] p-2 flex flex-col gap-1">
                      {SERVICE_LINKS.map((srv) => {
                        const active = pathname === srv.href;
                        return (
                          <Link
                            key={srv.href}
                            href={srv.href}
                            className={`px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                              active
                                ? "bg-[#0CABA3]/12 text-[#0CABA3]"
                                : "hover:bg-gray-100/90 dark:hover:bg-white/[0.06] text-gray-900 dark:text-white"
                            }`}
                          >
                            <div>
                              <div className="text-[13px] font-semibold leading-tight">
                                {srv.label}
                              </div>
                              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                {srv.description}
                              </div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                          </Link>
                        );
                      })}

                      <div className="mt-1 pt-1.5 border-t border-gray-100 dark:border-white/10">
                        <Link
                          href="/services"
                          className="px-3.5 py-2 rounded-xl flex items-center justify-between text-[12px] font-semibold text-[#0CABA3] hover:bg-[#0CABA3]/10 transition-colors"
                        >
                          <span>Explore All Services</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/process" className={navLinkClass(pathname === "/process")}>
                  How We Do It
                </Link>

                <Link href="/contact" className={navLinkClass(pathname === "/contact")}>
                  Connect
                </Link>
              </div>
            </div>

            {/* RIGHT (Desktop) */}
            <div className="hidden md:flex items-center gap-2.5 lg:gap-3.5 xl:gap-5 pr-1">
              <VisitorClock />
              <ThemeToggle />
              <TextRollButton
                text="Book a strategy call"
                href="/contact"
                theme="dark"
              />
            </div>

            {/* RIGHT (Mobile Theme + Drawer Trigger) */}
            <div className="md:hidden flex items-center gap-2 mr-1 z-30">
              <ThemeToggle />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openMenu();
                }}
                className="min-w-[40px] min-h-[40px] rounded-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-sm"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 pointer-events-none" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
