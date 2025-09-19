"use client";
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    particlesJS: (id: string, config: object) => void;
  }
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let isMounted = true;
    let particlesLoaded = false;
    
    const loadParticles = async () => {
      if (typeof window !== 'undefined' && window.particlesJS && isMounted && !particlesLoaded) {
        // Check if particles container exists
        const container = document.getElementById('particles-js');
        if (container && isMounted) {
          try {
            window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#0ebab1'
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.8,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 2.5,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#0ebab1',
              opacity: 0.5,
              width: 0.8
            },
            move: {
              enable: true,
              speed: 6,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        });
        particlesLoaded = true;
        } catch (error) {
          console.warn('Failed to load particles:', error);
        }
        }
      }
    };

    // Check if particles.js is already loaded
    if (typeof window !== 'undefined' && window.particlesJS) {
      loadParticles();
    } else {
      // Load particles.js script
      script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.onload = () => {
        if (isMounted) {
          loadParticles();
        }
      };
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      particlesLoaded = false;
      
      // Don't remove the script if particles.js is already loaded globally
      // This prevents issues when navigating between pages
      if (script && script.parentNode && !window.particlesJS) {
        try {
          document.head.removeChild(script);
        } catch (error) {
          console.warn('Could not remove particles script:', error);
        }
      }
    };
  }, []);

  return (
    <div 
      id="particles-js" 
      ref={containerRef}
      key="particles-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
}
