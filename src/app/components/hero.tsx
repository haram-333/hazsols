"use client";

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // Video is now compressed (3MB), so we can use it!
    setUseFallback(false);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.log('Video failed to load');
    setUseFallback(true);
  };

  return (
    <section className="hero">
      <div className="hero-video">
        {isVideoVisible && (
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            className="hero-video-bg"
            style={{ 
              opacity: isVideoLoaded ? 1 : 0.5, 
              transition: 'opacity 0.5s ease-in-out',
              width: '100%',
              height: '100vh',
              objectFit: 'cover'
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Fallback gradient if video fails to load */}
        {useFallback && (
          <div 
            className="hero-fallback"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: '100%',
              height: '100vh',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
