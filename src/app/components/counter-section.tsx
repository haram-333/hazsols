"use client";

import { useEffect, useRef, useState } from 'react';

interface CounterItem {
  id: string;
  number: string;
  label: string;
  suffix: string;
}

const counterData: CounterItem[] = [
  {
    id: 'customers',
    number: '25',
    label: 'HAPPY CUSTOMERS',
    suffix: 'K'
  },
  {
    id: 'employees',
    number: '70',
    label: 'SKILLED EMPLOYEES',
    suffix: '+'
  },
  {
    id: 'projects',
    number: '30',
    label: 'PROJECT COMPLETED',
    suffix: '+'
  },
  {
    id: 'awards',
    number: '0',
    label: 'ACHIEVED TROPHY AWARDS',
    suffix: 'K'
  }
];

export default function CounterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(counterData.map(item => ({ ...item, currentNumber: 0 })));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            startCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const startCounters = () => {
    counterData.forEach((item, index) => {
      const targetNumber = parseInt(item.number);
      const duration = 2000; // 2 seconds
      const increment = targetNumber / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          current = targetNumber;
          clearInterval(timer);
        }

        setCounters(prev => prev.map((counter, i) => 
          i === index ? { ...counter, currentNumber: Math.floor(current) } : counter
        ));
      }, 16);
    });
  };

  return (
    <div ref={sectionRef} className="counter-section">
      <div className="counter-container">
        <div className="counter-content">
          {/* Left side - Text content */}
          <div className="counter-left">
            <div className="counter-header">
              <span className="counter-label">PIONEERING TRUST AND INNOVATION</span>
              <h2 className="counter-title">
                Our Achievements
              </h2>
              <p className="counter-description">
                We take pride in empowering businesses worldwide with innovative solutions.
              </p>
              <p className="counter-description">
                Hazsols brings an unwavering commitment to excellence, backed by a global presence.
              </p>
              <button className="counter-cta">
                Get in Touch
              </button>
            </div>
          </div>

          {/* Right side - Counter grid */}
          <div className="counter-right">
            <div className="counter-grid">
              {counters.map((item) => (
                <div key={item.id} className="counter-item">
                  <div className="counter-number">
                    {item.currentNumber}{item.suffix}
                  </div>
                  <div className="counter-label-text">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
