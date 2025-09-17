"use client";

import { useState } from 'react';

interface Service {
  id: string;
  title: string;
  image: string;
}

const services: Service[] = [
  {
    id: 'generative-ai',
    title: 'Generative AI',
    image: '/images/generative-ai.jpg'
  },
  {
    id: 'mobile-app-dev',
    title: 'Mobile App Development',
    image: '/images/mobile-app-development.jpg'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    image: '/images/web-development.jpg'
  },
  {
    id: 'seo',
    title: 'SEO',
    image: '/images/seo.jpg'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    image: '/images/ecommerce.jpg'
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    image: '/images/wordpress.jpg'
  },
  {
    id: 'shopify',
    title: 'Shopify',
    image: '/images/shopify.jpg'
  }
];

export default function ServiceCards() {
  const [showAll, setShowAll] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const visibleServices = showAll ? services : services.slice(0, 4);
  
  const handleToggle = () => {
    if (showAll) {
      // When hiding cards, start animation first
      setIsAnimating(true);
      setTimeout(() => {
        setShowAll(false);
        setIsAnimating(false);
      }, 300); // Match animation duration
    } else {
      // When showing cards, show immediately
      setShowAll(true);
    }
  };
  
  return (
    <div className="service-cards-container">
      <div className="service-cards-grid">
        {visibleServices.map((service, index) => (
          <div 
            key={service.id} 
            className={`service-card ${
              showAll && index >= 4 ? 'service-card-reveal' : ''
            } ${
              isAnimating && index >= 4 ? 'service-card-hide' : ''
            }`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div 
              className="service-card-bg"
              style={{
                backgroundImage: `url(${service.image})`
              }}
            />
            <div className="service-card-overlay" />
            <h3 className="service-card-title">
              {service.title}
            </h3>
          </div>
        ))}
      </div>
      
      <div className="view-more-container">
        {!showAll ? (
          <button 
            className="view-more-btn"
            onClick={handleToggle}
          >
            View More Services
          </button>
        ) : (
          <button 
            className="view-more-btn"
            onClick={handleToggle}
            disabled={isAnimating}
          >
            View Less Services
          </button>
        )}
      </div>
    </div>
  );
}
