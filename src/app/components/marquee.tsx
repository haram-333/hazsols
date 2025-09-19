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

// Pre-defined shuffled arrays to avoid hydration mismatch
const shuffledLogos1 = [
  { name: 'Angular', src: '/images/Angular.png' },
  { name: 'Svelte', src: '/images/Svelte.png' },
  { name: 'Vue.js', src: '/images/Vue.js.png' },
  { name: 'TypeScript', src: '/images/TypeScript.png' },
  { name: 'Kotlin', src: '/images/Kotlin.png' },
  { name: 'Bootstrap', src: '/images/Bootstrap.png' },
  { name: 'Next.js', src: '/images/Next.js.png' },
  { name: 'React', src: '/images/React.png' },
  { name: 'Android', src: '/images/Android.png' },
  { name: 'Tailwind CSS', src: '/images/Tailwind CSS.png' },
  { name: 'WordPress', src: '/images/WordPress.png' },
  { name: 'Java', src: '/images/Java.png' },
  { name: 'Flutter', src: '/images/Flutter.png' },
  { name: 'JavaScript', src: '/images/JavaScript.png' },
];

const shuffledLogos2 = [
  { name: 'Kotlin', src: '/images/Kotlin.png' },
  { name: 'Flutter', src: '/images/Flutter.png' },
  { name: 'WordPress', src: '/images/WordPress.png' },
  { name: 'Angular', src: '/images/Angular.png' },
  { name: 'Next.js', src: '/images/Next.js.png' },
  { name: 'Tailwind CSS', src: '/images/Tailwind CSS.png' },
  { name: 'TypeScript', src: '/images/TypeScript.png' },
  { name: 'Java', src: '/images/Java.png' },
  { name: 'Bootstrap', src: '/images/Bootstrap.png' },
  { name: 'React', src: '/images/React.png' },
  { name: 'Vue.js', src: '/images/Vue.js.png' },
  { name: 'Svelte', src: '/images/Svelte.png' },
  { name: 'Android', src: '/images/Android.png' },
  { name: 'JavaScript', src: '/images/JavaScript.png' },
];

export default function Marquee() {
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
