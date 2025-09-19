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

export default function WebServicePage() {
    return (
        <>
            <Header />
            <main>
                <ServiceHero 
                    serviceType="web"
                    category="WEB DEVELOPMENT"
                    title="Building Seamless Experiences"
                    buttonText="Build High-Performance Website"
                />
            <ServiceOverview serviceType="web" />
            <ServiceTechnologies serviceType="web" />
            <WhyChooseUs serviceType="web" />
            <DevelopmentProcess serviceType="web" />
            <TechStack serviceType="web" />
            <InsightsSection />
            <ContactForm />
            <Footer />
            </main>
        </>
    );
}
