'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function PrivacyPage() {
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
                <main className="privacy-page">
                    <div className="privacy-container">
                        <div className="privacy-header">
                            <h1 className="privacy-title">Privacy Policy</h1>
                            <p className="privacy-subtitle">Last updated: Loading...</p>
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
            <main className="privacy-page">
                <div className="privacy-container">
                    <div className="privacy-header">
                        <h1 className="privacy-title">Privacy Policy</h1>
                        <p className="privacy-subtitle">Last updated: {currentDate}</p>
                    </div>
                    
                    <div className="privacy-content">
                        <section className="privacy-section">
                            <h2 className="section-title">1. Information We Collect</h2>
                            <p className="section-text">
                                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                            </p>
                            <h3 className="subsection-title">Personal Information</h3>
                            <ul className="privacy-list">
                                <li>Name and contact information (email address, phone number)</li>
                                <li>Company information and job title</li>
                                <li>Project requirements and specifications</li>
                                <li>Payment information (processed securely through third-party providers)</li>
                            </ul>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">2. How We Use Your Information</h2>
                            <p className="section-text">
                                We use the information we collect to:
                            </p>
                            <ul className="privacy-list">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process transactions and send related information</li>
                                <li>Send technical notices, updates, and support messages</li>
                                <li>Respond to your comments and questions</li>
                                <li>Develop new products and services</li>
                            </ul>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">3. Information Sharing and Disclosure</h2>
                            <p className="section-text">
                                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                            </p>
                            <ul className="privacy-list">
                                <li>With your explicit consent</li>
                                <li>To comply with legal obligations</li>
                                <li>To protect our rights and prevent fraud</li>
                                <li>With service providers who assist us in operating our business</li>
                            </ul>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">4. Data Security</h2>
                            <p className="section-text">
                                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                            </p>
                            <ul className="privacy-list">
                                <li>SSL encryption for data transmission</li>
                                <li>Secure servers and databases</li>
                                <li>Regular security audits and updates</li>
                                <li>Limited access to personal information on a need-to-know basis</li>
                            </ul>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">5. Cookies and Tracking Technologies</h2>
                            <p className="section-text">
                                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">6. Third-Party Services</h2>
                            <p className="section-text">
                                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">7. Data Retention</h2>
                            <p className="section-text">
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">8. Your Rights</h2>
                            <p className="section-text">
                                You have the right to:
                            </p>
                            <ul className="privacy-list">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate or incomplete information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Object to processing of your personal information</li>
                                <li>Data portability</li>
                            </ul>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">9. Children&apos;s Privacy</h2>
                            <p className="section-text">
                                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">10. Changes to This Privacy Policy</h2>
                            <p className="section-text">
                                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2 className="section-title">11. Contact Us</h2>
                            <p className="section-text">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <div className="contact-info">
                                <p>Email: privacy@hazsols.com</p>
                                <p>Phone: +1 (555) 123-4567</p>
                                <p>Address: 123 Tech Street, Innovation City, IC 12345</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
