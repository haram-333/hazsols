'use client';

import ServiceHero from '@/app/components/service-hero';
import ServiceOverview from '@/app/components/service-overview';
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
            </main>
        </>
    );
}
