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

export default function CustomSoftwareServicePage() {
    return (
        <>
            <Header />
            <main>
                <ServiceHero 
                    serviceType="custom-software"
                    category="CUSTOM SOFTWARE"
                    title="Tailored Solutions for Your Business"
                    buttonText="Build Custom Software"
                />
            <ServiceOverview serviceType="custom-software" />
            <ServiceTechnologies serviceType="custom-software" />
            <WhyChooseUs serviceType="custom-software" />
            <DevelopmentProcess serviceType="custom-software" />
            <TechStack serviceType="custom-software" />
            <InsightsSection />
            <ContactForm />
            <Footer />
            </main>
        </>
    );
}
