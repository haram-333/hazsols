'use client';

import { useEffect, useState } from 'react';
import ServiceHero from '@/app/components/service-hero';
import ServiceOverview from '@/app/components/service-overview';
import ServiceTechnologies from '@/app/components/service-technologies';
import WhyChooseUs from '@/app/components/why-choose-us';
import DevelopmentProcess from '@/app/components/development-process';
import TechStack from '@/app/components/tech-stack';
import InsightsSection from '@/app/components/insights-section';
import ContactForm from '@/app/components/contact-form';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';

export default function AppServicePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set theme immediately to prevent flicker
        try {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
        } catch (error) {
            console.warn('Theme setting failed:', error);
            document.documentElement.setAttribute('data-theme', 'light');
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        
        // Check if URL has #technologies anchor
        if (window.location.hash === '#technologies') {
            setTimeout(() => {
                const element = document.getElementById('technologies');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [mounted]);

    if (!mounted) {
        return (
            <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main>
                <ServiceHero 
                    serviceType="app"
                    category="MOBILE APP DEVELOPMENT"
                    title="Creating Mobile Excellence"
                    buttonText="Build Your Mobile App"
                />
            <ServiceOverview serviceType="app" />
            <ServiceTechnologies serviceType="app" />
            <WhyChooseUs serviceType="app" />
            <DevelopmentProcess serviceType="app" />
            <TechStack serviceType="app" />
            <InsightsSection />
            <ContactForm />
            <Footer />
            </main>
        </>
    );
}
