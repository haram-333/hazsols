"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ServiceHero from "./service-hero";
import ServiceOverview from "./service-overview";
import ServiceTechnologies from "./service-technologies";
import WhyChooseUs from "./why-choose-us";
import DevelopmentProcess from "./development-process";
import TechStack from "./tech-stack";
import InsightsSection from "./insights-section";
import ContactForm from "./contact-form";
import Footer from "./footer";
import BentoCard from "./bento-card";

export type ServiceType = "web" | "app" | "ai" | "custom-software";

interface ServiceDetailTemplateProps {
  serviceType: ServiceType;
  category: string;
  title: string;
  buttonText: string;
}

const ALL_SERVICES: Array<{
  type: ServiceType;
  title: string;
  tagline: string;
  href: string;
}> = [
  {
    type: "web",
    title: "Web Development",
    tagline: "Next.js, React & modern platforms",
    href: "/services/web",
  },
  {
    type: "app",
    title: "Mobile App Development",
    tagline: "iOS, Android & cross-platform apps",
    href: "/services/app",
  },
  {
    type: "ai",
    title: "AI Development",
    tagline: "Document search, chatbots & workflow automation",
    href: "/services/ai",
  },
  {
    type: "custom-software",
    title: "Custom Software",
    tagline: "Internal portals, backends, APIs & ERPs",
    href: "/services/custom-software",
  },
];

export default function ServiceDetailTemplate({
  serviceType,
  category,
  title,
  buttonText,
}: ServiceDetailTemplateProps) {
  useEffect(() => {
    if (window.location.hash === "#technologies") {
      const timer = setTimeout(() => {
        const element = document.getElementById("technologies");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const siblingServices = ALL_SERVICES.filter(
    (item) => item.type !== serviceType
  );

  return (
    <main className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] text-gray-900 dark:text-gray-100 overflow-x-clip transition-colors duration-300">
      <ServiceHero
        serviceType={serviceType}
        category={category}
        title={title}
        buttonText={buttonText}
      />
      <ServiceOverview serviceType={serviceType} />
      <ServiceTechnologies serviceType={serviceType} />
      <WhyChooseUs serviceType={serviceType} />
      <DevelopmentProcess serviceType={serviceType} />
      <TechStack serviceType={serviceType} />
      <InsightsSection />

      {/* Explore Sibling Services */}
      <section className="relative w-full bg-[#F5F5F5] dark:bg-[#101115] py-16 sm:py-20 border-b border-black/10 dark:border-white/[0.08] transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#0CABA3]">
                OTHER DISCIPLINES
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 dark:text-white mt-1">
                Continue exploring Hazsols services.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white hover:text-[#0CABA3] transition-colors"
            >
              <span>All Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
            {siblingServices.map((srv, idx) => (
              <BentoCard
                key={srv.type}
                href={srv.href}
                wrapperClassName={
                  idx === 0
                    ? "md:col-span-5"
                    : idx === 1
                    ? "md:col-span-4"
                    : "md:col-span-3"
                }
                className="p-6 sm:p-7 flex items-center justify-between gap-4 h-full"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#0CABA3] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {srv.tagline}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/[0.06] group-hover:bg-[#0CABA3] text-gray-900 dark:text-white group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </main>
  );
}

