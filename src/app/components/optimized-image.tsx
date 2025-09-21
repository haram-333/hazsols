"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  fill = false,
  sizes = '100vw',
  width,
  height,
  quality = 85
}: OptimizedImageProps) {
  const [imageManifest, setImageManifest] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    // Load image manifest
    fetch('/images/manifest.json')
      .then(res => res.json())
      .then(manifest => {
        setImageManifest(manifest);
        
        // Try to get optimized version
        const baseName = src.split('/').pop()?.split('.')[0];
        if (manifest[baseName]) {
          // Use responsive images if available
          const optimizedSrc = getOptimizedSrc(manifest[baseName]);
          if (optimizedSrc) {
            setCurrentSrc(optimizedSrc);
          }
        }
      })
      .catch(err => {
        console.log('Image manifest not found, using original:', err);
      });
  }, [src]);

  const getOptimizedSrc = (imageVariants: any) => {
    // Check for WebP first (best compression)
    if (imageVariants.lg?.webp) return imageVariants.lg.webp;
    if (imageVariants.md?.webp) return imageVariants.md.webp;
    if (imageVariants.lg?.jpg) return imageVariants.lg.jpg;
    if (imageVariants.md?.jpg) return imageVariants.md.jpg;
    return null;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`optimized-image-container ${className}`} style={{ position: 'relative' }}>
      <Image
        src={currentSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        quality={quality}
        onLoad={handleLoad}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af'
          }}
        >
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .loading-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #e5e7eb;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
