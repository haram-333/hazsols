"use client";

import ServiceCards from './service-cards';

export default function Expertise() {
    return (
        <div className="expertise">
            <div className="expertise-content">
                <div className="expertise-header">
                    <h1 className="expertise-heading">
                        Our Expertise
                    </h1>
                    <h2 className="expertise-sub-heading">
                        Transform Your Business
                    </h2>
                </div>
                <ServiceCards />
            </div>
        </div>
    );
}
