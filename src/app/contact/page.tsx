'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import ContactForm from '@/app/components/contact-form';
import Footer from '@/app/components/footer';

export default function ContactPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set theme immediately to prevent flicker
        try {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
        } catch (error) {
            console.warn('Theme setting failed:', error);
            document.documentElement.setAttribute('data-theme', 'light');
        }
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="contact-page">
                <div className="contact-header">
                    <h1 className="contact-title">Get In Touch</h1>
                    <p className="contact-subtitle">Ready to start your next project? Let's discuss how we can help you achieve your goals.</p>
                </div>
                
                <div className="contact-content">
                    <div className="contact-main-card">
                        <div className="contact-left">
                            <h2 className="info-title">Let's Talk Business</h2>
                            <p className="info-description">
                                We're here to help you bring your ideas to life. Whether you need a website, mobile app, 
                                AI solution, or custom software, our team is ready to deliver exceptional results.
                            </p>
                            
                            <div className="contact-email-section">
                                <div className="email-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                                <div className="email-text">
                                    <h3>Email Us</h3>
                                    <p>hello@hazsols.com</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="contact-right">
                            <h3 className="services-title">Our Services</h3>
                            <div className="services-grid">
                                <div className="service-card">
                                    <div className="service-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                            <line x1="8" y1="21" x2="16" y2="21"/>
                                            <line x1="12" y1="17" x2="12" y2="21"/>
                                        </svg>
                                    </div>
                                    <span>Web Development</span>
                                </div>
                                <div className="service-card">
                                    <div className="service-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                            <line x1="8" y1="21" x2="16" y2="21"/>
                                            <line x1="12" y1="17" x2="12" y2="21"/>
                                        </svg>
                                    </div>
                                    <span>Mobile App Development</span>
                                </div>
                                <div className="service-card">
                                    <div className="service-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3"/>
                                            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                                        </svg>
                                    </div>
                                    <span>AI & Machine Learning</span>
                                </div>
                                <div className="service-card">
                                    <div className="service-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                            <line x1="8" y1="21" x2="16" y2="21"/>
                                            <line x1="12" y1="17" x2="12" y2="21"/>
                                        </svg>
                                    </div>
                                    <span>Custom Software Development</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ContactForm />
            <Footer />
        </>
    );
}