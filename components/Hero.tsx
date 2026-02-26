import React, { useState, useEffect, useCallback } from 'react';
import { HeroContent } from '../content';

const Hero: React.FC<{ content: HeroContent }> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === content.slides.length - 1 ? 0 : prev + 1));
  }, [content.slides.length]);

  useEffect(() => {
    if (content.slides.length === 0) {
      return;
    }

    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide, content.slides.length]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicios');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {content.slides.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
      ))}

      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={content.videoUrl}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-brand-brown/30"></div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-brand-white p-8">
        <div className="animate-fade-in">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-4"
            style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.3)' }}
          >
            {content.titlePrimary}
            <br />
            <span className="italic font-light">{content.titleAccent}</span>
          </h1>
          <p className="font-sans text-lg md:text-xl max-w-3xl mx-auto mb-8 font-light tracking-wide">
            {content.subtitle}
          </p>
          <button
            onClick={scrollToServices}
            className="font-sans text-sm font-semibold tracking-widest uppercase border border-brand-white text-brand-white px-8 py-3 transition-all duration-300 ease-custom-ease hover:bg-brand-white hover:text-brand-brown"
          >
            {content.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
