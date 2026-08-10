"use client";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // GSAP Refs
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Initialize GSAP Timeline
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ paused: true })
                // Animate background overlay (opacity and visibility/pointer-events)
                .to(mobileMenuRef.current, {
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: 'power3.inOut'
                })
                // Stagger animate links up
                .fromTo(linkRefs.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                    "-=0.3" // overlap with background animation
                );
        }, mobileMenuRef);

        return () => ctx.revert();
    }, []);

    // Play/Reverse based on state
    useEffect(() => {
        if (tlRef.current) {
            if (isMobileMenuOpen) {
                tlRef.current.play();
            } else {
                tlRef.current.reverse();
            }
        }
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open (iOS Safari proof)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        if (isMobileMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        
        return () => { 
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* DESKTOP & TABLET HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white py-8 pointer-events-none">
                <div className="w-full max-w-[90rem] mx-auto px-6 flex justify-between items-center pointer-events-auto">
                    
                    {/* Logo */}
                    <a href="/" className="relative flex items-center group overflow-hidden animate-nav-reveal" style={{ animationDelay: '2.0s' }}>
                        <div className="w-12 h-12 relative overflow-hidden transition-transform duration-500 group-hover:scale-110">
                            <Image src="/logo.png" alt="Hazsols Logo" fill className="object-contain" priority />
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-10 font-inter text-xs font-bold tracking-[0.2em] uppercase">
                        <a href="/" className="kinetic-link transition-colors animate-nav-reveal" style={{ '--kinetic-color': '#c8f04a', animationDelay: '2.1s' } as React.CSSProperties}>
                            <span className="kinetic-text-wrapper" data-text="HOME">HOME</span>
                        </a>
                        
                        <a href="/about" className="kinetic-link transition-colors animate-nav-reveal" style={{ '--kinetic-color': '#c8f04a', animationDelay: '2.2s' } as React.CSSProperties}>
                            <span className="kinetic-text-wrapper" data-text="ABOUT">ABOUT</span>
                        </a>
                        
                        {/* Services Dropdown */}
                        <div className="group relative h-16 flex items-center animate-nav-reveal" style={{ animationDelay: '2.3s' }}>
                            <a href="/services" className="kinetic-link cursor-pointer" style={{ '--kinetic-color': '#c8f04a' } as React.CSSProperties}>
                                <span className="kinetic-text-wrapper" data-text="SERVICES">SERVICES</span>
                            </a>
                            
                            {/* Dropdown Container (Invisible Bridge + Content) */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500">
                                {/* Glassmorphism Dropdown Menu */}
                                <div className="w-64 bg-[#050505]/60 backdrop-blur-2xl border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl p-2 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <a href="/services/web" className="px-6 py-4 rounded-2xl hover:bg-white/10 hover:text-[#c8f04a] transition-all duration-300">WEB DEVELOPMENT</a>
                                    <a href="/services/app" className="px-6 py-4 rounded-2xl hover:bg-white/10 hover:text-[#c8f04a] transition-all duration-300">APP DEVELOPMENT</a>
                                    <a href="/services/ai" className="px-6 py-4 rounded-2xl hover:bg-white/10 hover:text-[#c8f04a] transition-all duration-300">AI INTEGRATION</a>
                                    <a href="/services/custom-software" className="px-6 py-4 rounded-2xl hover:bg-white/10 hover:text-[#c8f04a] transition-all duration-300">CUSTOM SOFTWARE</a>
                                </div>
                            </div>
                        </div>

                        <a href="/process" className="kinetic-link transition-colors animate-nav-reveal" style={{ '--kinetic-color': '#c8f04a', animationDelay: '2.4s' } as React.CSSProperties}>
                            <span className="kinetic-text-wrapper" data-text="HOW WE DO IT">HOW WE DO IT</span>
                        </a>

                        {/* Contact Button */}
                        <a href="/contact" className="ml-4 px-8 py-3 rounded-full border border-white/30 hover:border-[#c8f04a] hover:bg-[#c8f04a]/10 transition-all duration-300 relative overflow-hidden group animate-nav-reveal" style={{ animationDelay: '2.5s' }}>
                            <span className="kinetic-link relative z-10 flex flex-col h-full justify-center" style={{ '--kinetic-color': '#c8f04a' } as React.CSSProperties}>
                                <span className="kinetic-text-wrapper" data-text="CONTACT">CONTACT</span>
                            </span>
                        </a>
                    </nav>

                    {/* Hamburger Button (Mobile) */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)} 
                        className="md:hidden flex flex-col justify-center items-end gap-2 w-10 h-10 group animate-nav-reveal"
                        aria-label="Open Menu"
                        style={{ animationDelay: '2.1s' }}
                    >
                        <div className="w-8 h-[2px] bg-white group-hover:bg-[#c8f04a] transition-colors duration-300"></div>
                        <div className="w-6 h-[2px] bg-white group-hover:bg-[#c8f04a] group-hover:w-8 transition-all duration-300"></div>
                    </button>
                </div>
            </header>

            {/* FULL SCREEN MOBILE MENU OVERLAY */}
            <div 
                ref={mobileMenuRef}
                className="fixed inset-0 z-[100] bg-[#050505] text-white opacity-0 invisible"
            >
                <div className="w-full h-full flex flex-col px-6 pb-6 overflow-y-auto">
                    {/* Mobile Menu Header (Logo & Close) */}
                    <div className="flex justify-between items-center w-full max-w-[90rem] mx-auto shrink-0 pt-8 pb-4 border-b border-white/5">
                        <div className="w-12 h-12 relative overflow-hidden">
                            <Image src="/logo.png" alt="Hazsols Logo" fill className="object-contain" priority />
                        </div>
                        
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="p-2 relative w-12 h-12 flex justify-center items-center group"
                            aria-label="Close Menu"
                        >
                            <div className="relative w-8 h-8 flex justify-center items-center">
                                <span className="absolute w-8 h-[2px] bg-white rotate-45 group-hover:bg-[#c8f04a] transition-colors duration-300"></span>
                                <span className="absolute w-8 h-[2px] bg-white -rotate-45 group-hover:bg-[#c8f04a] transition-colors duration-300"></span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Links */}
                    <div className="w-full max-w-[90rem] mx-auto mt-12 mb-auto shrink-0">
                        <nav className="flex flex-col gap-6 font-outfit text-5xl sm:text-6xl font-black uppercase tracking-tighter w-full">
                            <div className="overflow-hidden py-1">
                                <a 
                                   ref={el => { linkRefs.current[0] = el; }}
                                   href="/" onClick={() => setIsMobileMenuOpen(false)} 
                                   className="block hover:text-[#c8f04a] w-fit origin-left opacity-0"
                                >
                                    HOME
                                </a>
                            </div>
                            <div className="overflow-hidden py-1">
                                <a 
                                   ref={el => { linkRefs.current[1] = el; }}
                                   href="/about" onClick={() => setIsMobileMenuOpen(false)} 
                                   className="block hover:text-[#c8f04a] w-fit origin-left opacity-0"
                                >
                                    ABOUT
                                </a>
                            </div>
                            <div className="overflow-hidden py-1">
                                <a 
                                   ref={el => { linkRefs.current[2] = el; }}
                                   href="/services" onClick={() => setIsMobileMenuOpen(false)} 
                                   className="block hover:text-[#c8f04a] w-fit origin-left opacity-0"
                                >
                                    SERVICES
                                </a>
                            </div>
                            <div className="overflow-hidden py-1">
                                <a 
                                   ref={el => { linkRefs.current[3] = el; }}
                                   href="/process" onClick={() => setIsMobileMenuOpen(false)} 
                                   className="block hover:text-[#c8f04a] w-fit origin-left opacity-0"
                                >
                                    HOW WE DO IT
                                </a>
                            </div>
                            <div className="overflow-hidden py-1 mt-4">
                                <a 
                                   ref={el => { linkRefs.current[4] = el; }}
                                   href="/contact" onClick={() => setIsMobileMenuOpen(false)} 
                                   className="block text-[#c8f04a] hover:text-white w-fit origin-left opacity-0"
                                >
                                    CONTACT
                                </a>
                            </div>
                        </nav>
                    </div>

                    {/* Mobile Footer / Extras */}
                    <div className="w-full max-w-[90rem] mx-auto flex items-center justify-between border-t border-white/10 pt-8 shrink-0 mt-12" style={{ opacity: isMobileMenuOpen ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}>
                        <p className="font-inter text-sm text-white/50 tracking-widest uppercase">© 2024 Hazsols</p>
                        <div className="flex gap-4">
                            <a href="#" className="font-inter text-sm hover:text-[#c8f04a] transition-colors">EN</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}