"use client";
import Image from 'next/image';
import ParticleBackground from './particle-background';

const logos = [
  { name: 'React', src: '/images/React.png' },
  { name: 'Next.js', src: '/images/Next.js.png' },
  { name: 'Vue.js', src: '/images/Vue.js.png' },
  { name: 'Angular', src: '/images/Angular.png' },
  { name: 'JavaScript', src: '/images/JavaScript.png' },
  { name: 'TypeScript', src: '/images/TypeScript.png' },
  { name: 'Flutter', src: '/images/Flutter.png' },
  { name: 'Android', src: '/images/Android.png' },
  { name: 'Java', src: '/images/Java.png' },
  { name: 'Kotlin', src: '/images/Kotlin.png' },
  { name: 'WordPress', src: '/images/WordPress.png' },
  { name: 'Bootstrap', src: '/images/Bootstrap.png' },
  { name: 'Tailwind CSS', src: '/images/Tailwind CSS.png' },
  { name: 'Svelte', src: '/images/Svelte.png' },
];

export default function Marquee() {
  // Function to create array without consecutive duplicates
  const createNonConsecutiveArray = (arr: typeof logos) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    const result = [...shuffled];
    
    // Check for consecutive duplicates and fix them
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i].name === result[i + 1].name) {
        // Find a different logo to swap with
        for (let j = i + 2; j < result.length; j++) {
          if (result[j].name !== result[i].name && result[j].name !== result[i + 1].name) {
            [result[i + 1], result[j]] = [result[j], result[i + 1]];
            break;
          }
        }
      }
    }
    
    return result;
  };
  
  // Create arrays without consecutive duplicates
  const shuffledLogos1 = createNonConsecutiveArray(logos);
  const shuffledLogos2 = createNonConsecutiveArray(logos);
  
  // Combine shuffled arrays to create seamless loop
  const marqueeLogos1 = [...shuffledLogos1, ...shuffledLogos1];
  const marqueeLogos2 = [...shuffledLogos2, ...shuffledLogos2];

  return (
    <section className="marquee-section">
      <ParticleBackground />
      <div className="marquee marquee-left">
        <div className="marquee-content">
          {marqueeLogos1.map((logo, index) => (
            <div key={index} className="marquee-item">
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={60}
                className="marquee-logo"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="marquee marquee-right">
        <div className="marquee-content">
          {marqueeLogos2.map((logo, index) => (
            <div key={index} className="marquee-item">
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={60}
                className="marquee-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
