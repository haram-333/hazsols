"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, X, ShieldCheck } from "lucide-react";

// Tactile SVG feTurbulence TV Static Noise Tile with White Alpha Grain
const TV_STATIC_NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 1  0 1 0 0 1  0 0 1 0 1  0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export interface TechItem {
  id: string;
  name: string;
  category: "Frontend" | "Mobile" | "Backend" | "Styling" | "Ecosystem";
  subline: string;
  tier: string;
  logo: string;
  accent: string;
  spineBg: string;
  spineBorder: string;
  tagline: string;
  description: string;
  capabilities: string[];
  role: string;
}

export const TECH_ITEMS: TechItem[] = [
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    subline: "Full-Stack Web Framework",
    tier: "Core Framework",
    logo: "/images/Next.js.png",
    accent: "#FFFFFF",
    spineBg: "#18181B",
    spineBorder: "#27272A",
    tagline: "Fast, modern web applications built for speed and scale.",
    description: "We use Next.js to build fast, SEO-friendly websites with instant page loads, clean routing, and server-side rendering.",
    capabilities: ["Server-Side Rendering", "Fast Page Routing", "API Routes & Edge Delivery", "Speed & SEO Optimization"],
    role: "Web Framework",
  },
  {
    id: "react",
    name: "React 19",
    category: "Frontend",
    subline: "Interactive UI Library",
    tier: "Core Library",
    logo: "/images/React.png",
    accent: "#00D8FF",
    spineBg: "#0F2937",
    spineBorder: "#1B475E",
    tagline: "Smooth, interactive user interfaces that feel great.",
    description: "The foundation of our frontend work. We build clean, reusable components that make web apps responsive and easy to use.",
    capabilities: ["Reusable Components", "Real-Time UI Updates", "Modern Custom Hooks", "Fast Client Rendering"],
    role: "Frontend UI",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Ecosystem",
    subline: "Type-Safe JavaScript",
    tier: "Core Language",
    logo: "/images/TypeScript.png",
    accent: "#3178C6",
    spineBg: "#172A42",
    spineBorder: "#24446A",
    tagline: "Clean, reliable code that catches errors before launch.",
    description: "We write strictly typed code across every project to keep applications stable, reduce bugs, and make future updates easy.",
    capabilities: ["Type Safety", "Fewer Runtime Errors", "Clean Code Structure", "Easy Long-Term Maintenance"],
    role: "Code Architecture",
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Mobile",
    subline: "iOS & Android Apps",
    tier: "Mobile Framework",
    logo: "/images/Flutter.png",
    accent: "#02569B",
    spineBg: "#0E2B43",
    spineBorder: "#184972",
    tagline: "One codebase for smooth native mobile apps.",
    description: "Build high-performance mobile apps for both iPhone and Android from a single codebase, saving time and development cost.",
    capabilities: ["iOS & Android Apps", "Smooth 60fps Animations", "Single Shared Codebase", "Custom Mobile UI"],
    role: "Cross-Platform Mobile",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "Mobile",
    subline: "Native Android",
    tier: "Mobile Language",
    logo: "/images/Kotlin.png",
    accent: "#7F52FF",
    spineBg: "#281A4B",
    spineBorder: "#442D7D",
    tagline: "Modern, secure apps built specifically for Android.",
    description: "Used when apps need direct access to Android hardware, background tasks, push notifications, and maximum device speed.",
    capabilities: ["Native Android Speed", "Jetpack Compose UI", "Hardware & Bluetooth", "Background Services"],
    role: "Android Apps",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Styling",
    subline: "Modern UI Styling",
    tier: "CSS Framework",
    logo: "/images/Tailwind CSS.png",
    accent: "#38BDF8",
    spineBg: "#0E2F43",
    spineBorder: "#1A5173",
    tagline: "Clean, consistent styling for modern responsive layouts.",
    description: "We use Tailwind to quickly build custom, mobile-friendly designs without heavy stylesheets or messy CSS files.",
    capabilities: ["Responsive Layouts", "Custom Themes", "Lightweight CSS", "Fast Load Times"],
    role: "Design System",
  },
  {
    id: "android",
    name: "Android SDK",
    category: "Mobile",
    subline: "Device Hardware",
    tier: "Native Tools",
    logo: "/images/Android.png",
    accent: "#3DDC84",
    spineBg: "#143624",
    spineBorder: "#215B3D",
    tagline: "Direct connection to Android sensors and device features.",
    description: "Connect your app directly to GPS, camera, notifications, background sync, and offline storage on any Android phone or tablet.",
    capabilities: ["GPS & Camera Access", "Push Notifications", "Offline Storage", "Background Sync"],
    role: "Mobile Platform",
  },
  {
    id: "vue",
    name: "Vue.js",
    category: "Frontend",
    subline: "Progressive Framework",
    tier: "Frontend Framework",
    logo: "/images/Vue.js.png",
    accent: "#42B883",
    spineBg: "#123729",
    spineBorder: "#1E5E46",
    tagline: "Simple and flexible interfaces for web dashboards.",
    description: "A lightweight frontend framework ideal for interactive dashboards, client portals, and fast internal company tools.",
    capabilities: ["Clean & Simple Code", "Fast Reactive Data", "Modular Components", "Quick Setup"],
    role: "Interactive Web",
  },
  {
    id: "svelte",
    name: "Svelte",
    category: "Frontend",
    subline: "High-Performance Web",
    tier: "Frontend Compiler",
    logo: "/images/Svelte.png",
    accent: "#FF3E00",
    spineBg: "#431C13",
    spineBorder: "#733021",
    tagline: "Fast websites with tiny file sizes and no framework bloat.",
    description: "Svelte compiles into plain JavaScript that runs directly in the browser, making pages load fast and use less device memory.",
    capabilities: ["Tiny File Sizes", "Instant Page Loads", "Smooth Transitions", "Low Memory Usage"],
    role: "Ultra-Fast UI",
  },
  {
    id: "java",
    name: "Java",
    category: "Backend",
    subline: "Backend & APIs",
    tier: "Backend Core",
    logo: "/images/Java.png",
    accent: "#E76F00",
    spineBg: "#3E2415",
    spineBorder: "#6B3E25",
    tagline: "Secure, high-traffic backends that stay online 24/7.",
    description: "Powers reliable APIs, secure database connections, and payment integrations that handle heavy traffic without downtime.",
    capabilities: ["Spring Boot REST APIs", "Secure Databases", "Payment Gateways", "High Traffic Handling"],
    role: "Server Systems",
  },
  {
    id: "angular",
    name: "Angular",
    category: "Frontend",
    subline: "Enterprise Web",
    tier: "Enterprise Platform",
    logo: "/images/Angular.png",
    accent: "#DD0031",
    spineBg: "#40111C",
    spineBorder: "#6F1E31",
    tagline: "Structured web applications for complex, data-heavy systems.",
    description: "Built by Google for large web applications with complex user forms, strict security rules, and multi-team collaboration.",
    capabilities: ["Strict Project Structure", "Complex Forms & Validation", "Built-In Security", "Scalable Architecture"],
    role: "Large-Scale Web",
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "Ecosystem",
    subline: "Content Management",
    tier: "CMS Platform",
    logo: "/images/WordPress.png",
    accent: "#21759B",
    spineBg: "#152F3F",
    spineBorder: "#234F6A",
    tagline: "Easy website management for marketing and editorial teams.",
    description: "Custom WordPress setups and headless blogs so your team can easily publish articles and edit pages without writing code.",
    capabilities: ["Easy Content Editing", "Custom Page Templates", "SEO Optimization", "Headless API Support"],
    role: "Publishing & CMS",
  },
];

const CATEGORIES = ["ALL", "FRONTEND", "MOBILE", "BACKEND", "ECOSYSTEM"] as const;

// Helper to compute rich, expensive agency poster gradients based on brand stack colors
const getCardGradient = (item: TechItem) => {
  const brandAccent = item.id === "nextjs" ? "#94A3B8" : item.accent;
  return {
    background: `radial-gradient(ellipse 110% 90% at 88% -5%, ${brandAccent}e6 0%, ${brandAccent}75 28%, ${brandAccent}1a 58%, transparent 78%), radial-gradient(ellipse 80% 60% at 12% 105%, ${brandAccent}38 0%, transparent 65%), linear-gradient(160deg, #181920 0%, #101116 45%, #08080B 100%)`,
    boxShadow: `0 32px 64px -18px rgba(0,0,0,0.75), 0 14px 32px -8px ${brandAccent}55, inset 0 1px 1px 0 rgba(255, 255, 255, 0.28), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.5)`,
  };
};

export default function TechShelf3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  // Pure mutable physics & motion engine state (NO per-frame React state updates!)
  const stateRef = useRef({
    s: 17, // Start at index 5 in middle copy (5 + 12 = 17)
    T: 17,
    hoveredVirtualIndex: -1,
    activeFilmIndex: 5,
    mx: -9999,
    my: -9999,
    cx: -9999,
    cy: -9999,
    tiltX: 0,
    tiltY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartT: 0,
    hasDragged: false,
    wheelTimeout: null as NodeJS.Timeout | null,
    tapeLifts: new Array(36).fill(0),
    lastTime: performance.now(),
    isDetailOpen: false,
  });

  // UI States
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [tabIndicator, setTabIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [activeItem, setActiveItem] = useState<TechItem>(TECH_ITEMS[5]);
  const [captionDirection, setCaptionDirection] = useState<number>(1);
  const [captionKey, setCaptionKey] = useState<number>(0);

  // Detail View State & Origin Center Coordinates for Physical Growth Animation
  const [mounted, setMounted] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [detailItem, setDetailItem] = useState<TechItem>(TECH_ITEMS[5]);
  const [sheetOrigin, setSheetOrigin] = useState({ x: 960, y: 540 });
  const [coverRect, setCoverRect] = useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
    ox: number;
    oy: number;
  } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        (window as any).__lenis?.start();
      }
    };
  }, []);

  // Render 36 tapes (12 items x 3 repetitions for seamless infinite looping)
  const totalItems = TECH_ITEMS.length;
  const loopCopies = 3;
  const totalTapes = totalItems * loopCopies;

  // Track global pointer position (pure mutable ref, zero React re-renders)
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      stateRef.current.mx = e.clientX;
      stateRef.current.my = e.clientY;
      if (stateRef.current.cx < -1000) {
        stateRef.current.cx = e.clientX;
        stateRef.current.cy = e.clientY;
      }
    };
    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleGlobalPointerMove);
  }, []);

  // Track tab indicator position using DOM offsetLeft and offsetWidth
  const updateTabIndicator = useCallback((tabName: string) => {
    setActiveTab(tabName);
    const btn = tabButtonRefs.current[tabName];
    if (btn) {
      setTabIndicator({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      });
    }
  }, []);

  useEffect(() => {
    updateTabIndicator("ALL");
  }, [updateTabIndicator]);

  useEffect(() => {
    const handleResize = () => {
      updateTabIndicator(activeTab);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, updateTabIndicator]);

  // Jump to specific category on tab click
  const handleTabClick = (category: string) => {
    updateTabIndicator(category);
    if (category === "ALL") {
      stateRef.current.T = Math.round(stateRef.current.T);
      return;
    }

    const matchIdx = TECH_ITEMS.findIndex((item) => {
      if (category === "FRONTEND") return item.category === "Frontend";
      if (category === "MOBILE") return item.category === "Mobile";
      if (category === "BACKEND") return item.category === "Backend";
      if (category === "ECOSYSTEM") return item.category === "Styling" || item.category === "Ecosystem";
      return true;
    });

    if (matchIdx !== -1) {
      const currentS = stateRef.current.s;
      let bestT = matchIdx;
      let minDiff = Infinity;
      for (let c = 0; c < loopCopies; c++) {
        const v = c * totalItems + matchIdx;
        const diff = Math.abs(v - currentS);
        if (diff < minDiff) {
          minDiff = diff;
          bestT = v;
        }
      }
      stateRef.current.T = bestT;
    }
  };

  // Step left / right via arrows or buttons
  const stepShelf = useCallback((direction: -1 | 1) => {
    stateRef.current.T = Math.round(stateRef.current.T) + direction;
  }, []);

  // Smoothstep function
  const smoothstep = (x: number) => {
    const clamped = Math.max(0, Math.min(1, x));
    return clamped * clamped * (3 - 2 * clamped);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // OPEN DETAIL: Read Projected Cover Screen Coordinates & Trigger Growth
  // ─────────────────────────────────────────────────────────────────────────────
  const openDetail = useCallback((itemToOpen?: TechItem) => {
    if (stateRef.current.isDetailOpen) return;
    const target = itemToOpen || activeItem;
    setDetailItem(target);

    // Read active cover's center for growth transform-origin
    const stageEl = stageRef.current;
    const activeCover = stageEl?.querySelector(`.tape-wrapper[data-active="true"] .cover-face`) as HTMLElement | null;
    const rect = activeCover ? activeCover.getBoundingClientRect() : null;

    if (rect && rect.width > 0 && rect.height > 0) {
      const ox = Math.round(rect.left + rect.width / 2);
      const oy = Math.round(rect.top + rect.height / 2);
      setCoverRect({
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        right: Math.round(window.innerWidth - rect.right),
        bottom: Math.round(window.innerHeight - rect.bottom),
        ox,
        oy,
      });
      setSheetOrigin({ x: ox, y: oy });
    } else {
      const ox = Math.round(window.innerWidth / 2);
      const oy = Math.round(window.innerHeight / 2);
      const defaultW = Math.min(320, window.innerWidth * 0.8);
      const defaultH = Math.min(390, window.innerHeight * 0.46);
      setCoverRect({
        top: Math.round(oy - defaultH / 2),
        bottom: Math.round(window.innerHeight - (oy + defaultH / 2)),
        left: Math.round(ox - defaultW / 2),
        right: Math.round(window.innerWidth - (ox + defaultW / 2)),
        ox,
        oy,
      });
      setSheetOrigin({ x: ox, y: oy });
    }

    setIsClosing(false);
    setDetailOpen(true);
    stateRef.current.isDetailOpen = true;
    stateRef.current.T = Math.round(stateRef.current.T);
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined") {
      (window as any).__lenis?.stop();
    }
  }, [activeItem]);

  // ─────────────────────────────────────────────────────────────────────────────
  // CLOSE DETAIL: Smoothly shrink back into cover with rotation
  // ─────────────────────────────────────────────────────────────────────────────
  const closeDetail = useCallback(() => {
    if (!stateRef.current.isDetailOpen || isClosing) return;
    setIsClosing(true);

    if (dialogRef.current && coverRect) {
      const sheetEl = dialogRef.current;
      sheetEl.style.transformOrigin = `${coverRect.ox}px ${coverRect.oy}px`;

      try {
        const anim = sheetEl.animate(
          [
            {
              clipPath: "inset(0px 0px 0px 0px round 0px)",
              transform: "rotate(0deg)",
              opacity: 1,
            },
            {
              clipPath: `inset(${coverRect.top}px ${coverRect.right}px ${coverRect.bottom}px ${coverRect.left}px round 16px)`,
              transform: "rotate(-4.5deg)",
              opacity: 0.85,
            },
          ],
          {
            duration: 650,
            easing: "cubic-bezier(0.7, 0, 0.84, 0)",
            fill: "both",
          }
        );

        anim.onfinish = () => {
          setDetailOpen(false);
          setIsClosing(false);
          stateRef.current.isDetailOpen = false;
          document.body.style.overflow = "";
          if (typeof window !== "undefined") {
            (window as any).__lenis?.start();
          }
        };
      } catch {
        setTimeout(() => {
          setDetailOpen(false);
          setIsClosing(false);
          stateRef.current.isDetailOpen = false;
          document.body.style.overflow = "";
          if (typeof window !== "undefined") {
            (window as any).__lenis?.start();
          }
        }, 400);
      }
    } else {
      setTimeout(() => {
        setDetailOpen(false);
        setIsClosing(false);
        stateRef.current.isDetailOpen = false;
        document.body.style.overflow = "";
        if (typeof window !== "undefined") {
          (window as any).__lenis?.start();
        }
      }, 350);
    }
  }, [coverRect, isClosing]);

  // WAAPI Physical Growth on Open
  useEffect(() => {
    if (detailOpen && dialogRef.current && coverRect && !isClosing) {
      const sheetEl = dialogRef.current;
      sheetEl.style.transformOrigin = `${coverRect.ox}px ${coverRect.oy}px`;

      try {
        sheetEl.animate(
          [
            {
              clipPath: `inset(${coverRect.top}px ${coverRect.right}px ${coverRect.bottom}px ${coverRect.left}px round 16px)`,
              transform: "rotate(-4.5deg)",
              opacity: 0.85,
            },
            {
              clipPath: "inset(0px 0px 0px 0px round 0px)",
              transform: "rotate(0deg)",
              opacity: 1,
            },
          ],
          {
            duration: 950,
            easing: "cubic-bezier(0.76, 0, 0.18, 1)",
            fill: "both",
          }
        );
      } catch (err) {
        console.warn("WAAPI animation fallback", err);
      }
    }
  }, [detailOpen, coverRect, isClosing]);

  // Keyboard navigation: Arrows, Enter to open, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (stateRef.current.isDetailOpen) {
          closeDetail();
        }
      } else if (e.key === "Enter") {
        if (!stateRef.current.isDetailOpen) {
          openDetail();
        }
      } else if (e.key === "ArrowLeft") {
        if (!stateRef.current.isDetailOpen) {
          stepShelf(-1);
        }
      } else if (e.key === "ArrowRight") {
        if (!stateRef.current.isDetailOpen) {
          stepShelf(1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDetail, openDetail, stepShelf]);

  // ─────────────────────────────────────────────────────────────────────────────
  // ZERO-RE-RENDER HIGH-PERFORMANCE rAF LOOP (Locked 60-120fps, NO setState!)
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let animId = 0;
    let isVisible = true;
    let lastH = -1;
    let lastWs = -1;
    let lastD = -1;

    const stage = stageRef.current;
    const container = containerRef.current;
    if (!stage || !container) return;

    // Cache DOM elements once instead of querying 108 nodes every frame
    const cachedTapes = Array.from(stage.querySelectorAll<HTMLDivElement>(".tape-wrapper")).map((tapeEl) => ({
      tapeEl,
      v: parseInt(tapeEl.getAttribute("data-v") || "0", 10),
      spineFace: tapeEl.querySelector<HTMLDivElement>(".spine-face"),
      coverFace: tapeEl.querySelector<HTMLDivElement>(".cover-face"),
    }));

    const tick = (now: number) => {
      animId = 0;
      if (!isVisible || document.hidden) return;

      const dt = Math.min((now - stateRef.current.lastTime) / 1000, 0.05);
      stateRef.current.lastTime = now;

      const state = stateRef.current;
      const k = state.isDragging ? 18 : 5.2;

      // Spring physics
      state.s += (state.T - state.s) * (1 - Math.exp(-k * dt));

      if (Math.abs(state.T - state.s) < 0.005) {
        state.s = state.T;
      }

      // Infinite loop normalization
      if (state.s > 24) {
        state.s -= 12;
        state.T -= 12;
      } else if (state.s < 6) {
        state.s += 12;
        state.T += 12;
      }

      // Update active item ONLY when crossing integer boundaries
      const normalizedActive = Math.round(state.s) % totalItems;
      const activeIdx = (normalizedActive + totalItems) % totalItems;
      if (activeIdx !== state.activeFilmIndex) {
        const dir = Math.sign(state.T - state.s) || 1;
        state.activeFilmIndex = activeIdx;
        setCaptionDirection(dir);
        setActiveItem(TECH_ITEMS[activeIdx]);
        setCaptionKey((prev) => prev + 1);
      }

      // Read all layout metrics FIRST before any DOM style writes (Zero layout thrashing!)
      const W = container.offsetWidth;
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const isMobile = W < 640;

      const H = isMobile
        ? Math.min(Math.max(winH * 0.40, 270), 320)
        : Math.min(Math.max(winH * 0.46, 320), 390);
      const ws = Math.min((H * 142) / 840, 66);
      const d = isMobile ? Math.min(Math.round(W * 0.72), 260) : Math.round(H * 0.82);
      const gap = isMobile ? 14 : Math.round(H * 0.045);

      if (H !== lastH || ws !== lastWs || d !== lastD) {
        lastH = H;
        lastWs = ws;
        lastD = d;
        stage.style.setProperty("--H", `${H}px`);
        stage.style.setProperty("--ws", `${ws}px`);
        stage.style.setProperty("--d", `${d}px`);
      }

      // Accurate active card hit-test using viewport coordinates
      const shelfCenterX = rect.left + rect.width / 2;
      const shelfCenterY = rect.top + rect.height / 2;
      const distFromCenterX = Math.abs(state.mx - shelfCenterX);
      const distFromCenterY = Math.abs(state.my - shelfCenterY);

      const isOverActiveCover =
        !state.isDetailOpen &&
        distFromCenterX < d * 0.5 &&
        distFromCenterY < H * 0.5 &&
        Math.abs(state.T - state.s) < 0.35;

      // Smooth 3D tilt
      if (isOverActiveCover) {
        const targetTiltY = ((state.mx - shelfCenterX) / (0.5 * d)) * 8;
        const targetTiltX = -((state.my - shelfCenterY) / (0.5 * H)) * 5;
        state.tiltY += (targetTiltY - state.tiltY) * (1 - Math.exp(-7 * dt));
        state.tiltX += (targetTiltX - state.tiltX) * (1 - Math.exp(-7 * dt));
      } else {
        const targetTiltY = ((state.mx - shelfCenterX) / (winW / 2 || 1)) * 3;
        state.tiltY += (targetTiltY - state.tiltY) * (1 - Math.exp(-7 * dt));
        state.tiltX += (0 - state.tiltX) * (1 - Math.exp(-7 * dt));
      }

      // Direct DOM update on cobalt follower disc (Zero React re-renders!)
      if (cursorFollowerRef.current && state.mx > -1000) {
        state.cx += (state.mx - state.cx) * (1 - Math.exp(-24 * dt));
        state.cy += (state.my - state.cy) * (1 - Math.exp(-24 * dt));
        const scale = isOverActiveCover ? 1 : 0;
        cursorFollowerRef.current.style.transform = `translate3d(${state.cx}px, ${state.cy}px, 0) scale(${scale})`;
        cursorFollowerRef.current.style.opacity = isOverActiveCover ? "1" : "0";
      }

      // Position and transform every tape directly in the DOM using cached references
      for (let i = 0; i < cachedTapes.length; i++) {
        const { tapeEl, v, spineFace, coverFace } = cachedTapes[i];

        let r = (v - state.s) % totalTapes;
        if (r > totalTapes / 2) r -= totalTapes;
        if (r < -totalTapes / 2) r += totalTapes;

        // Smooth step neighbor push function B(r)
        let Br: number;
        if (Math.abs(r) < 1) {
          Br = (r + Math.sin(Math.PI * r) / Math.PI) / 2;
        } else {
          Br = Math.sign(r) * 0.5;
        }

        // Exact placement formula with guaranteed non-overlapping clearance:
        const targetClearance = isMobile ? 32 : Math.round(ws * 0.95);
        const leftBias = r < 0 ? (isMobile ? 8 : 16) * Math.min(1, Math.abs(r)) : 0;
        const basePush = (d - ws) + 2 * (targetClearance - gap);
        const push = basePush + leftBias * 2;
        const x = r * (ws + gap) + push * Br;

        // Off-screen culling
        if (Math.abs(x) > W / 2 + 1.4 * d) {
          if (tapeEl.style.display !== "none") tapeEl.style.display = "none";
          continue;
        }
        if (tapeEl.style.display !== "block") tapeEl.style.display = "block";

        // Openness calculation o
        const o = smoothstep(Math.max(0, 1 - Math.abs(r)));

        // Active flag for DOM queries
        if (Math.abs(r) < 0.5) {
          tapeEl.setAttribute("data-active", "true");
        } else if (tapeEl.hasAttribute("data-active")) {
          tapeEl.removeAttribute("data-active");
        }

        // Hover lift
        const isHovered = state.hoveredVirtualIndex === v && Math.abs(r) > 0.5;
        const liftTarget = isHovered ? 1 : 0;
        state.tapeLifts[v] += (liftTarget - (state.tapeLifts[v] || 0)) * (1 - Math.exp(-12 * dt));
        const currentLift = state.tapeLifts[v];

        // 3D rotations & translations
        const rotY = -90 * o + state.tiltY * o;
        const rotX = state.tiltX * o;
        const rotZ = -4.5 * o;
        const transZ = o * (d / 2 - ws / 2 + 0.18 * H);
        const transY = -o * 0.03 * H - currentLift * 0.05 * H;

        tapeEl.style.transform = `translate3d(${x}px, ${transY}px, ${transZ}px) rotateZ(${rotZ}deg) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        tapeEl.style.zIndex = `${Math.round(100 - Math.abs(r) * 4)}`;

        // Dynamic shading variables across turning faces
        const spineShade = o * 0.75;
        const coverShade = (1 - o) * 0.5;
        tapeEl.style.setProperty("--spine-shade", `${spineShade}`);
        tapeEl.style.setProperty("--cover-shade", `${coverShade}`);

        if (spineFace) {
          if (Math.abs(r) < 0.45 || o > 0.35) {
            if (spineFace.style.display !== "none") spineFace.style.display = "none";
          } else {
            if (spineFace.style.display !== "flex") spineFace.style.display = "flex";
            spineFace.style.opacity = `${Math.max(0, 1 - o * 2.5)}`;
          }
        }

        if (coverFace) {
          if (o < 0.05) {
            if (coverFace.style.display !== "none") coverFace.style.display = "none";
            coverFace.style.pointerEvents = "none";
          } else {
            if (coverFace.style.display !== "flex") coverFace.style.display = "flex";
            coverFace.style.opacity = `${Math.min(1, o * 2.5)}`;
            coverFace.style.pointerEvents = o > 0.4 ? "auto" : "none";
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          stateRef.current.lastTime = performance.now();
          animId = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "150px" }
    );
    observer.observe(container);

    animId = requestAnimationFrame(tick);
    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [totalItems, totalTapes]);

  // Pointer & Drag Interactions (Accurate Threshold, Zero Click Interference)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || stateRef.current.isDetailOpen) return;
    stateRef.current.isDragging = true;
    stateRef.current.hasDragged = false;
    stateRef.current.dragStartX = e.clientX;
    stateRef.current.dragStartY = e.clientY;
    stateRef.current.dragStartT = stateRef.current.T;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    stateRef.current.mx = e.clientX;
    stateRef.current.my = e.clientY;

    if (stateRef.current.isDragging) {
      const dx = e.clientX - stateRef.current.dragStartX;
      // Strictly do not alter shelf target T unless pointer moved more than 6px
      if (Math.abs(dx) > 6) {
        stateRef.current.hasDragged = true;
        const isMobile = window.innerWidth < 768;
        const H = isMobile
          ? Math.min(window.innerWidth * 0.62, window.innerHeight * 0.44)
          : Math.min(window.innerHeight * 0.46, window.innerWidth * 0.31, 390);
        const ws = Math.min(Math.round((H * 142) / 840), 66);
        const gap = Math.max(16, Math.round(H * 0.045));
        stateRef.current.T = stateRef.current.dragStartT - dx / (ws + gap);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (stateRef.current.isDragging) {
      stateRef.current.isDragging = false;
      stateRef.current.T = Math.round(stateRef.current.T);

      // Check if this was a click (moved less than 6px total)
      const dx = Math.abs(e.clientX - stateRef.current.dragStartX);
      const dy = Math.abs(e.clientY - stateRef.current.dragStartY);
      if (dx < 6 && dy < 6) {
        stateRef.current.hasDragged = false;

        // If clicked on the active card region, trigger immediate open!
        const container = containerRef.current;
        if (container && !stateRef.current.isDetailOpen) {
          const rect = container.getBoundingClientRect();
          const shelfCenterX = rect.left + rect.width / 2;
          const shelfCenterY = rect.top + rect.height / 2;
          const distFromCenterX = Math.abs(e.clientX - shelfCenterX);
          const distFromCenterY = Math.abs(e.clientY - shelfCenterY);
          const isMobile = window.innerWidth < 768;
          const H = isMobile
            ? Math.min(window.innerWidth * 0.62, window.innerHeight * 0.44)
            : Math.min(window.innerHeight * 0.46, window.innerWidth * 0.31, 390);
          const d = Math.round(H * 0.82);

          if (
            distFromCenterX < d * 0.52 &&
            distFromCenterY < H * 0.52 &&
            Math.abs(stateRef.current.T - stateRef.current.s) < 0.35
          ) {
            openDetail(activeItem);
          }
        }
      } else {
        setTimeout(() => {
          stateRef.current.hasDragged = false;
        }, 80);
      }
    }
  };

  // Dedicated Click on the active front Cover (ALWAYS OPENS IMMEDIATELY!)
  const handleCoverClick = (item: TechItem, e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
    openDetail(item);
  };

  // Dedicated Click on a shelved Spine
  const handleSpineClick = (v: number, item: TechItem, e: React.MouseEvent) => {
    e.stopPropagation();
    let r = (v - stateRef.current.s) % totalTapes;
    if (r > totalTapes / 2) r -= totalTapes;
    if (r < -totalTapes / 2) r += totalTapes;

    if (Math.abs(r) < 0.6) {
      openDetail(item);
    } else {
      stateRef.current.T = Math.round(stateRef.current.T + r);
    }
  };

  // Horizontal wheel / trackpad scrubbing only (never hijack vertical page scroll)
  const handleWheel = (e: React.WheelEvent) => {
    if (stateRef.current.isDetailOpen) return;
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) && !e.shiftKey) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const isMobile = window.innerWidth < 768;
    const H = isMobile
      ? Math.min(window.innerWidth * 0.62, window.innerHeight * 0.44)
      : Math.min(window.innerHeight * 0.46, window.innerWidth * 0.31, 390);
    const ws = Math.min(Math.round((H * 142) / 840), 66);
    const gap = Math.max(16, Math.round(H * 0.045));

    stateRef.current.T += (delta / (ws + gap)) * 0.4;

    if (stateRef.current.wheelTimeout) {
      clearTimeout(stateRef.current.wheelTimeout);
    }
    stateRef.current.wheelTimeout = setTimeout(() => {
      stateRef.current.T = Math.round(stateRef.current.T);
    }, 160);
  };

  return (
    <section
      id="tech-stack"
      className="shelf-section relative w-full max-w-full bg-[#EDEBE6] dark:bg-[#101115] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-x-clip select-none border-t border-b border-[#141414]/10 dark:border-white/[0.08] cursor-default transition-colors duration-300"
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            {/* Numbered Badge Row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#141414] dark:bg-white text-white dark:text-gray-900 text-[11px] sm:text-[12px] font-mono font-semibold flex items-center justify-center">
                3
              </div>
              <div className="text-[11px] sm:text-[12px] font-mono font-bold tracking-wider uppercase border border-[#141414]/20 dark:border-white/15 rounded-full px-3 sm:px-4 py-1 text-[#141414] dark:text-white/90 bg-white/60 dark:bg-white/[0.04] shadow-2xs">
                Our Tech Stack
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(1.75rem,5.5vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#141414] dark:text-white">
              Tools We Build With.<br className="hidden sm:block" />
              <span className="text-[#6D6A63] dark:text-white/45 font-normal"> Proven In Production.</span>
            </h2>
          </div>

          <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#444] dark:text-gray-400 max-w-md">
            Click, drag, or browse the shelf below to see the frameworks, databases, and languages we actually ship client software on.
          </p>
        </div>

        {/* ── Category Filters (Fixed Centered Stationary Pill Bar) ── */}
        <div className="w-full flex justify-center mb-4 sm:mb-8 px-2 max-w-full overflow-x-auto no-scrollbar">
          <nav
            ref={tabsContainerRef}
            aria-label="Technology Categories"
            className="relative inline-flex items-center bg-white dark:bg-[#181A20] p-1 rounded-full border border-[#141414]/15 dark:border-white/10 shadow-2xs max-w-full select-none shrink-0"
          >
            {/* Sliding Pill Indicator */}
            <div
              className="absolute top-1 bottom-1 bg-[#1F3FB0] dark:bg-[#0CABA3] rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none"
              style={{
                left: `${tabIndicator.left}px`,
                width: `${tabIndicator.width}px`,
              }}
            />

            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  ref={(el) => {
                    tabButtonRefs.current[cat] = el;
                  }}
                  type="button"
                  onClick={() => handleTabClick(cat)}
                  className={`relative z-10 px-2 xs:px-2.5 sm:px-5 py-1 sm:py-1.5 text-[8.5px] xs:text-[9.5px] sm:text-[11.5px] font-mono font-bold tracking-wider uppercase rounded-full transition-colors duration-300 whitespace-nowrap cursor-pointer select-none ${
                    isActive ? "text-white" : "text-[#141414] dark:text-gray-300 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── 3D Shelf Stage Container ── */}
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center my-2 sm:my-6 min-h-[300px] xs:min-h-[340px] sm:min-h-[460px] select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        style={{
          perspective: "2200px",
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
          touchAction: "pan-y",
        }}
      >
        {/* Dynamic Atmospheric Stage Backlight based on Active Tech Brand Accent */}
        <div
          className="absolute pointer-events-none transition-all duration-700 ease-out"
          style={{
            width: "min(680px, 92vw)",
            height: "min(400px, 50vh)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle at center, ${activeItem.accent}2b 0%, ${activeItem.accent}08 45%, transparent 72%)`,
            filter: "blur(54px)",
            zIndex: 0,
          }}
        />

        {/* Zero-size centered 3D Stage (Placed dead center at 50% 50%) */}
        <div
          ref={stageRef}
          className="stage"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
          }}
        >
          {Array.from({ length: totalTapes }).map((_, v) => {
            const itemIndex = v % totalItems;
            const item = TECH_ITEMS[itemIndex];
            const indexLabel = String(itemIndex + 1).padStart(2, "0");
            const cardStyle = getCardGradient(item);

            return (
              <div
                key={v}
                data-v={v}
                onPointerEnter={() => {
                  stateRef.current.hoveredVirtualIndex = v;
                }}
                onPointerLeave={() => {
                  if (stateRef.current.hoveredVirtualIndex === v) {
                    stateRef.current.hoveredVirtualIndex = -1;
                  }
                }}
                className="tape-wrapper"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* ── 1. SPINE FACE (Front face when shelved, width: --ws) ── */}
                <div
                  className="spine-face rounded-[3px] overflow-hidden flex flex-col justify-between p-2.5 shadow-md border border-white/10 group-hover:border-white/20 cursor-pointer select-none transition-opacity duration-150"
                  onClick={(e) => handleSpineClick(v, item, e)}
                  style={{
                    position: "absolute",
                    width: "var(--ws, 66px)",
                    height: "var(--H, 360px)",
                    top: "calc(-1 * var(--H, 360px) / 2)",
                    left: "calc(-1 * var(--ws, 66px) / 2)",
                    transform: "translateZ(calc(var(--d, 310px) / 2))",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    background: `radial-gradient(circle at 50% 12%, ${item.accent}66 0%, transparent 68%), linear-gradient(90deg, rgba(255,255,255,0.18) 0%, transparent 24%, transparent 72%, rgba(0,0,0,0.45) 100%), linear-gradient(180deg, ${item.spineBg} 0%, #08080A 100%)`,
                  }}
                >
                  {/* Top: Tech Logo in crisp white pill */}
                  <div className="relative z-10 w-full flex flex-col items-center pt-1.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-sm p-1.5 flex items-center justify-center border border-black/10">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={26}
                        height={26}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Center: Vertical Typography Title */}
                  <div className="relative z-10 flex-1 flex items-center justify-center py-4 overflow-hidden">
                    <div
                      className="text-white font-mono font-bold text-[11px] sm:text-[12px] tracking-[0.2em] uppercase whitespace-nowrap drop-shadow-sm"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {item.name}
                    </div>
                  </div>

                  {/* Bottom: Hazsols studio badge */}
                  <div className="relative z-10 w-full flex flex-col items-center pb-1 gap-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    <span className="text-[8px] font-mono font-semibold text-white/60 tracking-wider">
                      HAZSOLS
                    </span>
                  </div>

                  {/* Shading Overlay */}
                  <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150 z-[5]"
                    style={{ opacity: "var(--spine-shade, 0)" }}
                  />
                </div>

                {/* ── 2. COVER FACE (Right face turned 3D, width: --d) ── */}
                <div
                  className="cover-face rounded-[3px] overflow-hidden flex flex-col justify-between p-6 text-white border border-white/20 cursor-pointer select-none"
                  onClick={(e) => handleCoverClick(item, e)}
                  onPointerUp={(e) => {
                    const dx = Math.abs(e.clientX - stateRef.current.dragStartX);
                    const dy = Math.abs(e.clientY - stateRef.current.dragStartY);
                    if (dx < 8 && dy < 8) {
                      handleCoverClick(item, e);
                    }
                  }}
                  style={{
                    position: "absolute",
                    width: "var(--d, 310px)",
                    height: "var(--H, 360px)",
                    top: "calc(-1 * var(--H, 360px) / 2)",
                    left: "calc(-1 * var(--d, 310px) / 2)",
                    transform: "rotateY(90deg) translateZ(calc(var(--ws, 66px) / 2))",
                    background: cardStyle.background,
                    boxShadow: cardStyle.boxShadow,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Watermarked Tech Logo Silhouette in Background */}
                  <div className="absolute -right-4 top-14 w-40 h-40 opacity-[0.08] pointer-events-none filter grayscale contrast-150 z-0">
                    <Image
                      src={item.logo}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>

                  {/* Specular Inner Edge Shimmer */}
                  <div className="absolute inset-0 pointer-events-none rounded-[3px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.5)] z-[2]" />

                  {/* Cover Header */}
                  <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-white/10 w-full shrink-0">
                    <span className="px-3 py-1 rounded-full bg-white/[0.08] text-white/90 text-[10px] font-bold uppercase tracking-wider font-mono border border-white/15 backdrop-blur-md">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-white/50 tracking-widest uppercase font-semibold">
                      {indexLabel} / 12
                    </span>
                  </div>

                  {/* Cover Main Hero */}
                  <div className="relative z-10 flex-1 flex flex-col justify-start pt-4 pb-2 w-full">
                    {/* Tech Emblem Badge */}
                    <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/20 p-2.5 flex items-center justify-center shadow-lg backdrop-blur-md shrink-0 mb-3.5">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white leading-none mb-1.5 drop-shadow-sm">
                      {item.name}
                    </h3>

                    {/* Subline */}
                    <p className="text-[10px] font-mono font-semibold text-white/60 tracking-wider uppercase mb-3">
                      {item.subline}
                    </p>

                    {/* Standardized 2-Line Tagline */}
                    <p className="text-[13px] text-white/80 leading-relaxed font-normal line-clamp-2 h-[40px]">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Cover Footer */}
                  <div className="relative z-10 pt-3.5 border-t border-white/10 flex items-center justify-between w-full shrink-0">
                    <span className="text-[10px] font-mono text-white/45 tracking-wider uppercase font-semibold">
                      HAZSOLS ARCHITECTURE
                    </span>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetail(item);
                      }}
                      className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/90 hover:text-white transition-colors cursor-pointer group/btn"
                    >
                      <span>INSPECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0CABA3] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Shading Overlay */}
                  <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150 z-[5]"
                    style={{ opacity: "var(--cover-shade, 0)" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Masked Caption Under Shelf ── */}
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mt-2 sm:mt-4 relative z-20 flex flex-col items-center text-center">
        {/* Caption Container with Clean Mask Slide */}
        <div className="relative overflow-hidden h-[64px] sm:h-[80px] w-full max-w-xl flex flex-col items-center justify-center">
          <div
            key={captionKey}
            className="flex flex-col items-center"
            style={{
              animation: captionDirection > 0 ? "slideUp 0.45s ease forwards" : "slideDown 0.45s ease forwards",
            }}
          >
            <h4 className="text-[22px] sm:text-[32px] font-bold tracking-tight text-[#141414] dark:text-white leading-none">
              {activeItem.name}
            </h4>
            <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
              <span className="text-[10.5px] sm:text-[11.5px] font-mono font-bold text-[#1F3FB0] dark:text-[#0CABA3] tracking-wider uppercase">
                {activeItem.subline}
              </span>
              <span className="text-gray-300 dark:text-white/20">·</span>
              <span className="text-[10.5px] sm:text-[11.5px] font-mono text-[#6D6A63] dark:text-gray-400 tracking-wider uppercase">
                {activeItem.tier}
              </span>
            </div>
          </div>
        </div>

        {/* ── Shelf Controls (Arrows & Quick CTA) ── */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mt-2 sm:mt-4 w-full px-2 max-w-full">
          <button
            type="button"
            onClick={() => stepShelf(-1)}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#181A20] border border-[#141414]/20 dark:border-white/15 hover:border-[#141414] dark:hover:border-white/40 flex items-center justify-center text-[#141414] dark:text-white transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            aria-label="Previous Technology"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={() => openDetail(activeItem)}
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#141414] hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-[11px] sm:text-[12.5px] font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 sm:gap-2.5 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer max-w-[210px] xs:max-w-none"
          >
            <span className="truncate">Explore {activeItem.name}</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0CABA3] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => stepShelf(1)}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#181A20] border border-[#141414]/20 dark:border-white/15 hover:border-[#141414] dark:hover:border-white/40 flex items-center justify-center text-[#141414] dark:text-white transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            aria-label="Next Technology"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* ── Signature Cobalt "OPEN" Hover Disc ── */}
      {/* Pure CSS/DOM transform, zero React re-renders! */}
      <div
        ref={cursorFollowerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[100] will-change-transform opacity-0 select-none"
        style={{
          transform: "translate3d(-9999px, -9999px, 0) scale(0)",
          transition: "opacity 0.2s ease, transform 0.08s ease-out",
        }}
      >
        <div className="w-[68px] h-[68px] -ml-[34px] -mt-[34px] rounded-full bg-[#1F3FB0] border border-white/30 shadow-2xl flex flex-col items-center justify-center text-white select-none pointer-events-none">
          <span className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase leading-none pointer-events-none">
            OPEN
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          FULL-SCREEN GROWING PAPER SHEET (Rendered in Portal directly to document.body)
         ───────────────────────────────────────────────────────────────────────────── */}
      {mounted && detailOpen && createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${detailItem.name} Technical Specifications`}
          data-lenis-prevent
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className={`detail-sheet-modal fixed inset-0 z-[999999] w-full h-[100dvh] max-h-[100dvh] bg-[#F4F2ED] dark:bg-[#0C0D10] text-[#141414] dark:text-white flex flex-col overflow-hidden overscroll-contain transition-colors duration-300 ${
            isClosing ? "sheet-animate-close" : "sheet-animate-open"
          }`}
          style={{
            transformOrigin: `${coverRect?.ox ?? sheetOrigin.x}px ${coverRect?.oy ?? sheetOrigin.y}px`,
          }}
        >
          {/* Paper Grain Overlay */}
          <div
            className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-15 mix-blend-multiply dark:mix-blend-screen z-0"
            style={{
              backgroundImage: TV_STATIC_NOISE,
              backgroundSize: "220px 220px",
            }}
          />

          {/* Top Bar (Height 56px - 72px) - FIXED at top, always visible */}
          <div className="relative z-20 w-full h-14 sm:h-16 lg:h-20 shrink-0 px-4 sm:px-8 lg:px-12 flex items-center justify-between border-b border-[#141414]/15 dark:border-white/10 bg-[#F4F2ED]/95 dark:bg-[#0C0D10]/95 backdrop-blur-xs">
            {/* Left: Boxed Close Button */}
            <button
              type="button"
              onClick={closeDetail}
              className="inline-flex items-center gap-2 h-8 sm:h-9 px-3 sm:px-4 border border-[#141414] dark:border-white/25 bg-white dark:bg-[#181A20] text-[#141414] dark:text-white hover:bg-[#141414] dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wider uppercase cursor-pointer shadow-2xs"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>CLOSE</span>
            </button>

            {/* Center: Hazsols Studio Logo */}
            <div className="flex flex-col items-center text-[#1F3FB0] dark:text-[#0CABA3]">
              <span className="text-[12px] sm:text-[14px] font-bold tracking-[0.2em] font-mono uppercase">
                HAZSOLS ARCHITECTURE
              </span>
              <span className="text-[8.5px] sm:text-[9px] font-mono font-semibold tracking-[0.25em] text-[#1F3FB0]/80 dark:text-[#0CABA3]/80 uppercase">
                TECH SPEC · 2026
              </span>
            </div>

            {/* Right: Standards Badge */}
            <div className="hidden sm:inline-flex items-center text-[10.5px] sm:text-[11px] font-mono font-bold tracking-widest text-[#6D6A63] dark:text-gray-400 uppercase border border-[#141414]/20 dark:border-white/15 px-3 py-1 rounded-full bg-white/60 dark:bg-white/[0.05]">
              PRODUCTION READY
            </div>
          </div>

          {/* Main Content Area: Smooth native vertical scrolling on mobile/tablet, centered on desktop */}
          <div
            data-lenis-prevent
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative z-10 flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden overscroll-contain"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
          >
            <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 lg:py-10 min-h-full flex flex-col justify-between">
              
              {/* Row / Grid */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between gap-8 sm:gap-10 lg:gap-14 my-auto">
                
                {/* Left Column: Masked Rising Typography & Specs */}
                <div className="w-full lg:max-w-[540px] flex flex-col justify-center shrink-0">
                  
                  {/* Category & Tier Badge */}
                  <div className="overflow-hidden mb-2">
                    <div
                      className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-widest text-[#1F3FB0] dark:text-[#0CABA3] uppercase"
                      style={{ animation: "textRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both" }}
                    >
                      <span className="px-2.5 py-0.5 rounded bg-[#1F3FB0]/10 dark:bg-[#0CABA3]/15 border border-[#1F3FB0]/20 dark:border-[#0CABA3]/30">
                        {detailItem.category}
                      </span>
                      <span className="text-gray-400 dark:text-white/25">/</span>
                      <span className="text-[#6D6A63] dark:text-gray-400">{detailItem.tier}</span>
                    </div>
                  </div>

                  {/* Main Title */}
                  <div className="overflow-hidden mb-1.5 sm:mb-2">
                    <h2
                      className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414] dark:text-white leading-[1.05]"
                      style={{ animation: "textRise 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both" }}
                    >
                      {detailItem.name}
                    </h2>
                  </div>

                  {/* Subline */}
                  <div className="overflow-hidden mb-3 sm:mb-4">
                    <p
                      className="text-[11.5px] sm:text-[13px] font-mono font-bold text-[#0CABA3] tracking-wider uppercase"
                      style={{ animation: "textRise 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.49s both" }}
                    >
                      {detailItem.subline}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="overflow-hidden mb-4 sm:mb-5">
                    <p
                      className="text-[13.5px] sm:text-[15.5px] text-[#2D2D2D] dark:text-gray-300 leading-relaxed max-w-[48ch]"
                      style={{ animation: "textRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.56s both" }}
                    >
                      {detailItem.description}
                    </p>
                  </div>

                  {/* Key Features Box */}
                  <div className="overflow-hidden mb-5 sm:mb-6">
                    <div
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-[#141414]/10 dark:border-white/10 shadow-sm max-w-[520px]"
                      style={{ animation: "textRise 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.63s both" }}
                    >
                      <h4 className="text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#141414] dark:text-white mb-2 sm:mb-2.5 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1F3FB0] dark:text-[#0CABA3]" />
                        Key Capabilities
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12.5px] text-[#333] dark:text-gray-300 font-mono">
                        {detailItem.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FB0] dark:bg-[#0CABA3] shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="overflow-hidden">
                    <div
                      className="flex flex-wrap items-center gap-2.5 sm:gap-3.5"
                      style={{ animation: "textRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.70s both" }}
                    >
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 h-9 sm:h-11 px-4 sm:px-6 bg-[#1F3FB0] hover:bg-[#162e80] dark:bg-[#0CABA3] dark:hover:bg-[#098f88] text-white text-[10.5px] sm:text-[12px] font-mono font-bold tracking-wider uppercase transition-all shadow-md rounded-full cursor-pointer"
                      >
                        <span>Build with {detailItem.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </Link>
                      <button
                        type="button"
                        onClick={closeDetail}
                        className="inline-flex items-center justify-center h-9 sm:h-11 px-4 sm:px-6 border border-[#141414]/30 dark:border-white/25 hover:border-[#141414] dark:hover:border-white hover:bg-[#141414] dark:hover:bg-white hover:text-white dark:hover:text-gray-900 text-[#141414] dark:text-white text-[10.5px] sm:text-[12px] font-mono font-bold tracking-wider uppercase transition-colors rounded-full cursor-pointer"
                      >
                        Return to Shelf
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right Column: Physical Cartridge Poster Card with Expanding Reveal */}
                <div className="w-full lg:w-auto flex items-center justify-center shrink-0 pt-2 pb-6 lg:py-0">
                  <div
                    className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] lg:w-[390px] h-[380px] xs:h-[420px] sm:h-[480px] lg:h-[520px] rounded-[22px] sm:rounded-[24px] p-5 sm:p-7 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/20 select-none"
                    style={{
                      background: getCardGradient(detailItem).background,
                      boxShadow: getCardGradient(detailItem).boxShadow,
                      animation: "posterInkReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
                    }}
                  >
                    {/* Watermarked Tech Logo Silhouette */}
                    <div className="absolute -right-8 top-16 w-56 sm:w-64 h-56 sm:h-64 opacity-[0.08] pointer-events-none filter grayscale contrast-150 z-0">
                      <Image
                        src={detailItem.logo}
                        alt=""
                        fill
                        sizes="256px"
                        className="object-contain"
                      />
                    </div>

                    {/* Inner Specular Light Border */}
                    <div className="absolute inset-0 pointer-events-none rounded-[22px] sm:rounded-[24px] border border-white/20 z-[2]" />

                    {/* Poster Top Row */}
                    <div className="relative z-10 flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/15">
                      <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-white/10 text-white text-[9.5px] sm:text-[10.5px] font-mono font-bold tracking-widest uppercase border border-white/20 backdrop-blur-md">
                        {detailItem.category}
                      </span>
                      <span className="text-[9.5px] sm:text-[11px] font-mono text-white/60 tracking-widest uppercase font-semibold">
                        HAZSOLS ARCHITECTURE
                      </span>
                    </div>

                    {/* Poster Center Hero Art */}
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-2 sm:py-4 text-center">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/25 p-2.5 sm:p-3.5 flex items-center justify-center shadow-xl backdrop-blur-md mb-3 sm:mb-5">
                        <Image
                          src={detailItem.logo}
                          alt={detailItem.name}
                          width={44}
                          height={44}
                          className="object-contain sm:w-[52px] sm:h-[52px]"
                        />
                      </div>
                      <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1 leading-none">
                        {detailItem.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11.5px] font-mono font-semibold text-white/70 tracking-widest uppercase mb-2">
                        {detailItem.subline}
                      </p>
                      <div className="w-8 h-0.5 bg-[#0CABA3] mb-2" />
                      <p className="text-[11.5px] sm:text-[13.5px] text-white/85 max-w-[260px] sm:max-w-[280px] leading-relaxed line-clamp-3">
                        {detailItem.tagline}
                      </p>
                    </div>

                    {/* Poster Bottom Row */}
                    <div className="relative z-10 pt-2.5 sm:pt-3 border-t border-white/15 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-widest uppercase font-semibold">
                        PRODUCTION READY
                      </span>
                      <span className="text-[9.5px] sm:text-[10.5px] font-mono font-bold text-[#0CABA3] tracking-wider uppercase">
                        HAZSOLS STACK
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Footer Notice */}
              <div className="mt-8 pt-4 pb-6 sm:pb-2 border-t border-[#141414]/10 dark:border-white/10 flex items-center justify-center text-[9px] sm:text-[10px] font-mono text-[#6D6A63] dark:text-gray-500 tracking-widest uppercase">
                HAZSOLS DIGITAL SOLUTIONS · PRODUCTION STACK 2026
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Global CSS Keyframe Animations (100% Reliable Hardware Accelerated) */}
      <style jsx global>{`
        .sheet-animate-open {
          animation: sheetOpen 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .sheet-animate-close {
          animation: sheetClose 0.42s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }

        @keyframes sheetOpen {
          0% {
            transform: scale(0.28) rotate(-4.5deg);
            opacity: 0.8;
            border-radius: 20px;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            border-radius: 0px;
          }
        }

        @keyframes sheetClose {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            border-radius: 0px;
          }
          100% {
            transform: scale(0.28) rotate(-4.5deg);
            opacity: 0;
            border-radius: 20px;
          }
        }

        @keyframes textRise {
          0% {
            transform: translateY(120%);
            opacity: 0;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @keyframes posterInkReveal {
          0% {
            transform: scale(0.9);
            opacity: 0;
            clip-path: circle(0% at 50% 50%);
          }
          100% {
            transform: scale(1);
            opacity: 1;
            clip-path: circle(150% at 50% 50%);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
