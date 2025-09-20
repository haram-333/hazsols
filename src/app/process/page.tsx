'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import ContactForm from '@/app/components/contact-form';
import Footer from '@/app/components/footer';

export default function HowWeDoItPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set theme immediately to prevent flicker
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                <Header />
                <main className="how-we-do-it-page">
                    <div className="how-we-do-it-container">
                        <div className="how-we-do-it-header">
                            <h1 className="how-we-do-it-title">How We Do It</h1>
                            <p className="how-we-do-it-subtitle">Loading...</p>
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
            <main className="how-we-do-it-page">
                <div className="how-we-do-it-container">
                    <div className="how-we-do-it-header">
                        <h1 className="how-we-do-it-title">How We Do It</h1>
                        <p className="how-we-do-it-subtitle">Our proven methodology for delivering exceptional results</p>
                    </div>
                    
                    <div className="how-we-do-it-content">
                        <section className="process-section">
                            <h2 className="section-title">Our Development Process</h2>
                            <div className="process-steps">
                                <div className="process-step">
                                    <div className="step-number">01</div>
                                    <div className="step-content">
                                        <h3 className="step-title">Discovery & Planning</h3>
                                        <p className="step-description">
                                            We start by understanding your business goals, target audience, and technical requirements. 
                                            Our team conducts thorough research and creates a detailed project roadmap.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-number">02</div>
                                    <div className="step-content">
                                        <h3 className="step-title">Design & Prototyping</h3>
                                        <p className="step-description">
                                            Our designers create wireframes and prototypes that bring your vision to life. 
                                            We focus on user experience and ensure the design aligns with your brand identity.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-number">03</div>
                                    <div className="step-content">
                                        <h3 className="step-title">Development & Testing</h3>
                                        <p className="step-description">
                                            Our developers build your solution using cutting-edge technologies. 
                                            We follow agile methodologies and conduct rigorous testing throughout the development process.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-number">04</div>
                                    <div className="step-content">
                                        <h3 className="step-title">Deployment & Launch</h3>
                                        <p className="step-description">
                                            We handle the deployment process and ensure a smooth launch. 
                                            Our team provides comprehensive training and ongoing support to ensure your success.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="methodology-section">
                            <h2 className="section-title">Our Methodology</h2>
                            <div className="methodology-grid">
                                <div className="methodology-card">
                                    <div className="methodology-icon">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m0-7v7m0-7h10a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2H9m0-7V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
                                        </svg>
                                    </div>
                                    <h3 className="methodology-title">Agile Development</h3>
                                    <p className="methodology-description">
                                        We follow agile methodologies to ensure flexibility, transparency, and continuous improvement throughout the project.
                                    </p>
                                </div>
                                
                                <div className="methodology-card">
                                    <div className="methodology-icon">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    </div>
                                    <h3 className="methodology-title">Quality Assurance</h3>
                                    <p className="methodology-description">
                                        Every line of code is thoroughly tested and reviewed to ensure the highest quality and performance standards.
                                    </p>
                                </div>
                                
                                <div className="methodology-card">
                                    <div className="methodology-icon">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                            <circle cx="9" cy="7" r="4"/>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                    </div>
                                    <h3 className="methodology-title">Collaborative Approach</h3>
                                    <p className="methodology-description">
                                        We work closely with your team, providing regular updates and incorporating your feedback at every stage.
                                    </p>
                                </div>
                                
                                <div className="methodology-card">
                                    <div className="methodology-icon">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                        </svg>
                                    </div>
                                    <h3 className="methodology-title">Fast Delivery</h3>
                                    <p className="methodology-description">
                                        We deliver results quickly without compromising quality, helping you get to market faster.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="tools-section">
                            <h2 className="section-title">Tools & Technologies</h2>
                            <div className="tools-grid">
                                <div className="tool-category">
                                    <h3 className="category-title">Development</h3>
                                    <div className="tool-list">
                                        <span className="tool-item">React</span>
                                        <span className="tool-item">Next.js</span>
                                        <span className="tool-item">TypeScript</span>
                                        <span className="tool-item">Node.js</span>
                                        <span className="tool-item">Python</span>
                                        <span className="tool-item">Django</span>
                                    </div>
                                </div>
                                
                                <div className="tool-category">
                                    <h3 className="category-title">Design</h3>
                                    <div className="tool-list">
                                        <span className="tool-item">Figma</span>
                                        <span className="tool-item">Adobe XD</span>
                                        <span className="tool-item">Sketch</span>
                                        <span className="tool-item">Photoshop</span>
                                        <span className="tool-item">Illustrator</span>
                                    </div>
                                </div>
                                
                                <div className="tool-category">
                                    <h3 className="category-title">DevOps</h3>
                                    <div className="tool-list">
                                        <span className="tool-item">Docker</span>
                                        <span className="tool-item">AWS</span>
                                        <span className="tool-item">GitHub</span>
                                        <span className="tool-item">CI/CD</span>
                                        <span className="tool-item">Monitoring</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <ContactForm />
            <Footer />
        </>
    );
}
