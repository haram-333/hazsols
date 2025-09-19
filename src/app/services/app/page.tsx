'use client';

import ServiceHero from '@/app/components/service-hero';
import ServiceOverview from '@/app/components/service-overview';
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
            </main>
        </>
    );
}
