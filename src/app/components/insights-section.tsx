"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface InsightCard {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

const insightCards: InsightCard[] = [
  {
    id: 'innovation',
    title: 'Innovation First',
    description: 'We embrace cutting-edge technologies and creative solutions to deliver breakthrough results.',
    category: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
  },
  {
    id: 'quality',
    title: 'Quality Assurance',
    description: 'Every project undergoes rigorous testing and quality checks to ensure flawless delivery.',
    category: '',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop'
  },
  {
    id: 'excellence',
    title: 'Technical Excellence',
    description: 'Our team of expert developers delivers robust, scalable, and maintainable solutions.',
    category: '',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop'
  },
  {
    id: 'agile',
    title: 'Agile Development',
    description: 'We follow agile methodologies to ensure rapid, iterative, and client-focused development.',
    category: '',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
  },
  {
    id: 'client-success',
    title: 'Client Success',
    description: 'Your success is our priority. We build lasting partnerships through exceptional service.',
    category: '',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop'
  },
  {
    id: 'future-ready',
    title: 'Future-Ready Solutions',
    description: 'We build solutions that adapt and scale with your business growth and evolving needs.',
    category: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description: 'We foster a collaborative environment where ideas flourish and innovation thrives.',
    category: '',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop'
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'Your data security is our top priority with enterprise-grade protection measures.',
    category: '',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop'
  }
];

// Split cards into 3 columns
const column1Cards = insightCards.slice(0, 2);
const column2Cards = insightCards.slice(2, 5);
const column3Cards = insightCards.slice(5, 8);

export default function InsightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Column 1 - moves up as you scroll up
      gsap.to(column1Ref.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Column 2 - moves up less as you scroll up
      gsap.to(column2Ref.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Column 3 stays fixed - no movement
      // No animation needed, it stays in place

      // Parallax effect for the background circle
      gsap.to(sectionRef.current?.querySelector('.insights-bg-circle'), {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className="insights-section">
      <div className="insights-bg-circle"></div>
      
      <div className="insights-container">
        <div className="insights-content">
          {/* Left Column - Text Content */}
          <div ref={leftColumnRef} className="insights-left">
            <div className="insights-header">
              <span className="insights-label">OUR VALUES</span>
              <h2 className="insights-title">
                The principles that drive our excellence and innovation
              </h2>
              <p className="insights-subtitle">Building Tomorrow, Today</p>
              <button className="insights-cta">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - 3 Column Stair Layout */}
          <div className="insights-right">
            <div className="insights-stair-layout">
              {/* Column 1 - Moves up on scroll */}
              <div ref={column1Ref} className="insights-column insights-column-1">
                {column1Cards.map((card) => (
                  <div
                    key={card.id}
                    ref={addToRefs}
                    className="insight-card"
                  >
                    <div 
                      className="insight-card-bg"
                      style={{ backgroundImage: `url(${card.image})` }}
                    />
                    <div className="insight-card-overlay" />
                    <div className="insight-card-content">
                      {card.category && <span className="insight-card-category">{card.category}</span>}
                      <h3 className="insight-card-title">{card.title}</h3>
                      <p className="insight-card-description">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 - Moves up on scroll (delayed) */}
              <div ref={column2Ref} className="insights-column insights-column-2">
                {column2Cards.map((card) => (
                  <div
                    key={card.id}
                    ref={addToRefs}
                    className="insight-card"
                  >
                    <div 
                      className="insight-card-bg"
                      style={{ backgroundImage: `url(${card.image})` }}
                    />
                    <div className="insight-card-overlay" />
                    <div className="insight-card-content">
                      {card.category && <span className="insight-card-category">{card.category}</span>}
                      <h3 className="insight-card-title">{card.title}</h3>
                      <p className="insight-card-description">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3 - Stays fixed */}
              <div ref={column3Ref} className="insights-column insights-column-3">
                {column3Cards.map((card) => (
                  <div
                    key={card.id}
                    ref={addToRefs}
                    className="insight-card"
                  >
                    <div 
                      className="insight-card-bg"
                      style={{ backgroundImage: `url(${card.image})` }}
                    />
                    <div className="insight-card-overlay" />
                    <div className="insight-card-content">
                      {card.category && <span className="insight-card-category">{card.category}</span>}
                      <h3 className="insight-card-title">{card.title}</h3>
                      <p className="insight-card-description">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
