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

export default function AppServicePage() {
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
