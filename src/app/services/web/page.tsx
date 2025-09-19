'use client';

import ServiceHero from '@/app/components/service-hero';
import ServiceOverview from '@/app/components/service-overview';
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
            </main>
        </>
    );
}
