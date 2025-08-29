'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Play, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e: any) => {
      console.log(e);
    });

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP animation for nav links
    const navLinks = navLinksRef.current?.querySelectorAll('.nav-link:not(.button-from-deep)');
    const button = navLinksRef.current?.querySelector('.button-from-deep');
    
    if (navLinks) {
      gsap.to(navLinks, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
      });
    }
    
    if (button) {
      gsap.fromTo(button, 
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          delay: 0.8 // Start after other nav links
        }
      );
    }

    // Navbar timeline for logo
    const navbarTl = gsap.timeline();
    
    // Logo animation
    navbarTl.fromTo('.logo-wrapper', 
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      0
    );

    // Cleanup Lenis on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // Dynamic background animation system
  useEffect(() => {
    const createCircle = () => {
      const circle = document.createElement('div');
      circle.className = 'absolute rounded-full blur-3xl animate-float';
      
      // Random properties
      const size = Math.random() * 300 + 200; // 200-500px
      const opacity = Math.random() * 0.08 + 0.02; // 0.02-0.1
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      // Create more engaging movement patterns
      const movementType = Math.floor(Math.random() * 4); // 0-3 for different patterns
      let path;
      
      switch(movementType) {
        case 0: // Horizontal zigzag
          path = [
            { x: startX, y: startY },
            { x: startX + (Math.random() * 400 - 200), y: startY + (Math.random() * 200 - 100) },
            { x: startX + (Math.random() * 400 - 200), y: startY + (Math.random() * 200 - 100) },
            { x: startX + (Math.random() * 400 - 200), y: startY + (Math.random() * 200 - 100) }
          ];
          break;
        case 1: // Figure 8 pattern
          const centerX = startX + (Math.random() * 200 - 100);
          const centerY = startY + (Math.random() * 200 - 100);
          const radius = Math.random() * 150 + 100;
          path = [
            { x: startX, y: startY },
            { x: centerX + radius, y: centerY },
            { x: centerX, y: centerY + radius },
            { x: centerX - radius, y: centerY },
            { x: centerX, y: centerY - radius },
            { x: centerX + radius, y: centerY }
          ];
          break;
        case 2: // Spiral pattern
          path = [];
          const spiralCenterX = startX + (Math.random() * 200 - 100);
          const spiralCenterY = startY + (Math.random() * 200 - 100);
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 4;
            const radius = 50 + i * 30;
            path.push({
              x: spiralCenterX + Math.cos(angle) * radius,
              y: spiralCenterY + Math.sin(angle) * radius
            });
          }
          break;
        case 3: // Random bounce pattern
          path = [
            { x: startX, y: startY },
            { x: startX + (Math.random() * 300 - 150), y: startY + (Math.random() * 300 - 150) },
            { x: startX + (Math.random() * 300 - 150), y: startY + (Math.random() * 300 - 150) },
            { x: startX + (Math.random() * 300 - 150), y: startY + (Math.random() * 300 - 150) },
            { x: startX + (Math.random() * 300 - 150), y: startY + (Math.random() * 300 - 150) }
          ];
          break;
      }
      
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.left = `${startX}px`;
      circle.style.top = `${startY}px`;
      circle.style.backgroundColor = `rgba(16, 185, 129, ${opacity})`;
      circle.style.zIndex = '0';
      
      document.querySelector('.hero-section')?.appendChild(circle);
      
      // Create timeline for complex movement
      const tl = gsap.timeline();
      
      // Animate through the path points
      path.forEach((point, index) => {
        if (index === 0) return; // Skip first point (starting position)
        
        const duration = Math.random() * 3 + 2; // 2-5 seconds per segment
        const ease = index % 2 === 0 ? "power2.inOut" : "power2.out"; // Alternate easing
        
        tl.to(circle, {
          x: point.x - startX,
          y: point.y - startY,
          duration: duration,
          ease: ease
        }, index === 1 ? 0 : "-=0.5"); // Slight overlap for smooth movement
      });
      
      // Fade out and remove
      tl.to(circle, {
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          circle.remove();
        }
      });
      
      // Add some rotation for extra engagement
      gsap.to(circle, {
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        ease: "none"
      });
    };

    // Create initial circles
    createCircle();
    createCircle();
    createCircle();
    createCircle();
    createCircle();
    createCircle();
    createCircle();
    createCircle();

    // Set interval to create new circles
    setInterval(createCircle, 10000); // Create new circle every 10 seconds
  }, []);

  return (
    <main id="main" className="min-h-screen bg-black relative overflow-hidden">
              {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-emerald-500/20">
          <div className="max-w-7xl mx-auto px-6 py-8 relative">
            <div className="flex items-center justify-end">
              {/* Logo - Left side */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 h-20 md:h-24 overflow-hidden" style={{ top: 'calc(50% - 10px)' }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="logo-wrapper"
                >
                                  <img 
                  src="/logo.png" 
                  alt="HazSols Logo" 
                  className="w-20 md:w-56 h-16 md:h-28 object-contain"
                />
                </motion.div>
              </div>

              {/* Desktop Navigation - Centered */}
              <div
                ref={navLinksRef}
                className="hidden md:flex items-center space-x-8 absolute right-0"
              >
                <div className="h-8 overflow-hidden">
                  <a href="#home" className="nav-link text-white hover:text-emerald-400 transition-colors duration-300 relative z-10 block">Home</a>
                </div>
                <div className="h-8 overflow-hidden">
                  <a href="#about" className="nav-link text-white hover:text-emerald-400 transition-colors duration-300 relative z-10 block">About</a>
                </div>
                <div className="h-8 overflow-hidden">
                  <a href="#services" className="nav-link text-white hover:text-emerald-400 transition-colors duration-300 relative z-10 block">Services</a>
                </div>
                <div className="h-8 overflow-hidden">
                  <a href="#portfolio" className="nav-link text-white hover:text-emerald-400 transition-colors duration-300 relative z-10 block">Portfolio</a>
                </div>
                <div className="h-8 overflow-hidden">
                  <a href="#contact" className="nav-link text-white hover:text-emerald-400 transition-colors duration-300 relative z-10 block">Contact</a>
                </div>
                <div className="h-8 overflow-hidden">
                  <button className="nav-link button-from-deep bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-5 py-1.5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Right side - Mobile Menu Only */}
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-white hover:text-emerald-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
              </div>

              {/* Mobile Menu Overlay */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-0 left-0 right-0 bg-black/95 border-b border-emerald-500/20 p-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Mobile Menu Header */}
                      <div className="flex items-center justify-between mb-8">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="flex items-center"
                        >
                          <img 
                            src="/logo.png" 
                            alt="HazSols Logo" 
                            className="w-20 h-auto"
                          />
                        </motion.div>
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-white hover:text-emerald-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                        >
                          <X className="w-6 h-6" />
                        </motion.button>
                      </div>

                      {/* Mobile Navigation Links */}
                      <div className="space-y-6">
                        {[
                          { href: "#home", label: "Home" },
                          { href: "#about", label: "About" },
                          { href: "#services", label: "Services" },
                          { href: "#portfolio", label: "Portfolio" },
                          { href: "#contact", label: "Contact" }
                        ].map((link, index) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: 0.3 + (index * 0.1),
                              ease: "easeOut"
                            }}
                            className="overflow-hidden"
                          >
                            <a 
                              href={link.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="text-2xl font-medium text-white hover:text-emerald-400 transition-colors duration-300 block py-2"
                            >
                              {link.label}
                            </a>
                          </motion.div>
                        ))}
                      </div>

                      {/* Mobile CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                        className="mt-8 pt-6 border-t border-emerald-500/20"
                      >
                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg">
                          Get Started
                        </button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/4 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
          
          {/* Additional circles for more depth */}
          <div className="absolute top-40 right-20 w-80 h-80 bg-emerald-500/7 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-emerald-500/6 rounded-full blur-3xl animate-float" style={{animationDelay: '5s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-emerald-500/8 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 mt-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              We Build
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                Digital Solutions
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Transforming ideas into powerful software solutions. We specialize in web development, 
            mobile apps, and digital innovation that drives business growth.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center group">
              <div className="text-4xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">20+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Projects Completed</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">2+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">100%</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Client Satisfaction</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <button className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-black px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
              Start Your Project
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button className="group border-2 border-emerald-500/50 text-emerald-400 px-10 py-5 rounded-full font-bold text-xl hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300 flex items-center gap-3">
              <Play className="w-6 h-6" />
              Watch Demo
            </button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-center px-4"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-400 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Web Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Mobile Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Wordpress Development & Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>UI/UX Design</span>
              </div>
            </div>
          </motion.div>
        </div>


      </section>
    </main>
  );
}
