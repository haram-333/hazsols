'use client';

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

export default function AIServicePage() {
    return (
        <>
            <Header />
            <main>
                <ServiceHero 
                    serviceType="ai"
                    category="AI DEVELOPMENT"
                    title="Intelligent Solutions for Tomorrow"
                    buttonText="Build AI-Powered Solutions"
                />
            <ServiceOverview serviceType="ai" />
            <ServiceTechnologies serviceType="ai" />
            <WhyChooseUs serviceType="ai" />
            <DevelopmentProcess serviceType="ai" />
            <TechStack serviceType="ai" />
            <InsightsSection />
            <ContactForm />
            <Footer />
            </main>
        </>
    );
}
