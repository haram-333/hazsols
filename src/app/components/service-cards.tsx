"use client";

import Image from "next/image";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  className: string;
}

const services: Service[] = [
  {
    id: 'generative-ai',
    title: 'Generative AI',
    description: 'Custom AI models and intelligent automation systems to revolutionize your workflows.',
    image: '/images/generative-ai.jpg',
    className: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 min-h-[300px] md:min-h-[400px]', // Big Hero Card
  },
  {
    id: 'mobile-app-dev',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile experiences that users love.',
    image: '/images/mobile-app-development.jpg',
    className: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1 min-h-[250px]', // Wide Card
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'High-performance websites and web applications.',
    image: '/images/web-development.jpg',
    className: 'col-span-1 row-span-1 min-h-[250px]', // Square Card
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Data-driven search engine optimization to dominate rankings.',
    image: '/images/seo.jpg',
    className: 'col-span-1 row-span-1 min-h-[250px]', // Square Card
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Scalable online stores engineered for high conversion rates.',
    image: '/images/ecommerce.jpg',
    className: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1 min-h-[250px]', // Wide Card
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    description: 'Custom themes and headless CMS architectures.',
    image: '/images/wordpress.jpg',
    className: 'col-span-1 row-span-1 min-h-[250px]', // Square Card
  },
  {
    id: 'shopify',
    title: 'Shopify',
    description: 'Premium Shopify setups and bespoke liquid development.',
    image: '/images/shopify.jpg',
    className: 'col-span-1 row-span-1 min-h-[250px]', // Square Card
  }
];

export default function ServiceCards() {
  return (
    <div className="w-full relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className={`group relative overflow-hidden rounded-3xl bg-[#0c0c0e] border border-white/5 flex flex-col justify-end p-6 md:p-8 cursor-pointer ${service.className}`}
            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            {/* The Animated Glowing Border */}
            <div className="magic-border" style={{ transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>

            {/* Background Image Setup */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden rounded-3xl">
                {/* Base Fallback Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#121215] to-[#0c0c0e]"></div>
                
                {/* Hover Gradient Overlay */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#1a1a24] to-[#121215] opacity-0 group-hover:opacity-100"
                    style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                ></div>
                
                {/* Image itself */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 grayscale group-hover:opacity-70 group-hover:grayscale-0 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
                
                {/* Dark Vignette to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 z-10"></div>
            </div>

            {/* Icon/Arrow Top Right */}
            <div 
                className="absolute top-6 right-6 md:top-8 md:right-8 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-[#c8f04a] group-hover:border-[#c8f04a] group-hover:text-black text-white group-hover:scale-110 group-hover:rotate-45"
                style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                    <line x1="5" y1="19" x2="19" y2="5"></line>
                    <polyline points="12 5 19 5 19 12"></polyline>
                </svg>
            </div>

            {/* Content Bottom Left */}
            <div className="relative z-20 flex flex-col justify-end h-full">
                <div 
                    className="flex flex-col transform translate-y-8 md:translate-y-10 group-hover:translate-y-0"
                    style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                    
                    {/* Index Number */}
                    <div 
                        className="opacity-0 group-hover:opacity-100"
                        style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                        <span className="text-[#c8f04a] text-xs font-inter font-bold tracking-widest uppercase mb-3 block">
                            0{index + 1} //
                        </span>
                    </div>

                    {/* Title */}
                    <h3 
                        className="font-outfit font-bold text-2xl md:text-3xl lg:text-4xl text-white group-hover:text-[#c8f04a]"
                        style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p 
                        className="font-inter text-sm md:text-base text-gray-400 mt-3 opacity-0 group-hover:opacity-100 max-w-sm"
                        style={{ transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                        {service.description}
                    </p>

                </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
