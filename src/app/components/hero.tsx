"use client";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-video">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="hero-video-bg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
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
    </section>
  );
}
