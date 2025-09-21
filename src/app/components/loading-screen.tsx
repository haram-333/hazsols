"use client";

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Hide loading screen after a short delay
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-container">
          <img src="/logo.png" alt="HazSols" className="loading-logo" />
        </div>
        
        <div className="loading-text">
          <h2>Loading Amazing Experience</h2>
          <p>Preparing your digital journey...</p>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
        
        <div className="loading-tips">
          <div className="tip">
            <span className="tip-icon">🚀</span>
            <span>Optimizing for your device</span>
          </div>
          <div className="tip">
            <span className="tip-icon">⚡</span>
            <span>Compressing media for faster loading</span>
          </div>
          <div className="tip">
            <span className="tip-icon">🎯</span>
            <span>Preparing personalized content</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: ${isVisible ? 1 : 0};
          transition: opacity 0.5s ease-in-out;
        }
        
        .loading-content {
          text-align: center;
          color: white;
          max-width: 400px;
          padding: 2rem;
        }
        
        .logo-container {
          margin-bottom: 2rem;
        }
        
        .loading-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        
        .loading-text h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .loading-text p {
          font-size: 1rem;
          opacity: 0.8;
          margin-bottom: 2rem;
        }
        
        .progress-container {
          margin-bottom: 2rem;
        }
        
        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 0.875rem;
          opacity: 0.8;
        }
        
        .loading-tips {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .tip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          opacity: 0.7;
        }
        
        .tip-icon {
          font-size: 1rem;
        }
        
        @media (max-width: 768px) {
          .loading-content {
            padding: 1rem;
          }
          
          .loading-logo {
            width: 60px;
            height: 60px;
          }
          
          .loading-text h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
