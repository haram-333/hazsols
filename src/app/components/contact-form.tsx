"use client";

import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ChevronDown, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck, Check } from "lucide-react";

const SERVICE_OPTIONS = [
  { value: "Web Application", label: "Web Application (Next.js / React)" },
  { value: "Mobile App", label: "Mobile Application (iOS / Android)" },
  { value: "Custom Backend", label: "Custom Backend & API Development" },
  { value: "E-Commerce", label: "E-Commerce Storefront & Checkout" },
  { value: "Code Audit", label: "Codebase Audit & Performance Tuning" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    subject: "Web Application",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.company.trim()) newErrors.company = "Please enter your company or project name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Please tell us a little about your project.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: "Web Inquiry",
          company_name: formData.company,
          company_domain: "Submitted via Hazsols Contact Form",
          budget: "To be discussed",
          region: "Worldwide",
          services: formData.subject,
          project_details: formData.message,
          to_email: "hazsolssolution@gmail.com",
        };

        emailjs.init("96tNctYJk2XNrx0h0");

        await emailjs.send(
          "service_r6zkxtd",
          "template_doitlxq",
          templateParams
        );

        // Send confirmation email
        try {
          await emailjs.send(
            "service_r6zkxtd",
            "template_ywm0y4p",
            {
              name: formData.name,
              user_name: formData.name,
              email: formData.email,
              user_email: formData.email,
              to_email: formData.email,
              company_name: "HazSols",
              company_email: "hazsolssolution@gmail.com",
              website_link: "https://hazsols.com",
            }
          );
        } catch {
          // Non-blocking confirmation error
        }

        setSubmitStatus("success");
        setFormData({
          name: "",
          company: "",
          email: "",
          subject: "Web Application",
          message: "",
        });
      } catch (err) {
        console.error("Submission failed:", err);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section 
      id="contact"
      className="relative w-full bg-[#08080a] text-white overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Background Subtle Ambient Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0CABA3]/[0.025] blur-[160px] pointer-events-none" />

      {/* ── True Full-Width 2-Panel Split (Edge-to-Edge) ── */}
      <div className="w-full min-h-[780px] lg:min-h-[860px] grid grid-cols-1 lg:grid-cols-12">
        
        {/* ─────────────────────────────────────────────────────────────
            LEFT PANEL: Editorial Full Code Architecture Image + Signature Badge 7
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 relative min-h-[600px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-white/[0.08] px-8 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-between overflow-hidden">
          
          {/* Full Image covering 100% of Left Column - Real Developer & Code Setup */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&auto=format&fit=crop&q=85"
              alt="Software Engineer Coding at Workstation"
              className="w-full h-full object-cover object-center brightness-95 contrast-105"
              loading="lazy"
            />
            {/* Targeted Top Vignette for Badge Readability */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#08080a]/90 via-[#08080a]/35 to-transparent z-10 pointer-events-none" />
            
            {/* Targeted Bottom Vignette for Headline & Text Readability */}
            <div className="absolute bottom-0 inset-x-0 h-[480px] bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Top Row: Same Numbered Pill Badge as Section 6 */}
          <div className="relative z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black text-[11px] sm:text-[12px] font-bold flex items-center justify-center shadow-lg">
                7
              </div>
              <div className="text-[12px] sm:text-[13px] font-mono font-semibold tracking-wider border border-white/10 rounded-full px-4 py-1 text-white/90 bg-white/[0.04] backdrop-blur-md">
                CONTACT US
              </div>
            </div>
          </div>

          {/* Giant Display Headline */}
          <div className="relative z-20 my-10 lg:my-14">
            <h2 className="font-outfit font-black text-[clamp(3.5rem,6.8vw,6.5rem)] text-white leading-[0.92] tracking-[-0.04em] drop-shadow-2xl">
              Ready to<br />
              Build?
            </h2>
            
            <div className="mt-8 flex items-center gap-3 text-white/70">
              <ChevronDown className="w-5 h-5 text-white/70 animate-bounce" />
              <span className="text-xs font-mono tracking-widest uppercase">Direct engineer response</span>
            </div>
          </div>

          {/* Bottom Human Value Proposition */}
          <div className="relative z-20 mt-auto pt-8">
            <h3 className="font-outfit font-bold text-2xl sm:text-3xl text-white mb-2.5 leading-tight tracking-tight drop-shadow-lg">
              Talk directly to the engineers.
            </h3>
            
            <p className="text-sm sm:text-[15px] text-white/80 leading-relaxed font-normal max-w-md mb-8 drop-shadow-md">
              No sales pitches or middle layers. You communicate directly with the team architecting, writing, and deploying your code.
            </p>

            <a
              href="#faq"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/50 hover:bg-black/75 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-md shadow-xl"
            >
              <span>Have Questions? Check FAQ</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0CABA3]" />
            </a>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT PANEL: The Form (Full-Bleed Right Side, Custom Dark Inputs)
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 relative bg-[#08080c] px-8 sm:px-14 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-between">
          
          {/* Form Header */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#0CABA3]">
                // START YOUR PROJECT
              </span>
              <span className="text-xs font-mono text-white/40 tracking-wider">
                RESPONSE WITHIN 24 HOURS
              </span>
            </div>
            
            <h3 className="font-outfit font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none mb-4">
              Tell us about your project.
            </h3>
            <p className="text-sm sm:text-[15.5px] text-white/70 font-normal leading-relaxed max-w-xl">
              Share what you want to build, your timeline, or any technical requirements. We review every note and reply within one business day.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-7">
            
            {/* Row 1: Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center justify-between text-[11px] font-mono font-medium tracking-[0.18em] text-white/60 uppercase mb-2.5">
                  <span>Your Name</span>
                  <span className="text-[#0CABA3] text-[10px] tracking-normal font-sans">* required</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Vance"
                    className={`w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0d0d12] border text-white rounded-xl px-5 py-4 text-[15px] font-sans outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-200 placeholder:text-white/25 ${
                      errors.name 
                        ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/40" 
                        : "border-white/[0.12] hover:border-white/20 focus:border-[#0CABA3] focus:ring-1 focus:ring-[#0CABA3] focus:shadow-[0_0_20px_rgba(12,171,163,0.18)]"
                    }`}
                  />
                </div>
                {errors.name && (
                  <span className="text-red-400 text-xs font-mono mt-1.5 block">
                    {errors.name}
                  </span>
                )}
              </div>

              <div>
                <label className="flex items-center justify-between text-[11px] font-mono font-medium tracking-[0.18em] text-white/60 uppercase mb-2.5">
                  <span>Company or Project Name</span>
                  <span className="text-[#0CABA3] text-[10px] tracking-normal font-sans">* required</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Studio"
                    className={`w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0d0d12] border text-white rounded-xl px-5 py-4 text-[15px] font-sans outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-200 placeholder:text-white/25 ${
                      errors.company 
                        ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/40" 
                        : "border-white/[0.12] hover:border-white/20 focus:border-[#0CABA3] focus:ring-1 focus:ring-[#0CABA3] focus:shadow-[0_0_20px_rgba(12,171,163,0.18)]"
                    }`}
                  />
                </div>
                {errors.company && (
                  <span className="text-red-400 text-xs font-mono mt-1.5 block">
                    {errors.company}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Email & Subject / Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center justify-between text-[11px] font-mono font-medium tracking-[0.18em] text-white/60 uppercase mb-2.5">
                  <span>Email Address</span>
                  <span className="text-[#0CABA3] text-[10px] tracking-normal font-sans">* required</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@company.com"
                    className={`w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0d0d12] border text-white rounded-xl px-5 py-4 text-[15px] font-sans outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-200 placeholder:text-white/25 ${
                      errors.email 
                        ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/40" 
                        : "border-white/[0.12] hover:border-white/20 focus:border-[#0CABA3] focus:ring-1 focus:ring-[#0CABA3] focus:shadow-[0_0_20px_rgba(12,171,163,0.18)]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <span className="text-red-400 text-xs font-mono mt-1.5 block">
                    {errors.email}
                  </span>
                )}
              </div>

              <div ref={dropdownRef} className="relative">
                <label className="flex items-center justify-between text-[11px] font-mono font-medium tracking-[0.18em] text-white/60 uppercase mb-2.5">
                  <span>What are you building?</span>
                  <span className="text-white/40 text-[10px] tracking-normal font-sans">select option</span>
                </label>
                
                {/* Custom Dropdown Trigger */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.05] border rounded-xl px-5 py-4 text-[15px] font-sans text-left transition-all duration-200 cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] ${
                    isDropdownOpen
                      ? "bg-[#0d0d12] border-[#0CABA3] ring-1 ring-[#0CABA3] shadow-[0_0_20px_rgba(12,171,163,0.18)]"
                      : "border-white/[0.12] hover:border-white/20 text-white"
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="text-white truncate">
                    {SERVICE_OPTIONS.find((opt) => opt.value === formData.subject)?.label || formData.subject}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/50 transition-transform duration-200 shrink-0 ml-3 ${
                      isDropdownOpen ? "rotate-180 text-[#0CABA3]" : ""
                    }`}
                  />
                </button>

                {/* Custom Dark-Glass Dropdown Menu (No default OS blue popups) */}
                {isDropdownOpen && (
                  <div 
                    className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl bg-[#0e0e14] backdrop-blur-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.9)] p-1.5 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150"
                    role="listbox"
                  >
                    {SERVICE_OPTIONS.map((option) => {
                      const isSelected = formData.subject === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, subject: option.value }));
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-[14px] font-sans transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-[#0CABA3]/15 text-[#0CABA3] font-semibold"
                              : "text-white/80 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          <span className="truncate">{option.label}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[#0CABA3] shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Row 3: Message Textarea */}
            <div>
              <label className="flex items-center justify-between text-[11px] font-mono font-medium tracking-[0.18em] text-white/60 uppercase mb-2.5">
                <span>Project Details</span>
                <span className="text-[#0CABA3] text-[10px] tracking-normal font-sans">* required</span>
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us what you want to build, any key features, target deadlines, or links to existing designs..."
                  className={`w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0d0d12] border text-white rounded-xl px-5 py-4 text-[15px] font-sans outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-200 resize-none placeholder:text-white/25 ${
                    errors.message 
                      ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/40" 
                      : "border-white/[0.12] hover:border-white/20 focus:border-[#0CABA3] focus:ring-1 focus:ring-[#0CABA3] focus:shadow-[0_0_20px_rgba(12,171,163,0.18)]"
                  }`}
                />
              </div>
              {errors.message && (
                <span className="text-red-400 text-xs font-mono mt-1.5 block">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Status Feedback Banners */}
            {submitStatus === "success" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Message received! We will review your project notes and reply within 24 hours.</span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Could not send message. Please check your network or email us directly at hazsolssolution@gmail.com.</span>
              </div>
            )}

            {/* Bottom Row: Privacy Assurance & Submit Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3">
              <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#0CABA3]/80" />
                <span>Direct engineer inbox. No spam or newsletters.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-[#0CABA3] hover:bg-[#10c4bb] text-white font-mono font-bold uppercase tracking-[0.16em] text-xs sm:text-sm rounded-xl shadow-[0_4px_20px_rgba(12,171,163,0.3)] hover:shadow-[0_8px_30px_rgba(12,171,163,0.5)] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}