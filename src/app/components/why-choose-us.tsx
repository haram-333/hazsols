"use client";

interface WhyChooseUsProps {
  serviceType: 'web' | 'app' | 'ai' | 'custom-software';
}

const whyChooseUsData = {
  web: {
    title: "Why Choose Us for Web Development?",
    points: [
      {
        icon: "★",
        title: "End-to-End Expertise",
        description: "We provide comprehensive web development services covering strategy, design, development, and ongoing support. Our team ensures a seamless process and high-quality, scalable web solutions."
      },
      {
        icon: "◆",
        title: "Cutting-Edge Technologies",
        description: "We use the latest technologies like React, Angular, Node.js, and Laravel to deliver high-performance, future-ready websites. Our developers stay ahead of industry trends for optimal results."
      },
      {
        icon: "▲",
        title: "Scalability & Flexibility",
        description: "Our web solutions are designed to grow with your business, allowing for easy adjustments and scalability. We ensure long-term value by building flexible and adaptable websites."
      },
      {
        icon: "●",
        title: "User-Centered Design",
        description: "We focus on creating intuitive and visually appealing designs that enhance user engagement. Our responsive designs ensure a seamless experience across all devices and platforms."
      },
      {
        icon: "♦",
        title: "Security and Compliance",
        description: "We prioritize website security by implementing robust protocols and conducting regular audits. Your website will always comply with the latest security standards and regulations."
      }
    ]
  },
  app: {
    title: "Why Choose Us for Mobile App Development?",
    points: [
      {
        icon: "★",
        title: "End-to-End Expertise",
        description: "We provide comprehensive mobile app development services covering strategy, design, development, and ongoing support. Our team ensures a seamless process and high-quality, scalable mobile solutions."
      },
      {
        icon: "◆",
        title: "Cutting-Edge Technologies",
        description: "We use the latest technologies like Flutter, React Native, Swift, and Kotlin to deliver high-performance, future-ready mobile apps. Our developers stay ahead of industry trends for optimal results."
      },
      {
        icon: "▲",
        title: "Scalability & Flexibility",
        description: "Our mobile solutions are designed to grow with your business, allowing for easy adjustments and scalability. We ensure long-term value by building flexible and adaptable mobile applications."
      },
      {
        icon: "●",
        title: "User-Centered Design",
        description: "We focus on creating intuitive and visually appealing mobile interfaces that enhance user engagement. Our responsive designs ensure a seamless experience across all devices and platforms."
      },
      {
        icon: "♦",
        title: "Security and Compliance",
        description: "We prioritize mobile app security by implementing robust protocols and conducting regular audits. Your app will always comply with the latest security standards and regulations."
      }
    ]
  },
  ai: {
    title: "Why Choose Us for AI Development?",
    points: [
      {
        icon: "★",
        title: "End-to-End Expertise",
        description: "We provide comprehensive AI development services covering strategy, design, development, and ongoing support. Our team ensures a seamless process and high-quality, scalable AI solutions."
      },
      {
        icon: "◆",
        title: "Cutting-Edge Technologies",
        description: "We use the latest AI technologies like TensorFlow, PyTorch, OpenAI, and custom ML models to deliver high-performance, future-ready AI solutions. Our developers stay ahead of industry trends for optimal results."
      },
      {
        icon: "▲",
        title: "Scalability & Flexibility",
        description: "Our AI solutions are designed to grow with your business, allowing for easy adjustments and scalability. We ensure long-term value by building flexible and adaptable AI systems."
      },
      {
        icon: "●",
        title: "User-Centered Design",
        description: "We focus on creating intuitive and user-friendly AI interfaces that enhance user engagement. Our solutions ensure a seamless experience across all devices and platforms."
      },
      {
        icon: "♦",
        title: "Security and Compliance",
        description: "We prioritize AI security by implementing robust protocols and conducting regular audits. Your AI solutions will always comply with the latest security standards and regulations."
      }
    ]
  },
  'custom-software': {
    title: "Why Choose Us for Custom Software Development?",
    points: [
      {
        icon: "★",
        title: "End-to-End Expertise",
        description: "We provide comprehensive custom software development services covering strategy, design, development, and ongoing support. Our team ensures a seamless process and high-quality, scalable software solutions."
      },
      {
        icon: "◆",
        title: "Cutting-Edge Technologies",
        description: "We use the latest technologies like Python, Java, C#, and cloud platforms to deliver high-performance, future-ready software solutions. Our developers stay ahead of industry trends for optimal results."
      },
      {
        icon: "▲",
        title: "Scalability & Flexibility",
        description: "Our custom software solutions are designed to grow with your business, allowing for easy adjustments and scalability. We ensure long-term value by building flexible and adaptable software systems."
      },
      {
        icon: "●",
        title: "User-Centered Design",
        description: "We focus on creating intuitive and user-friendly software interfaces that enhance user engagement. Our solutions ensure a seamless experience across all devices and platforms."
      },
      {
        icon: "♦",
        title: "Security and Compliance",
        description: "We prioritize software security by implementing robust protocols and conducting regular audits. Your custom software will always comply with the latest security standards and regulations."
      }
    ]
  }
};

export default function WhyChooseUs({ serviceType }: WhyChooseUsProps) {
  const data = whyChooseUsData[serviceType];

  if (!data) {
    return null;
  }

  return (
    <section className="why-choose-us">
      <h2 className="why-choose-title">{data.title}</h2>
      
      <div className="why-choose-container">
        <div className="why-choose-content">
          <div className="why-choose-points">
            {data.points.map((point, index) => {
              const icons = [
                <svg key="star" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>,
                <svg key="lightning" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                </svg>,
                <svg key="chart" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3V21H21V19H5V3H3ZM7 13H9V17H7V13ZM11 9H13V17H11V9ZM15 5H17V17H15V5Z" fill="currentColor"/>
                </svg>,
                <svg key="user" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>,
                <svg key="shield" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
                </svg>
              ];
              
              return (
                <div key={index} className="why-choose-point">
                  <div className="point-icon" style={{ color: '#0EBAB1' }}>{icons[index]}</div>
                  <h3 className="point-title">{point.title}</h3>
                  <p className="point-description">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="why-choose-arc"></div>
      </div>
    </section>
  );
}
