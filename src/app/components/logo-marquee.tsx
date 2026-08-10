"use client";

import Image from "next/image";

const LOGOS = [
  { name: "React",        file: "/images/React.png" },
  { name: "Next.js",      file: "/images/Next.js.png" },
  { name: "TypeScript",   file: "/images/TypeScript.png" },
  { name: "JavaScript",   file: "/images/JavaScript.png" },
  { name: "Tailwind CSS", file: "/images/Tailwind CSS.png" },
  { name: "Flutter",      file: "/images/Flutter.png" },
  { name: "Kotlin",       file: "/images/Kotlin.png" },
  { name: "Vue.js",       file: "/images/Vue.js.png" },
  { name: "Angular",      file: "/images/Angular.png" },
  { name: "WordPress",    file: "/images/WordPress.png" },
  { name: "Svelte",       file: "/images/Svelte.png" },
  { name: "Android",      file: "/images/Android.png" },
];

// Duplicate for seamless loop — one copy only (doubled = 24 items)
const doubled = [...LOGOS, ...LOGOS];

export default function LogoMarquee() {
  return (
    <div
      className="marquee-section"
      aria-label="Technologies we work with"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((logo, i) => (
          <div className="marquee-item" key={`${logo.name}-${i}`}>
            <Image
              src={logo.file}
              alt={logo.name}
              width={48}
              height={36}
              style={{ width: "auto", height: 28, objectFit: "contain", opacity: 0.55, filter: "grayscale(1)" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
