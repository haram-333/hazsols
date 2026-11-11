"use client";

import React from "react";
import SubpageHero from "./subpage-hero";
import TextRollButton from "./text-roll-button";

interface ServiceHeroProps {
  serviceType: "web" | "app" | "ai" | "custom-software";
  category: string;
  title: string;
  buttonText: string;
}

const serviceConfig = {
  web: {
    index: "01",
    category: "WEB DEVELOPMENT",
    title: "Fast Websites & Web Apps",
    description:
      "Marketing websites, customer portals, and Next.js web applications built to load fast, rank cleanly, and turn visitors into customers.",
    buttonText: "Start a Web Project",
    highlights: ["Next.js & React", "Clean SEO", "Mobile Responsive"],
  },
  app: {
    index: "02",
    category: "MOBILE APPS",
    title: "iOS & Android Apps Built to Last",
    description:
      "Fast mobile apps for iPhone and Android with clean navigation, offline support, and App Store release handled from start to finish.",
    buttonText: "Start a Mobile App",
    highlights: ["iOS & Android", "Offline Support", "Store Deployment"],
  },
  ai: {
    index: "03",
    category: "AI & AUTOMATION",
    title: "Practical AI for Real Work",
    description:
      "Internal chatbots, document extraction tools, and workflow automations wired directly into the software your team already uses.",
    buttonText: "Start an AI Project",
    highlights: ["Internal Search", "Workflow Automation", "Private Data Safe"],
  },
  "custom-software": {
    index: "04",
    category: "CUSTOM SOFTWARE",
    title: "Software Built for Your Team",
    description:
      "Internal dashboards, booking platforms, custom APIs, and ERP tools built around the way your business actually works.",
    buttonText: "Scope Custom Software",
    highlights: ["Custom Portals", "API Integrations", "Full Code Ownership"],
  },
};

export default function ServiceHero({
  serviceType,
  category,
  title,
  buttonText,
}: ServiceHeroProps) {
  const config = serviceConfig[serviceType];

  return (
    <SubpageHero
      indexLabel={config.index}
      eyebrow={category || config.category}
      backHref="/services"
      backLabel="All Services"
      title={title || config.title}
      description={config.description}
      orbitPreset={serviceType}
      actions={
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <TextRollButton
              text={buttonText || config.buttonText}
              href="#contact"
              theme="orange"
              fullWidthOnMobile
            />
            <TextRollButton
              text="Explore capabilities"
              href="#technologies"
              theme="outline"
              fullWidthOnMobile
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {config.highlights.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/[0.06] backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] text-[11px] font-mono font-medium text-gray-700 dark:text-white/75"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      }
    />
  );
}
