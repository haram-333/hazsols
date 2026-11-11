"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BentoCard from "./bento-card";

export interface BentoService {
  id: string;
  tag: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  href: string;
  accent: string;
  bentoClass: string;
}

const BENTO_SERVICES: BentoService[] = [
  {
    id: "generative-ai",
    tag: "[01] ARTIFICIAL INTELLIGENCE",
    title: "AI Development & Automation",
    description: "Custom AI tools, internal chatbots, and automated workflows that handle routine work and connect directly with your company data.",
    features: ["Custom AI Models", "Internal Chatbots", "Workflow Automation", "API Integration"],
    image: "/images/generative-ai.jpg",
    href: "/services/ai",
    accent: "#8B5CF6",
    bentoClass: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 min-h-[400px] md:min-h-[540px]",
  },
  {
    id: "mobile-app-dev",
    tag: "[02] MOBILE APPS",
    title: "iOS & Android Apps",
    description: "Fast, reliable mobile applications built for iPhone and Android with smooth navigation, offline support, and simple user accounts.",
    features: ["iOS & Android", "Offline Support", "Secure Login", "App Store Ready"],
    image: "/images/mobile-app-development.jpg",
    href: "/services/app",
    accent: "#0284C7",
    bentoClass: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 min-h-[260px] md:min-h-[290px]",
  },
  {
    id: "web-dev",
    tag: "[03] WEB DEVELOPMENT",
    title: "Websites & Web Apps",
    description: "Modern, fast-loading websites and web applications built with Next.js and React that look great and turn visitors into clients.",
    features: ["Next.js & React", "Fast Load Times", "Mobile-Friendly", "Admin Dashboards"],
    image: "/images/web-development.jpg",
    href: "/services/web",
    accent: "#0CABA3",
    bentoClass: "col-span-1 row-span-1 min-h-[260px] md:min-h-[290px]",
  },
  {
    id: "seo",
    tag: "[04] SEARCH & PERFORMANCE",
    title: "Search Optimization & Speed",
    description: "Technical SEO, clean site structure, and fast performance to help your business rank higher on Google search results.",
    features: ["Technical SEO", "Speed Optimization", "Search Console"],
    image: "/images/seo.jpg",
    href: "/services/web",
    accent: "#0CABA3",
    bentoClass: "col-span-1 row-span-1 min-h-[260px] md:min-h-[290px]",
  },
  {
    id: "ecommerce",
    tag: "[05] E-COMMERCE",
    title: "Online Stores & Checkout",
    description: "Custom Shopify stores and ecommerce platforms with fast checkout, secure payments, and simple inventory management.",
    features: ["Shopify & Custom Stores", "Stripe Payments", "Inventory Sync", "Simple Checkout"],
    image: "/images/ecommerce.jpg",
    href: "/services/custom-software",
    accent: "#10B981",
    bentoClass: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 min-h-[260px] md:min-h-[290px]",
  },
  {
    id: "custom-software",
    tag: "[06] CUSTOM SOFTWARE",
    title: "Cloud Systems & APIs",
    description: "Scalable backends, customer portals, and custom web services built to keep your business data secure and accessible 24/7.",
    features: ["Custom Backends", "Cloud Hosting", "REST APIs", "Secure Databases"],
    image: "/images/custom-software-development-cover.jpg",
    href: "/services/custom-software",
    accent: "#3B82F6",
    bentoClass: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 min-h-[260px] md:min-h-[290px]",
  },
];

export default function ServiceCards() {
  return (
    <div className="w-full relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {BENTO_SERVICES.map((service) => (
          <BentoCard
            key={service.id}
            href={service.href}
            surface="dark"
            spotlightColor={`${service.accent}2e`}
            wrapperClassName={service.bentoClass}
            className="h-full rounded-[28px] p-7 sm:p-9 flex flex-col justify-between"
          >
            {/* ── Background Cinematic Photography with Smooth Zoom ── */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden rounded-[28px]">
              {/* Deep Fallback Tone */}
              <div className="absolute inset-0 bg-[#0c0c0e]" />

              {/* Real Photography with Grayscale to Full Color Transition */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center opacity-30 grayscale contrast-125 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:opacity-75 group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* Cinematic Vignette Gradient for Perfect Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/35 z-[1]" />

              {/* Atmospheric Colored Ambient Glow Blooming from Top Right on Hover */}
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-[2]"
                style={{ backgroundColor: service.accent }}
              />

              {/* Specular Inner Edge Shimmer */}
              <div className="absolute inset-0 pointer-events-none rounded-[28px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] z-[4]" />
            </div>

            {/* ── Top Row: Index Badge + Interactive Action Disc ── */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-8">
              <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/80 group-hover:border-white/30 group-hover:text-white group-hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                {service.tag}
              </span>

              <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45 group-hover:scale-105 transition-all duration-300 backdrop-blur-md shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* ── Bottom Content: Title, Description & Feature Tags ── */}
            <div className="relative z-10 flex flex-col justify-end mt-auto">
              <h3 className="font-outfit font-bold text-2xl sm:text-3xl lg:text-[32px] text-white tracking-tight leading-snug group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>

              <p className="font-inter text-[14px] sm:text-[15px] text-gray-300/90 leading-relaxed font-normal mt-3 max-w-xl">
                {service.description}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.08] group-hover:border-white/[0.16] transition-colors duration-300">
                {service.features.map((feat, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 group-hover:text-white group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-300"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

          </BentoCard>
        ))}
      </div>
    </div>
  );
}
