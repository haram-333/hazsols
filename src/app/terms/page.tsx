'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function TermsPage() {
    const [mounted, setMounted] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Set theme immediately to prevent flicker
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Set date after mount to prevent hydration mismatch
        setCurrentDate(new Date().toLocaleDateString());
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                <Header />
                <main className="terms-page">
                    <div className="terms-container">
                        <div className="terms-header">
                            <h1 className="terms-title">Terms and Conditions</h1>
                            <p className="terms-subtitle">Last updated: Loading...</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="terms-page">
                <div className="terms-container">
                    <div className="terms-header">
                        <h1 className="terms-title">Terms and Conditions</h1>
                        <p className="terms-subtitle">Last updated: {currentDate}</p>
                    </div>
                    
                    <div className="terms-content">
                        <section className="terms-section">
                            <h2 className="section-title">1. Acceptance of Terms</h2>
                            <p className="section-text">
                                By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </section>

                        <section className="terms-section">
                            <h2 className="section-title">2. Use License</h2>
                            <p className="section-text">
                                Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="terms-list">
                                <li>modify or copy the materials</li>
                                <li>use the materials for any commercial purpose or for any public display</li>
                                <li>attempt to reverse engineer any software contained on the website</li>
                                <li>remove any copyright or other proprietary notations from the materials</li>
                            </ul>
                        </section>

                        <section className="terms-section">
                            <h2 className="section-title">3. Service Description</h2>
                            <p className="section-text">
                                We provide the following services:
                            </p>
                            <ul className="terms-list">
                                <li><strong>Web Development:</strong> Custom website and web application development</li>
                                <li><strong>Mobile App Development:</strong> iOS and Android mobile application development</li>
                                <li><strong>AI & Machine Learning:</strong> Artificial intelligence solutions and machine learning implementations</li>
                                <li><strong>Custom Software Development:</strong> Tailored software solutions for specific business needs</li>
                            </ul>
                        </section>

                        <section className="terms-section">
                            <h2 className="section-title">4. Payment Terms</h2>
                            <p className="section-text">
                                Payment terms will be specified in individual project agreements. Generally, we require:
                            </p>
                            <ul className="terms-list">
                                <li>50% payment upfront for project initiation</li>
                                <li>Remaining 50% upon project completion and delivery</li>
                                <li>Payment methods accepted: Bank transfer, PayPal, Stripe</li>
                            </ul>
                        </section>

                        <section className="terms-section">
                            <h2 className="section-title">5. Intellectual Property</h2>
                            <p className="section-text">
                                All intellectual property rights in the work product created by us shall remain with the client upon full payment. We retain the right to use general knowledge, skills, and techniques gained during the project for future work.
                            </p>
                        </section>

                        <section className="terms-section">
                            <h2 className="section-title">6. Limitation of Liability</h2>
                            <p className="section-text">
                                In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                            </p>
                        </section>

                        <section className="terms-section">
                            <h2 className="section-title">7. Termination</h2>
                            <p className="section-text">
                                We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>
                        </section>

                        <section className="terms-section">
                            <h2 className="section-title">8. Changes to Terms</h2>
                            <p className="section-text">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                            </p>
                        </section>

                        <section className="terms-section">
                            <h2 className="section-title">9. Contact Information</h2>
                            <p className="section-text">
                                If you have any questions about these Terms and Conditions, please contact us at:
                            </p>
                            <div className="contact-info">
                                <p>Email: info@hazsols.com</p>
                                <p>Phone: +1 (555) 123-4567</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
