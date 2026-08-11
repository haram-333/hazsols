"use client";

import ServiceCards from './service-cards';

export default function Expertise() {
    return (
        <section className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-b border-white/5">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(200,240,74,0.06) 0%, transparent 50%)', transform: 'translateZ(0)', willChange: 'transform' }}></div>

            <div className="max-w-[90rem] mx-auto px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
                    <div className="flex flex-col gap-4 max-w-2xl relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#c8f04a]"></div>
                            <span className="text-[#c8f04a] font-inter text-sm md:text-base font-semibold tracking-widest uppercase">
                                Our Expertise
                            </span>
                        </div>
                        <h2 className="font-outfit font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9] text-white">
                            Transform Your<br />
                            <span className="text-white/40">Business.</span>
                        </h2>
                    </div>
                    
                    <p className="font-inter text-sm md:text-base text-gray-400 max-w-sm font-medium leading-relaxed pb-2 relative z-10">
                        We leverage cutting-edge technologies to build scalable, high-performance digital solutions that drive real results.
                    </p>
                </div>

                {/* Bento Grid Component */}
                <ServiceCards />
            </div>
        </section>
    );
}
