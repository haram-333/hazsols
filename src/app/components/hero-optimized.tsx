"use client";

import { useEffect, useRef, useState } from 'react';

export default function HeroOptimized() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');

  useEffect(() => {
    // Detect connection speed
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const speed = connection.effectiveType || '4g';
      const isSlow = speed === 'slow-2g' || speed === '2g' || speed === '3g';
      const isFast = speed === '4g';
      
      setIsLowBandwidth(isSlow);
      setConnectionSpeed(isSlow ? 'slow' : isFast ? 'fast' : 'medium');
    }

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const getVideoSrc = () => {
    // For now, we'll use a placeholder. You'll need to create optimized versions
    if (isLowBandwidth) {
      return '/videos/hero-mobile.mp4'; // Small version for mobile
    }
    return '/videos/hero-optimized.mp4'; // Compressed version
  };

  return (
    <section className="hero">
      <div className="hero-video">
        {/* Show a static image fallback for very slow connections */}
        {isLowBandwidth && !isVideoVisible ? (
          <div 
            className="hero-fallback-image"
            style={{
              backgroundImage: 'url(/images/hero-fallback.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100vh'
            }}
          />
        ) : (
          isVideoVisible && (
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop 
              playsInline
              preload={isLowBandwidth ? 'none' : 'metadata'}
              onLoadedData={handleVideoLoad}
              className="hero-video-bg"
              style={{ 
                opacity: isVideoLoaded ? 1 : 0, 
                transition: 'opacity 0.5s ease-in-out' 
              }}
            >
              <source src={getVideoSrc()} type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              Your browser does not support the video tag.
            </video>
          )
        )}
        
        {/* Loading spinner */}
        {isVideoVisible && !isVideoLoaded && !isLowBandwidth && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <p>Loading video...</p>
          </div>
        )}
        
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-title-line">Drive Tomorrow&apos;s</span>
            <span className="hero-title-line hero-title-emphasis">Possibilities</span>
          </h1>
          
          <p className="hero-tagline">
            We help companies redefine the future<br />
            through technology
          </p>
          
          <a href="/contact" className="hero-cta">
            Get in Touch
          </a>
        </div>
      </div>

      <style jsx>{`
        .video-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          z-index: 10;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
