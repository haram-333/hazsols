"use client";
import Image from 'next/image';

interface ServiceOverviewProps {
    serviceType: 'web' | 'app' | 'ai' | 'custom-software';
}

const serviceConfig = {
    web: {
        title: "OVERVIEW",
        description: "Our web development services provide enterprise-grade and customized web development services tailored to meet the evolving demands of modern businesses. Whether you need a simple landing page or a complex web application, we have the expertise to deliver results that exceed expectations.",
        strengths: [
            {
                title: "Cutting-Edge Technologies",
                description: "React.js, Angular, Vue.js, Node.js, Laravel, Ruby on Rails, and Python for future-ready web solutions."
            },
            {
                title: "Responsive Design",
                description: "Adaptation to all screen sizes, providing a seamless user experience across devices."
            },
            {
                title: "Performance Optimization",
                description: "Speed and performance, leveraging CDNs, lazy loading, and caching strategies to enhance load times."
            },
            {
                title: "Web Security",
                description: "Protection with SSL encryption, firewalls, and regular security audits."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center"
    },
    app: {
        title: "OVERVIEW",
        description: "Our mobile app development services create powerful, user-friendly applications that drive engagement and deliver exceptional user experiences. From native iOS and Android apps to cross-platform solutions, we build mobile applications that stand out in the competitive app marketplace.",
        strengths: [
            {
                title: "Cross-Platform Development",
                description: "React Native, Flutter, and Xamarin for efficient development across iOS and Android platforms."
            },
            {
                title: "Native Performance",
                description: "Optimized native apps with smooth animations and lightning-fast performance."
            },
            {
                title: "User Experience Design",
                description: "Intuitive interfaces and seamless navigation designed for mobile-first experiences."
            },
            {
                title: "App Store Optimization",
                description: "Strategic deployment and optimization for maximum visibility and downloads."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center"
    },
    ai: {
        title: "OVERVIEW",
        description: "Our AI development services harness the power of artificial intelligence to transform your business operations and unlock new possibilities. From machine learning models to intelligent automation, we create AI solutions that drive innovation and deliver measurable results.",
        strengths: [
            {
                title: "Machine Learning Solutions",
                description: "Custom ML models, neural networks, and deep learning algorithms for predictive analytics."
            },
            {
                title: "Natural Language Processing",
                description: "Chatbots, sentiment analysis, and language understanding for enhanced user interactions."
            },
            {
                title: "Computer Vision",
                description: "Image recognition, object detection, and visual analysis for automated decision-making."
            },
            {
                title: "AI Integration",
                description: "Seamless integration of AI capabilities into existing systems and workflows."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center"
    },
    'custom-software': {
        title: "OVERVIEW",
        description: "Our custom software development services create tailored solutions that address your unique business challenges and streamline operations. From enterprise applications to specialized tools, we build software that grows with your business and adapts to your evolving needs.",
        strengths: [
            {
                title: "Enterprise Solutions",
                description: "Scalable software architecture designed for large-scale business operations and growth."
            },
            {
                title: "Custom Integration",
                description: "Seamless integration with existing systems, APIs, and third-party services."
            },
            {
                title: "Process Automation",
                description: "Workflow automation and business process optimization for increased efficiency."
            },
            {
                title: "Ongoing Support",
                description: "Comprehensive maintenance, updates, and technical support for long-term success."
            }
        ],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center"
    }
};

export default function ServiceOverview({ serviceType }: ServiceOverviewProps) {
    const config = serviceConfig[serviceType];

    return (
        <section className="service-overview">
            <div className="overview-container">
                {/* Left Content */}
                <div className="overview-content">
                    <div className="overview-text">
                        <h2 className="overview-title">{config.title}</h2>
                        <p className="overview-description">{config.description}</p>
                        
                        <h3 className="strengths-title">What we are good at:</h3>
                        <ul className="strengths-list">
                            {config.strengths.map((strength, index) => (
                                <li key={index} className="strength-item">
                                    <strong className="strength-title">{strength.title}:</strong>
                                    <span className="strength-description"> {strength.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Image */}
                <div className="overview-image">
                    <Image
                        src={config.imageUrl}
                        alt={`${serviceType} development overview`}
                        width={800}
                        height={600}
                        className="overview-img"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
