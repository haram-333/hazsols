"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* ── Scroll detection ──────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Lock body scroll when menu open ──────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ── Close on Escape ───────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Fixed Navbar ─────────────────────────────────── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Main navigation">
        <div className="container nav__inner">
          {/* Logo */}
          <Link href="/" className="nav__logo" aria-label="Hazsols Home">
            <Image
              src="/logo.png"
              alt="Hazsols"
              width={40}
              height={40}
              priority
              style={{ width: 40, height: 40, objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Links */}
          <ul className="nav__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link href="/contact" className="nav__cta" id="nav-cta-btn">
            Let&apos;s Talk
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className={`nav__hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-overlay"
            id="nav-hamburger"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── Mobile Overlay Menu ───────────────────────────── */}
      <div
        id="mobile-overlay"
        ref={overlayRef}
        className={`nav__overlay${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Top bar inside overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 72,
            display: "flex",
            alignItems: "center",
            padding: "0 var(--space-container)",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" onClick={closeMenu} aria-label="Hazsols Home">
            <Image
              src="/logo.png"
              alt="Hazsols"
              width={36}
              height={36}
              style={{ width: 36, height: 36, objectFit: "contain" }}
            />
          </Link>
          <button
            className="nav__hamburger open"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <ul className="nav__overlay-links" role="list">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}>
              <Link
                href={link.href}
                className="nav__overlay-link"
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li style={{ transitionDelay: menuOpen ? `${NAV_LINKS.length * 60}ms` : "0ms" }}>
            <Link
              href="/contact"
              className="nav__overlay-link"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              style={{ color: "var(--color-accent)" }}
            >
              Let&apos;s Talk →
            </Link>
          </li>
        </ul>

        {/* Bottom info strip */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "var(--space-container)",
            right: "var(--space-container)",
            borderTop: "1px solid var(--color-border)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Lahore, Pakistan
          </span>
          <a
            href="mailto:hello@hazsols.com"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-text-muted)",
              letterSpacing: "0.06em",
            }}
            tabIndex={menuOpen ? 0 : -1}
          >
            hello@hazsols.com
          </a>
        </div>
      </div>
    </>
  );
}
