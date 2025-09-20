"use client";
import Image from 'next/image';

interface ServiceHeroProps {
    serviceType: 'web' | 'app' | 'ai' | 'custom-software';
    category: string;
    title: string;
    buttonText: string;
}

const serviceConfig = {
    web: {
        backgroundImage: '/images/web-development-cover.jpg',
        category: 'WEB DEVELOPMENT',
        title: 'Building Seamless Experiences',
        buttonText: 'Build High-Performance Website'
    },
    app: {
        backgroundImage: '/images/mobile-development-cover.jpg',
        category: 'MOBILE APP DEVELOPMENT',
        title: 'Creating Mobile Excellence',
        buttonText: 'Build Your Mobile App'
    },
    ai: {
        backgroundImage: '/images/ai-development-cover.jpg',
        category: 'AI DEVELOPMENT',
        title: 'Intelligent Solutions for Tomorrow',
        buttonText: 'Build AI-Powered Solutions'
    },
    'custom-software': {
        backgroundImage: '/images/custom-software-development-cover.jpg',
        category: 'CUSTOM SOFTWARE',
        title: 'Tailored Solutions for Your Business',
        buttonText: 'Build Custom Software'
    }
};

export default function ServiceHero({ 
    serviceType, 
    category, 
    title, 
    buttonText 
}: ServiceHeroProps) {
    const config = serviceConfig[serviceType];
    
    return (  
        <section className="service-hero">
            {/* Background Image */}
            <div className="hero-background">
                <Image 
                    src={config.backgroundImage}
                    alt={`${config.category} Background`}
                    fill
                    className="background-image"
                    priority
                />
            </div>
            
            {/* Liquid Glass Effect Container */}
            <div className="glass-container">
                {/* Manual blur layer behind glass card */}
                <div className="glass-blur-layer">
                    <Image 
                        src={config.backgroundImage}
                        alt={`${config.category} Background Blurred`}
                        fill
                        className="glass-blur-image"
                        priority
                    />
                </div>
                
                <div className="glass-card">
                    <div className="glass-content">
                        <div className="service-category">{category || config.category}</div>
                        <h1 className="service-title">{title || config.title}</h1>
                        <a href="/contact" className="cta-button">
                            {buttonText || config.buttonText}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
