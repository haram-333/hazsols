"use client";
import React from 'react';

interface DevelopmentProcessProps {
  serviceType: 'web' | 'app' | 'ai' | 'custom-software';
}

const processConfig = {
  web: {
    title: "Our Web Development Process",
    steps: [
      {
        number: 1,
        title: "Discovery & Planning",
        description: "We begin by understanding your business, goals, and target audience. Through collaborative discussions, we define project requirements, timelines, and resources to create a roadmap for success."
      },
      {
        number: 2,
        title: "Design & Prototyping",
        description: "Our design team creates wireframes and prototypes that reflect the user journey and interface flow. We focus on ensuring intuitive navigation and visually appealing design to engage users from the first interaction."
      },
      {
        number: 3,
        title: "Development & Coding",
        description: "Once designs are approved, we start building the website using the latest technologies and frameworks like React, Node.js, and Laravel. We ensure the website is responsive, secure, and high-performance."
      },
      {
        number: 4,
        title: "Testing & Quality Assurance",
        description: "Our team rigorously tests the website across different devices, browsers, and scenarios to ensure optimal performance, security, and user experience. We identify and fix any issues before launch."
      },
      {
        number: 5,
        title: "Launch & Deployment",
        description: "After final approvals, we deploy the website to the live environment. Our team ensures smooth migration and scaling for minimal downtime and a successful launch."
      },
      {
        number: 6,
        title: "Post-Launch Support & Maintenance",
        description: "After launch, we offer ongoing maintenance and support services to keep your website updated, secure, and running efficiently. We regularly monitor performance and provide enhancements as needed."
      }
    ]
  },
  app: {
    title: "Our Mobile App Development Process",
    steps: [
      {
        number: 1,
        title: "Discovery & Planning",
        description: "We begin by understanding your business goals, target audience, and app requirements. Through collaborative discussions, we define features, platforms, and technical specifications for your mobile application."
      },
      {
        number: 2,
        title: "Design & Prototyping",
        description: "Our design team creates wireframes and interactive prototypes for iOS and Android. We focus on intuitive user experience, platform-specific design guidelines, and engaging visual interfaces."
      },
      {
        number: 3,
        title: "Development & Coding",
        description: "We build your mobile app using Flutter, React Native, or native technologies. Our development ensures cross-platform compatibility, optimal performance, and seamless user experience."
      },
      {
        number: 4,
        title: "Testing & Quality Assurance",
        description: "We rigorously test your app across different devices, screen sizes, and operating systems. Our QA process ensures bug-free performance, security, and compliance with app store guidelines."
      },
      {
        number: 5,
        title: "Launch & Deployment",
        description: "We deploy your app to Google Play Store and Apple App Store. Our team handles the submission process, ensures compliance, and manages the launch strategy for maximum visibility."
      },
      {
        number: 6,
        title: "Post-Launch Support & Maintenance",
        description: "We provide ongoing maintenance, updates, and support for your mobile app. Our team monitors performance, implements new features, and ensures your app stays current with platform updates."
      }
    ]
  },
  ai: {
    title: "Our AI Development Process",
    steps: [
      {
        number: 1,
        title: "Discovery & Planning",
        description: "We analyze your business challenges and identify AI opportunities. Through collaborative discussions, we define AI goals, data requirements, and success metrics for your intelligent solutions."
      },
      {
        number: 2,
        title: "Design & Prototyping",
        description: "Our AI team designs the architecture and creates prototypes for your AI solution. We focus on user experience, data flow, and interface design to ensure seamless AI integration."
      },
      {
        number: 3,
        title: "Development & Coding",
        description: "We build your AI solution using machine learning, NLP, and computer vision technologies. Our development ensures scalable, secure, and high-performance AI applications."
      },
      {
        number: 4,
        title: "Testing & Quality Assurance",
        description: "We rigorously test your AI solution for accuracy, performance, and reliability. Our QA process ensures the AI models work correctly and provide accurate results across different scenarios."
      },
      {
        number: 5,
        title: "Launch & Deployment",
        description: "We deploy your AI solution to production with proper monitoring and scaling. Our team ensures smooth integration with existing systems and provides comprehensive documentation."
      },
      {
        number: 6,
        title: "Post-Launch Support & Maintenance",
        description: "We provide ongoing AI model training, performance monitoring, and continuous improvement. Our team ensures your AI solution evolves and maintains accuracy over time."
      }
    ]
  },
  'custom-software': {
    title: "Our Custom Software Development Process",
    steps: [
      {
        number: 1,
        title: "Discovery & Planning",
        description: "We analyze your business processes and identify software requirements. Through collaborative discussions, we define features, integrations, and technical specifications for your custom solution."
      },
      {
        number: 2,
        title: "Design & Prototyping",
        description: "Our team creates system architecture and user interface prototypes. We focus on workflow optimization, user experience, and seamless integration with your existing systems."
      },
      {
        number: 3,
        title: "Development & Coding",
        description: "We build your custom software using modern technologies and best practices. Our development ensures scalability, security, and performance tailored to your specific business needs."
      },
      {
        number: 4,
        title: "Testing & Quality Assurance",
        description: "We thoroughly test your custom software for functionality, security, and performance. Our QA process ensures bug-free operation and compliance with your business requirements."
      },
      {
        number: 5,
        title: "Launch & Deployment",
        description: "We deploy your custom software with proper configuration and user training. Our team ensures smooth integration and provides comprehensive documentation for ongoing use."
      },
      {
        number: 6,
        title: "Post-Launch Support & Maintenance",
        description: "We provide ongoing maintenance, updates, and technical support for your custom software. Our team ensures your solution remains current and continues to meet your evolving needs."
      }
    ]
  }
};

export default function DevelopmentProcess({ serviceType }: DevelopmentProcessProps) {
  const config = processConfig[serviceType];

  if (!config) {
    return null;
  }

  return (
    <section className="development-process">
      <div className="process-container">
        <h2 className="process-title">{config.title}</h2>
        
        <div className="process-steps">
          {config.steps.map((step, index) => (
            <div key={step.number} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
