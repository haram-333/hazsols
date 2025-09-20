"use client";
import Image from 'next/image';
import { useState } from 'react';

interface ServiceTechnologiesProps {
  serviceType: 'web' | 'app' | 'ai' | 'custom-software';
}

const serviceConfig = {
  web: {
    title: "Seamless & Enterprise Ready",
    technologies: [
      {
        name: "React",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center",
        description: "Building dynamic user interfaces with React's component-based architecture for scalable web applications."
      },
      {
        name: "Next.js",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center",
        description: "Server-side rendering and static site generation for optimal performance and SEO optimization."
      },
      {
        name: "WordPress",
        imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop&crop=center",
        description: "Content management system solutions for easy content updates and website maintenance."
      },
      {
        name: "Shopify",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center",
        description: "E-commerce platform development for online stores with integrated payment and inventory management."
      },
      {
        name: "Vue.js",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center",
        description: "Progressive JavaScript framework for building interactive and maintainable user interfaces."
      },
      {
        name: "Angular",
        imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&crop=center",
        description: "Full-featured framework for enterprise-grade applications with TypeScript support."
      },
      {
        name: "Svelte",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&crop=center",
        description: "Compile-time optimized framework for building fast and lightweight web applications."
      }
    ]
  },
  app: {
    title: "Mobile-First & Scalable",
    technologies: [
      {
        name: "Flutter",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&crop=center",
        description: "Cross-platform mobile development with Flutter for iOS and Android using a single codebase."
      },
      {
        name: "React Native",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center",
        description: "Native mobile app development using React Native for shared code between platforms."
      },
      {
        name: "Native Android",
        imageUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=300&fit=crop&crop=center",
        description: "Native Android development using Java and Kotlin for optimal performance and platform integration."
      }
    ]
  },
  ai: {
    title: "Intelligent & Future-Ready",
    technologies: [
      {
        name: "Agentic AI",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
        description: "Autonomous AI agents that can reason, plan, and execute complex tasks independently."
      },
      {
        name: "Manual to AI Solutions",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&crop=center",
        description: "Transforming manual processes into intelligent, automated AI-powered workflows."
      },
      {
        name: "Custom AI Integration",
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop&crop=center",
        description: "Seamless integration of custom AI capabilities into your existing systems and workflows."
      },
      {
        name: "NLP",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&crop=center",
        description: "Natural Language Processing solutions for text analysis, sentiment analysis, and chatbots."
      },
      {
        name: "Google Cloud AI",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
        description: "Leveraging Google Cloud AI services for scalable machine learning and data analytics."
      },
      {
        name: "Machine Learning",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
        description: "Custom machine learning models and algorithms for predictive analytics and data insights."
      },
      {
        name: "Business AI Solutions",
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop&crop=center",
        description: "Tailored AI solutions designed to solve specific business challenges and drive growth."
      }
    ]
  },
  'custom-software': {
    title: "Tailored & Robust",
    technologies: [
      {
        name: "Windows Applications",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
        description: "Native Windows desktop applications built for optimal performance and user experience."
      },
      {
        name: "Desktop Applications",
        imageUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop&crop=center",
        description: "Cross-platform desktop applications that work seamlessly across different operating systems."
      },
      {
        name: "Enterprise Software",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
        description: "Custom enterprise solutions designed to meet specific business requirements and workflows."
      },
      {
        name: "CRM Systems",
        imageUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop&crop=center",
        description: "Customer relationship management systems for streamlined sales and customer service processes."
      },
      {
        name: "ERP Solutions",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
        description: "Enterprise resource planning systems for integrated business process management."
      },
      {
        name: "System Integration",
        imageUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop&crop=center",
        description: "Connecting disparate systems and applications for unified data flow and operations."
      },
      {
        name: "Process Automation",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
        description: "Automating repetitive tasks and workflows to improve efficiency and reduce manual errors."
      }
    ]
  }
};

export default function ServiceTechnologies({ serviceType }: ServiceTechnologiesProps) {
  const config = serviceConfig[serviceType];
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (!config) {
    return null;
  }

  return (
    <section id="technologies" className="service-technologies">
      <div className="technologies-container">
        {/* Background blurry circle */}
        <div className="technologies-bg-circle"></div>
        
        {/* Content */}
        <div className="technologies-content">
          <h2 className="technologies-title">{config.title}</h2>
          
          <div className="technologies-grid">
            {config.technologies.map((tech, index) => (
              <div 
                key={index}
                className="technology-card"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-image-container">
                  <Image
                    src={tech.imageUrl}
                    alt={tech.name}
                    width={400}
                    height={300}
                    className={`card-image ${hoveredCard === index ? 'blurred' : ''}`}
                  />
                </div>
                
                <div className="card-content">
                  <h3 className={`card-title ${hoveredCard === index ? 'hidden' : ''}`}>{tech.name}</h3>
                  
                  <div className={`card-description ${hoveredCard === index ? 'visible' : ''}`}>
                    <p>{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
