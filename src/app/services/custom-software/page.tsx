'use client';

import ServiceHero from '@/app/components/service-hero';
import ServiceOverview from '@/app/components/service-overview';
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
            </main>
        </>
    );
}
