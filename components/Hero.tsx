import React, { useState, useEffect, useCallback } from 'react';

const heroImages = [
  'https://i.postimg.cc/0P1NqjLC/armonizacion-facial.jpg',
  'https://i.postimg.cc/s3VDv8fX/carbon-peel.jpg',
  'https://i.postimg.cc/h4WKgZ3c/morpheus.jpg',
  'https://i.postimg.cc/RMYMpZ73/LASER-CO2.png',
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicios');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {heroImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
      ))}

      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/Video.MP4"
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
            Donde la ciencia y la
            <br />
            <span className="italic font-light">belleza se encuentran.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl max-w-3xl mx-auto mb-8 font-light tracking-wide">
            Innovación médica y estética avanzada en dermatología, medicina estética, salud capilar, ginecología y nutrición clínica, para resultados que elevan tu confianza.
          </p>
          <button
            onClick={scrollToServices}
            className="font-sans text-sm font-semibold tracking-widest uppercase border border-brand-white text-brand-white px-8 py-3 transition-all duration-300 ease-custom-ease hover:bg-brand-white hover:text-brand-brown"
          >
            Explorar Tratamientos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
