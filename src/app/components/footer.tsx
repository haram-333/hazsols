'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative w-full h-[85vh] min-h-[700px] bg-[#020202] border-t border-white/5 overflow-hidden">
      
      {/* 3D Background Layer Removed */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-black to-black">
      </div>

      {/* DOM Content Layer */}
      <div className="relative w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 pt-16 pb-8 flex flex-col justify-between pointer-events-none">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pointer-events-auto">
          {/* Logo & About */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center">
              <Image src="/logo.png" alt="HazSols Logo" width={48} height={48} className="opacity-90 grayscale hover:grayscale-0 transition-all duration-500" />
              <span className="font-outfit text-xl font-bold text-white ml-3 tracking-wider">HAZSOLS.</span>
            </div>
            <p className="font-inter text-white/40 text-sm leading-relaxed max-w-xs">
              We take pride in our extensive experience with leading industry technologies to build hyper-scalable enterprise solutions.
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-4 flex flex-col gap-6"></div>

          {/* Links Grid */}
          <div className="md:col-span-6 lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-inter text-[10px] text-white/30 uppercase tracking-[0.2em]">Explore</h3>
              <ul className="flex flex-col gap-3">
                <li><a href="/services/web" className="font-inter text-white/70 hover:text-[#c8f04a] text-sm transition-colors">Web Development</a></li>
                <li><a href="/services/app" className="font-inter text-white/70 hover:text-[#c8f04a] text-sm transition-colors">Mobile Engineering</a></li>
                <li><a href="/services/ai" className="font-inter text-white/70 hover:text-[#c8f04a] text-sm transition-colors">AI & Machine Learning</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-inter text-[10px] text-white/30 uppercase tracking-[0.2em]">Direct</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a 
                    href="mailto:hazsolssolution@gmail.com?subject=Inquiry from Website" 
                    className="font-inter text-white/70 hover:text-[#c8f04a] text-sm transition-colors break-all"
                    onClick={(e) => {
                      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                      if (isMobile) {
                        e.preventDefault();
                        window.location.href = 'mailto:hazsolssolution@gmail.com?subject=Inquiry from Website';
                        setTimeout(() => {
                          window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hazsolssolution@gmail.com&su=Inquiry from Website', '_blank');
                        }, 2000);
                      } else {
                        e.preventDefault();
                        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hazsolssolution@gmail.com&su=Inquiry from Website', '_blank');
                      }
                    }}
                  >
                    hazsolssolution@gmail.com
                  </a>
                </li>
                <li><a href="tel:+923094471969" className="font-inter text-white/70 hover:text-[#c8f04a] text-sm transition-colors">+92 309 447 1969</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Massive Typography */}
        <div className="flex-1 flex items-center justify-center pointer-events-none mt-12 mb-12">
          <style>{`
            @keyframes animate-gradient-stroke {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }
            .gradient-stroke-text {
              background: linear-gradient(90deg, #c8f04a, rgba(255, 255, 255, 0.4), #c8f04a);
              background-size: 200% auto;
              -webkit-text-fill-color: #020202;
              -webkit-text-stroke: 1.5px transparent;
              -webkit-background-clip: text;
              animation: animate-gradient-stroke 4s linear infinite;
            }
            @media (min-width: 768px) {
              .gradient-stroke-text {
                -webkit-text-stroke: 3px transparent;
              }
            }
          `}</style>
          <h1 className="font-outfit font-black text-center leading-[0.85] tracking-tighter text-[13.5vw] sm:text-[11vw] md:text-[7.5vw] w-full uppercase drop-shadow-2xl gradient-stroke-text px-2 md:px-0">
            CREATIVE AND<br className="hidden md:block"/><span className="md:hidden"> </span>RELIABLE SOFTWARE<br className="hidden md:block"/><span className="md:hidden"> </span>ENGINEERING STUDIO
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 pointer-events-auto border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full md:w-auto">
            <p className="font-inter text-[10px] text-white/30 tracking-widest uppercase">
              &copy; {new Date().getFullYear()} HazSols. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/terms" className="font-inter text-[10px] text-white/30 uppercase tracking-widest hover:text-white transition-colors">Terms</a>
              <a href="/privacy" className="font-inter text-[10px] text-white/30 uppercase tracking-widest hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/profile.php?id=61574012697327&sk=about" target="_blank" className="text-white/30 hover:text-[#c8f04a] transition-all duration-300 hover:scale-110 w-5 h-5" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/hazsols-solutions/" target="_blank" className="text-white/30 hover:text-[#c8f04a] transition-all duration-300 hover:scale-110 w-5 h-5" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/hazsols/" target="_blank" className="text-white/30 hover:text-[#c8f04a] transition-all duration-300 hover:scale-110 w-5 h-5" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
