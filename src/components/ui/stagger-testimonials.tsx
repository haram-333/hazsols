"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/app/components/theme-provider";

const CHAMFER_SIZE = 44;
const SQRT_CHAMFER = Math.sqrt(CHAMFER_SIZE * CHAMFER_SIZE * 2); // ~62.23px

export interface TestimonialItem {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
}

const testimonials: TestimonialItem[] = [
  {
    tempId: 0,
    testimonial: "Hazsols rebuilt our web platform from scratch in Next.js. Page speed jumped immediately, and our bounce rates dropped by over 30% in the first month.",
    by: "Marcus Vance, Founder at Apex Logistics",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 1,
    testimonial: "They delivered our iOS and Android mobile apps three weeks ahead of schedule. Clean code, smooth navigation, and zero hassle during app store submission.",
    by: "Elena Rostova, Product Lead at Nomad Pay",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 2,
    testimonial: "We were drowning in manual spreadsheets until Hazsols built our warehouse inventory dashboard. Our operations team saves at least three hours every single day.",
    by: "David Chen, Operations Director at Horizon Supply",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 3,
    testimonial: "Our checkout used to lose customers on mobile devices. Hazsols streamlined the entire flow, fixed cart abandonment, and our sales went up 24%.",
    by: "Sarah Jenkins, E-commerce Manager at Oakhaven Goods",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 4,
    testimonial: "Super responsive communication. Whenever we needed a quick adjustment or had a technical question, their engineering team had a fix within the hour.",
    by: "Tariq Mansoor, CTO at FinFlow Systems",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 5,
    testimonial: "They automated our customer verification and Stripe billing pipelines. It completely eliminated billing errors and freed up our support team.",
    by: "Rachel Adams, Head of Growth at Vela Health",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 6,
    testimonial: "Transparent weekly demos, clear milestone updates, and zero hidden costs. By far the most straightforward development agency we've contracted with.",
    by: "Liam Gallagher, Managing Director at Crestview Media",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 7,
    testimonial: "Our internal web tools had terrible performance under heavy load. Hazsols optimized our database queries and APIs—everything loads instantaneously now.",
    by: "Priya Patel, VP of Engineering at ScaleGrid",
    imgSrc: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 8,
    testimonial: "They took our Figma designs and turned them into production-ready code with exact attention to detail. We launched on our exact target date.",
    by: "Julian Moreno, Design Director at Studio Craft",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 9,
    testimonial: "Hazsols audited our Core Web Vitals and resolved all our layout shifts and load delays. Our Google search rankings steadily climbed within weeks.",
    by: "Hannah Brooks, Head of SEO at Beacon Digital",
    imgSrc: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 10,
    testimonial: "We needed custom multi-tenant portal functionality for corporate clients. Hazsols architected it cleanly, securely, and within our exact budget.",
    by: "Kavita Rao, Co-Founder at MetricDesk",
    imgSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=160&auto=format&fit=crop&q=80"
  },
  {
    tempId: 11,
    testimonial: "Honest, reliable engineers who genuinely listen to business requirements rather than pushing over-complicated tech. Would hire them again in a heartbeat.",
    by: "Derek Hall, General Manager at Summit Industrial",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
  isDark: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize,
  isDark,
}) => {
  // Cull cards that are far off screen
  if (Math.abs(position) > 4) return null;

  const isCenter = position === 0;
  const zIndex = isCenter ? 40 : Math.max(1, 30 - Math.abs(position));

  // 100% Solid, Opaque backgrounds - zero transparency anywhere!
  const bg = isDark
    ? isCenter
      ? "#F5F5F7"
      : Math.abs(position) === 1
        ? "#1A1C23"
        : "#13141A"
    : isCenter
      ? "#141418"
      : Math.abs(position) === 1
        ? "#ffffff"
        : "#f6f6f8";

  const textColor = isDark
    ? isCenter
      ? "#141418"
      : "#F5F5F7"
    : isCenter
      ? "#ffffff"
      : "#141418";

  const authorColor = isDark
    ? isCenter
      ? "#4B5563"
      : "rgba(255, 255, 255, 0.62)"
    : isCenter
      ? "rgba(255, 255, 255, 0.75)"
      : "#6D6A63";

  const borderColor = isDark
    ? isCenter
      ? "#0CABA3"
      : "rgba(255, 255, 255, 0.18)"
    : isCenter
      ? "#141418"
      : "rgba(20, 20, 24, 0.16)";

  const chamferColor = borderColor;

  const avatarBg = isDark
    ? isCenter
      ? "#E4E4E7"
      : "#252833"
    : isCenter
      ? "#222228"
      : "#f4f4f5";

  const avatarShadow = isDark
    ? "3px 3px 0px #0CABA3"
    : isCenter
      ? "3px 3px 0px #ffffff"
      : "3px 3px 0px #141418";

  const cardShadow = isDark
    ? isCenter
      ? "0px 10px 0px 4px rgba(12, 171, 163, 0.22), 0 24px 48px -12px rgba(0, 0, 0, 0.65)"
      : "0 14px 32px -8px rgba(0, 0, 0, 0.55)"
    : isCenter
      ? "0px 10px 0px 4px rgba(20, 20, 24, 0.16), 0 24px 48px -12px rgba(0, 0, 0, 0.28)"
      : "0 10px 24px -6px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)";

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-7 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] select-none",
        isCenter ? "group/active" : "hover:border-[#141418]/50 dark:hover:border-white/40"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        zIndex,
        opacity: 1, // STRICTLY 100% OPAQUE - ZERO TRANSPARENCY!
        backgroundColor: bg,
        color: textColor,
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: borderColor,
        clipPath: `polygon(0 0, calc(100% - ${CHAMFER_SIZE}px) 0, 100% ${CHAMFER_SIZE}px, 100% 100%, 0 100%)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: cardShadow,
      }}
    >
      {/* Precision 45-degree chamfer border rule (starts at (width - 44, 0) and ends at (width, 44)) */}
      <span
        className="absolute block pointer-events-none"
        style={{
          top: 0,
          right: CHAMFER_SIZE,
          width: SQRT_CHAMFER,
          height: 2,
          transformOrigin: "0 0",
          transform: "rotate(45deg)",
          backgroundColor: chamferColor,
        }}
      />

      {/* Client Avatar with Neo-Brutalist Hard Shadow */}
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        loading="lazy"
        className="mb-4 h-14 w-12 object-cover object-top rounded-[2px]"
        style={{
          backgroundColor: avatarBg,
          boxShadow: avatarShadow,
        }}
      />

      {/* Testimonial Quote */}
      <h3 
        className="text-sm sm:text-base md:text-lg font-medium leading-snug line-clamp-4"
        style={{ color: textColor }}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>

      {/* Author and Role */}
      <p 
        className="absolute bottom-6 sm:bottom-8 left-7 sm:left-8 right-7 sm:right-8 text-xs sm:text-sm font-mono tracking-wide truncate"
        style={{ color: authorColor }}
      >
        &mdash; {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const { theme, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - Math.floor(testimonialsList.length / 2)
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            isDark={isDark}
          />
        );
      })}

      {/* Control Chevron Buttons (Theme-Adaptive Neo-Brutalist) */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-50">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center transition-all cursor-pointer bg-white dark:bg-[#181A20] border-2 border-[#141418]/25 dark:border-white/20 text-[#141418] dark:text-white hover:bg-[#141418] dark:hover:bg-[#0CABA3] hover:text-white hover:border-[#141418] dark:hover:border-[#0CABA3] focus-visible:outline-none active:scale-95 shadow-md rounded-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center transition-all cursor-pointer bg-white dark:bg-[#181A20] border-2 border-[#141418]/25 dark:border-white/20 text-[#141418] dark:text-white hover:bg-[#141418] dark:hover:bg-[#0CABA3] hover:text-white hover:border-[#141418] dark:hover:border-[#0CABA3] focus-visible:outline-none active:scale-95 shadow-md rounded-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};
