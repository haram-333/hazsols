"use client";
import Image from 'next/image';

const logosRow1 = [
  { name: 'Angular', src: '/images/Angular.png' },
  { name: 'Svelte', src: '/images/Svelte.png' },
  { name: 'Vue.js', src: '/images/Vue.js.png' },
  { name: 'TypeScript', src: '/images/TypeScript.png' },
  { name: 'Kotlin', src: '/images/Kotlin.png' },
  { name: 'Bootstrap', src: '/images/Bootstrap.png' },
  { name: 'Next.js', src: '/images/Next.js.png' },
  { name: 'React', src: '/images/React.png' },
];

const logosRow2 = [
  { name: 'Android', src: '/images/Android.png' },
  { name: 'Tailwind CSS', src: '/images/Tailwind CSS.png' },
  { name: 'WordPress', src: '/images/WordPress.png' },
  { name: 'Java', src: '/images/Java.png' },
  { name: 'Flutter', src: '/images/Flutter.png' },
  { name: 'JavaScript', src: '/images/JavaScript.png' },
  { name: 'Next.js', src: '/images/Next.js.png' },
  { name: 'React', src: '/images/React.png' },
];

export default function Marquee() {
  // Duplicate arrays to ensure width covers the screen and midpoint loops seamlessly
  const marqueeLogos1 = [...logosRow1, ...logosRow1, ...logosRow1, ...logosRow1];
  const marqueeLogos2 = [...logosRow2, ...logosRow2, ...logosRow2, ...logosRow2];

  return (
    <section className="relative w-full bg-white overflow-hidden flex flex-col min-h-[60vh] border-y border-black/5">
      {/* Top Section: Fixed Text */}
      <div className="w-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 pt-16 lg:pt-24 pb-8 z-20 relative bg-white items-center text-center">
        
        <h2 className="text-[#050505] font-black text-[15vw] sm:text-[10vw] md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.9]">
          Specialized<br />
          <span className="text-[#c8f04a]">In</span>
        </h2>
        <p className="mt-6 md:mt-8 text-gray-500 font-inter text-xs sm:text-sm md:text-base tracking-widest uppercase max-w-sm font-semibold text-center">
          Empowering your vision with a modern stack of cutting-edge technologies.
        </p>
      </div>

      {/* Bottom Section: Tilted Infinite Ribbons */}
      <div className="w-full relative flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[400px] pb-12 pt-8 z-10 bg-white">
        
        {/* Rotated Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 md:gap-10 -rotate-3 md:-rotate-6 scale-110 md:scale-125 origin-center">
            
            {/* Ribbon 1 (Moving Left) */}
            <div className="flex w-max bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] py-4 sm:py-6 md:py-8 overflow-hidden">
                {/* The animation moves it left by 50% of its total width to loop */}
                <div className="flex w-max animate-[marquee-left_40s_linear_infinite]">
                    {marqueeLogos1.map((logo, index) => (
                        <div key={index} className="flex items-center justify-center w-[100px] sm:w-[120px] lg:w-[160px] h-[50px] sm:h-[60px] lg:h-[80px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300 mx-3 md:mx-4 lg:mx-8">
                            <div className="relative w-full h-full">
                                <Image src={logo.src} alt={logo.name} fill className="object-contain drop-shadow-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ribbon 2 (Moving Right) */}
            <div className="flex w-max bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] py-4 sm:py-6 md:py-8 overflow-hidden">
                {/* The animation moves it right to loop */}
                <div className="flex w-max animate-[marquee-right_45s_linear_infinite]">
                    {marqueeLogos2.map((logo, index) => (
                        <div key={index} className="flex items-center justify-center w-[100px] sm:w-[120px] lg:w-[160px] h-[50px] sm:h-[60px] lg:h-[80px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300 mx-3 md:mx-4 lg:mx-8">
                            <div className="relative w-full h-full">
                                <Image src={logo.src} alt={logo.name} fill className="object-contain drop-shadow-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
